define(function (require) {
    "use strict";

    var Patterns = require('src/app/SQL_Engine/ParseCore'),
        fieldFounder = require('src/app/SQL_Engine/SQL_Parser/fieldFounder');

    function paramsFounder(arrayParams, string, end) {
        var firstJoinCriterial, firstJoinField, sign, secondJoinField,
            signPattern = Patterns.any([
                Patterns.txt('<='),
                Patterns.txt('='),
                Patterns.txt('>='),
                Patterns.txt('<'),
                Patterns.txt('>'),
                Patterns.txt('<>'),
                Patterns.txt('like')
            ]),
            whereOnregExp = /[\s]*(where|on)[\s]*/;

        firstJoinCriterial = Patterns.rgx(whereOnregExp).exec(string, end);
        firstJoinField = firstJoinCriterial && fieldFounder(string, firstJoinCriterial.end);
        sign = firstJoinField && signPattern.exec(string, firstJoinField && firstJoinField.end);
        secondJoinField = sign && fieldFounder(string, sign.end);
        if (sign && secondJoinField) {
            arrayParams.push({
                method: firstJoinCriterial && firstJoinCriterial.res.trim(),
                firstJoinField: firstJoinField.res[0].trim(),
                sign: sign.res.trim(),
                secondJoinField: secondJoinField.res[0]
            });
        }
        if (!firstJoinCriterial || !firstJoinField || !sign || !secondJoinField) {
            return arrayParams;
        } else {
            return paramsFounder(arrayParams, string, secondJoinField.end);
        }
    }

    return paramsFounder;
});