define([
        'src/app/SQL_Engine/ParseCore'
    ], function(Patterns) {
    "use strict";

        var selectOperation = "select ",
            deleteOperation = "delete ",
            innerJoinOperation = "inner join ",
            fromOperation = "from ",
            parseOperation = Patterns.any([Patterns.txt(selectOperation),
                Patterns.txt(innerJoinOperation),
                Patterns.txt(deleteOperation)]),
            comseparator = Patterns.rgx(new RegExp( "\\s\?\[,\]\\s\?")),
            targetField = Patterns.any([ Patterns.txt("*"), Patterns.rep(Patterns.rgx(/\w+/), comseparator)]),
            targetTable = Patterns.rep(Patterns.rgx(/\w+/), comseparator),
            whitespecesibbol = Patterns.rgx(/\s+?/);
    return function (string) {
        var whitespace, end, field, operation, from, table,
        whereOptional = {};

        function endSetter(num){
            return end = num;
        }
        function operationFounder() {
            operation = parseOperation.exec(string, 0);
            endSetter(operation.end);
        }
        function fieldFounder() {
            field = targetField.exec(string, end);
            if(typeof field.res !== 'object') {
                field.res = [field.res];
            }
            endSetter(field.end);
        }

        operationFounder();
        fieldFounder();
        whitespace = whitespecesibbol.exec(string, end);
        end = whitespace.end;
        from = Patterns.txt(fromOperation).exec( string, end);
        if(from){
            end = from.end
        } else {
            return
        }
        table = targetTable.exec(string, end);

        return {
            operation: operation.res.trim(),
            targetField: field.res,
            targetTable: table.res,
            where: whereOptional
        };
    }
});