"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const url_1 = require("url");
const contentDisposition = tslib_1.__importStar(require("content-disposition"));
const archiveType = tslib_1.__importStar(require("archive-type"));
const decompress = tslib_1.__importStar(require("decompress"));
const filenamify_1 = tslib_1.__importDefault(require("filenamify"));
const getStream = tslib_1.__importStar(require("get-stream"));
const got = tslib_1.__importStar(require("got"));
const make_dir_1 = tslib_1.__importDefault(require("make-dir"));
const pify = tslib_1.__importStar(require("pify"));
const pEvent = tslib_1.__importStar(require("p-event"));
const file_type_1 = tslib_1.__importDefault(require("file-type"));
const extName = tslib_1.__importStar(require("ext-name"));
const fsP = pify(fs);
const filenameFromPath = (res) => path.basename(new url_1.URL(res.requestUrl).pathname);
const getExtFromMime = (res) => {
    const header = res.headers["content-type"];
    if (!header) {
        return null;
    }
    const exts = extName.mime(header);
    if (exts.length !== 1) {
        return null;
    }
    return exts[0].ext;
};
const getFilename = (res, data) => {
    const header = res.headers["content-disposition"];
    if (header) {
        const parsed = contentDisposition.parse(header);
        if (parsed.parameters && parsed.parameters.filename) {
            return parsed.parameters.filename;
        }
    }
    let filename = filenameFromPath(res);
    if (!path.extname(filename)) {
        const ext = ((0, file_type_1.default)(data) || {}).ext || getExtFromMime(res);
        if (ext) {
            filename = `${filename}.${ext}`;
        }
    }
    return filename;
};
exports.default = (uri, output, opts) => {
    if (typeof output === "object") {
        opts = output;
        output = null;
    }
    opts = Object.assign({
        encoding: null,
        rejectUnauthorized: process.env.npm_config_strict_ssl !== "false",
    }, opts);
    const stream = got.stream(uri, opts);
    const promise = pEvent(stream, "response")
        .then((res) => {
        const encoding = opts.encoding === null ? "buffer" : opts.encoding;
        return Promise.all([getStream(stream, { encoding }), res]);
    })
        .then((result) => {
        const [data, res] = result;
        if (!output) {
            return opts.extract && archiveType(data)
                ? decompress(data, opts)
                : data;
        }
        const filename = opts.filename || (0, filenamify_1.default)(getFilename(res, data));
        const outputFilepath = path.join(output, filename);
        if (opts.extract && archiveType(data)) {
            return decompress(data, path.dirname(outputFilepath), opts);
        }
        return (0, make_dir_1.default)(path.dirname(outputFilepath))
            .then(() => fsP.writeFile(outputFilepath, data))
            .then(() => data);
    });
    stream.then = promise.then.bind(promise);
    stream.catch = promise.catch.bind(promise);
    return stream;
};
//# sourceMappingURL=index.js.map