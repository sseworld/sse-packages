(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.date = global.date || {}, global.date.locale = global.date.locale || {}, global.date.locale.hu = factory()));
})(this, (function () { 'use strict';

    /**
     * @preserve date-time.js locale configuration
     * @preserve Hungarian (hu)
     * @preserve It is using moment.js locale configuration as a reference.
     */

    var hu = function (date) {
        var code = 'hu';

        date.locale(code, {
            res: {
                MMMM: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'],
                MMM: ['jan', 'feb', 'márc', 'ápr', 'máj', 'jún', 'júl', 'aug', 'szept', 'okt', 'nov', 'dec'],
                dddd: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat'],
                ddd: ['vas', 'hét', 'kedd', 'sze', 'csüt', 'pén', 'szo'],
                dd: ['v', 'h', 'k', 'sze', 'cs', 'p', 'szo'],
                A: ['de', 'du']
            }
        });
        return code;
    };

    return hu;

}));
