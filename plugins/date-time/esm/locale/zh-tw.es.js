/**
 * @preserve date-time.js locale configuration
 * @preserve Chinese (zh-tw)
 * @preserve It is using moment.js locale configuration as a reference.
 */

var zh_tw = function (date) {
    var code = 'zh-tw';

    date.locale(code, {
        res: {
            MMMM: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            MMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            dddd: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            ddd: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dd: ['日', '一', '二', '三', '四', '五', '六'],
            A: ['早上', '上午', '中午', '下午', '晚上']
        },
        formatter: {
            A: function (d) {
                var hm = d.getHours() * 100 + d.getMinutes();
                if (hm < 900) {
                    return this.res.A[0];   // 早上
                } else if (hm < 1130) {
                    return this.res.A[1];   // 上午
                } else if (hm < 1230) {
                    return this.res.A[2];   // 中午
                } else if (hm < 1800) {
                    return this.res.A[3];   // 下午
                }
                return this.res.A[4];       // 晚上
            }
        },
        parser: {
            h12: function (h, a) {
                if (a < 3) {
                    return h;   // 早上, 上午, 中午
                }
                return h > 11 ? h : h + 12; // 下午, 晚上
            }
        }
    });
    return code;
};

export { zh_tw as default };
