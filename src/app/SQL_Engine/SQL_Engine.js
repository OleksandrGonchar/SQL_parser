define([
        'src/app/SQL_Engine/ParseCore'
    ], function(Patterns) {
    "use strict";

        var selectOperation = "select ",
            deleteOperation = "delete ",
            innerJoinOperation = " inner join ",
            fromOperation = "from ",
            allWords = /\w+/,
            parseOperation = Patterns.any([Patterns.txt(selectOperation),
                Patterns.txt(deleteOperation)]),
            optionalInnerJoin = Patterns.opt(Patterns.txt(innerJoinOperation)),
            comseparator = Patterns.rgx(new RegExp( "\\s\?\[,\]\\s\?")),
            targetField = Patterns.any([ Patterns.txt("*"), Patterns.rep(Patterns.rgx(allWords), comseparator)]),
            targetTable = Patterns.rep(Patterns.rgx(allWords), comseparator),
            whitespecesibbol = Patterns.rgx(/\s+?/);
    return function (string) {
        var whitespace, field, operation, from, innerjoin,
            table = {},
            innerResult = {},
            end = 0,
            whereOptional = {};

        function endSetter(num){
            return end = num;
        }
        function operationFounder() {
            operation = parseOperation.exec(string, 0);
            operation.res = operation.res.trim();
            endSetter(operation.end);
        }
        function fieldFounder() {
            field = targetField.exec(string, end);
            if(typeof field.res !== 'object') {
                field.res = [field.res];
            }
            endSetter(field.end);
        }
        function whitespaceFounder() {
            whitespace = whitespecesibbol.exec(string, end);
            endSetter(whitespace.end);
        }
        function fromFounder() {
            from = Patterns.txt(fromOperation).exec( string, end);
            if(from){
                end = from.end
            } else {
                throw Error('FROM not defined');
            }
        }
        function targetTableFounder(table) {
            var responce = targetTable.exec(string, end);
            table.res = responce.res;
            table.end = responce.end;
            endSetter(table.end);
            return table.res;
        }
        function innerJoinFounder() {
            var secondTAble = {};
            innerjoin = optionalInnerJoin.exec(string, end);
            endSetter(innerjoin.end);
            if(innerjoin.res) {
                innerResult = {
                    table1: {
                        name: table.res[0],
                        field: ''
                    },
                    table2: {
                        name: targetTableFounder(secondTAble)[0],
                        field: ''
                    },
                    criterion: ''
                };
            }
        }

        operationFounder();
        fieldFounder();
        whitespaceFounder();
        fromFounder();
        targetTableFounder(table);
        innerJoinFounder();

        return {
            operation: operation.res,
            targetField: field.res,
            targetTable: table.res,
            innerjoin: innerResult,
            where: whereOptional
        };
    }
});
/*

*/