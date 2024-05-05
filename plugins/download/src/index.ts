"use strict";
import * as fs from "fs";
import * as path from "path";
import { URL } from "url";
import * as contentDisposition from "content-disposition";
import * as archiveType from "archive-type";
import * as decompress from "decompress";
import filenamify from "filenamify";
import * as getStream from "get-stream";
import * as got from "got";
import makeDir from "make-dir";
import * as pify from "pify";
import * as pEvent from "p-event";
import fileType from "file-type";
import * as extName from "ext-name";

const fsP = pify(fs);

const filenameFromPath = (res: any) =>
  path.basename(new URL(res.requestUrl).pathname);

const getExtFromMime = (res: any) => {
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

const getFilename = (res: any, data: any) => {
  const header = res.headers["content-disposition"];

  if (header) {
    const parsed = contentDisposition.parse(header);

    if (parsed.parameters && parsed.parameters.filename) {
      return parsed.parameters.filename;
    }
  }

  let filename = filenameFromPath(res);

  if (!path.extname(filename)) {
    const ext = (fileType(data) || {}).ext || getExtFromMime(res);

    if (ext) {
      filename = `${filename}.${ext}`;
    }
  }

  return filename;
};

export default (uri: string, output: string | null | undefined, opts: any) => {
  if (typeof output === "object") {
    opts = output;
    output = null;
  }

  opts = Object.assign(
    {
      encoding: null,
      rejectUnauthorized: process.env.npm_config_strict_ssl !== "false",
    },
    opts
  );

  const stream = got.stream(uri, opts);

  const promise = pEvent(stream, "response")
    .then((res: any) => {
      const encoding = opts.encoding === null ? "buffer" : opts.encoding;
      return Promise.all([getStream(stream, { encoding }), res]);
    })
    .then((result: any) => {
      const [data, res] = result;

      if (!output) {
        return opts.extract && archiveType(data)
          ? decompress(data, opts)
          : data;
      }

      const filename = opts.filename || filenamify(getFilename(res, data));
      const outputFilepath = path.join(output!, filename);

      if (opts.extract && archiveType(data)) {
        return decompress(data, path.dirname(outputFilepath), opts);
      }

      return makeDir(path.dirname(outputFilepath))
        .then(() => fsP.writeFile(outputFilepath, data))
        .then(() => data);
    });

  stream.then = promise.then.bind(promise);
  stream.catch = promise.catch.bind(promise);

  return stream;
};
