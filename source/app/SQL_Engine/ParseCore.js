define(['source/app/SQL_Engine/ParsePattern'], function (Pattern) {
    "use strict";

    return {
        //text method
        txt: function (text) {
            return new Pattern(function (str, pos) {
                pos = pos || 0;
                var newPos = text.length + pos;
                if (str.substring(pos, newPos) === text) {
                    return {
                        res: text,
                        end: newPos
                    }
                }
            });
        },
        //regexp method
        rgx: function (rgx) {
            return new Pattern(function (str, pos) {
                pos = pos || 0;
                var res = rgx.exec(str.slice(pos));
                if (res && res.index === 0) {
                    return {
                        res: res[0],
                        end: pos + res[0].length
                    }
                }
            });
        },
        // optional used method
        opt: function (pattern) {
            return new Pattern(function (str, pos) {
                pos = pos || 0;
                return pattern.exec(str, pos) || {res: undefined, end: pos};
            });
        },
        //combinator any
        any: function (patterns) {
            return new Pattern(function (str, pos) {
                pos = pos || 0;
                for (var paternMustBedone, i = 0; i < patterns.length; i++) {
                    if (paternMustBedone = patterns[i].exec(str, pos)) {
                        return paternMustBedone;
                    }
                }
            });
        },
        seq: function () {
            var patterns = Array.prototype.slice.call(arguments);
            return new Pattern(function (str, pos) {
                //pos = pos || 0;
                var i, response, end = pos, responseArray = [];

                for (i = 0; i < patterns.length; i++) {
                    response = patterns[i].exec(str, end);
                    if (!response) return;
                    responseArray.push(response.res);
                    end = response.end;
                }

                return {res: responseArray, end: end};
            });
        },
        //this functions repeat pattern and miss separator
        rep: function (pattern, separator) {
            return new Pattern(function (str, pos) {
                var responce = [],
                    end = pos,
                    r = pattern.exec(str, end);
                while (r && r.end > end) {
                    responce.push(r.res.toString().trim());
                    end = r.end;
                    r = separator.exec(str, end);
                    if (r) {
                        end = r.end;
                        r = pattern.exec(str, end);
                    }
                }

                return {res: responce, end: end};
            });
        }
    };
});
