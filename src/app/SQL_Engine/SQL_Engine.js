define([
        'src/app/SQL_Engine/ParseCore'
    ], function(Patterns) {
    "use strict";

    return function(string) {
        //declaration variable
        var operationAndSelectedFields,operation,fields,tableFirst,tableSecond,innerjoin,
            regexpForSelectField = /^\s*(delete|select)([\s]*[\w|\*]+[[\.\?][\w|\*]+]*)([\s]*[\,][\s]*[\w|\*]+[\.]?[\w|\*]+)*[\s]+(from)/,
            where = [];
        //all helper functions
        function innerjoinFounder(string, end){
            return Patterns.txt('inner join ').exec(string, end) ||
                Patterns.txt('join ').exec(string, end);
        }
        function operatorFounder(string, end){
            return Patterns.any([
                Patterns.txt("delete "),
                Patterns.txt("select ")
            ]).exec(string, end);
        }
        function fieldFounder(str, end) {
            return Patterns.rep(
                Patterns.rgx(/([\s]*[\w|\*]+[[\.\[\w|\*]*]*[\s]*)/),
                Patterns.rgx(new RegExp( "\\s\?\[,\]\\s\?"))
            ).exec(str, end);
        }
        function tableFounder(string, end) {
            return Patterns.rgx(/[\s]*[\w]+[\s]*/).exec(string, end);
        }
        function paramsFounder(arrayParams, end){
            var signPattern = Patterns.any([
                    Patterns.txt('<='),
                    Patterns.txt('='),
                    Patterns.txt('>='),
                    Patterns.txt('<'),
                    Patterns.txt('>'),
                    Patterns.txt('<>'),
                    Patterns.txt('like')
                ]),
                firstJoinCriterial, firstJoinField, sign, secondJoinField;

            firstJoinCriterial = Patterns.rgx(/[\s]*(where|on)[\s]*/).exec(string, end);
            firstJoinField = firstJoinCriterial && fieldFounder(string, firstJoinCriterial.end);
            sign = firstJoinField && signPattern.exec(string, firstJoinField && firstJoinField.end);
            secondJoinField = sign && fieldFounder(string, sign.end);
            if(sign){
                arrayParams.push({
                    method : firstJoinCriterial && firstJoinCriterial.res.trim(),
                    firstJoinField : firstJoinField.res[0].trim(),
                    sign : sign && sign.res.trim(),
                    secondJoinField : secondJoinField && secondJoinField.res[0]
                });
            }
            if(!firstJoinCriterial || !firstJoinField || !sign || !secondJoinField){
                return arrayParams;
            } else {
                return paramsFounder(arrayParams, secondJoinField.end);
            }
        }
        //work body
        operationAndSelectedFields = Patterns.rgx(regexpForSelectField).exec(string, 0);
        operation = operationAndSelectedFields && operatorFounder(operationAndSelectedFields.res.trim(), 0);
        fields = operation && operationAndSelectedFields && fieldFounder(operationAndSelectedFields.res, operation.end);
        tableFirst = operationAndSelectedFields && tableFounder(string, operationAndSelectedFields.end);
        innerjoin = tableFirst && innerjoinFounder(string, tableFirst.end);
        tableSecond = innerjoin && tableFounder(string, innerjoin.end );
        where = paramsFounder(where, tableSecond && tableSecond.end);
        //output
            return {
                operation: operation && operation.res.trim(),
                targetField: fields && fields.res,
                targetTable: tableFirst && tableFirst.res.trim(),
                innerjoin: innerjoin && innerjoin.res.trim() || null,
                joibedTable: tableSecond && tableSecond.res.trim() || null,
                where: where
            };
        }
});