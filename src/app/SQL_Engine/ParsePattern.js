define(function( require ) {
    "use strict";

    var ParsePattern = function (execFn) {
        this.exec = execFn;
    };
    ParsePattern.prototype = {
        constructor : ParsePattern,

        than : function (trabsformFn) {
            var exec = this.exec;
            return new ParsePattern(function(str, pos){
                var result;
                result = exec(str, pos || 0);

                return result && {
                        res: trabsformFn(result.res),
                        end: result.end
                    }
            })
        }
    };
    return ParsePattern;
});