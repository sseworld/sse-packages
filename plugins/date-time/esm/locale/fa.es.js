/**
 * @preserve date-time.js locale configuration
 * @preserve Persian (fa)
 * @preserve It is using moment.js locale configuration as a reference.
 */

var fa = function (date) {
    var code = 'fa';

    date.locale(code, {
        res: {
            MMMM: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
            MMM: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
            dddd: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
            ddd: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
            dd: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
            A: ['قبل از ظهر', 'بعد از ظهر']
        },
        formatter: {
            post: function (str) {
                var num = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                return str.replace(/\d/g, function (i) {
                    return num[i | 0];
                });
            }
        },
        parser: {
            pre: function (str) {
                var map = { '۰': 0, '۱': 1, '۲': 2, '۳': 3, '۴': 4, '۵': 5, '۶': 6, '۷': 7, '۸': 8, '۹': 9 };
                return str.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (i) {
                    return '' + map[i];
                });
            }
        }
    });
    return code;
};

export { fa as default };
