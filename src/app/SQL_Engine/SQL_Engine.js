define([
        'src/app/SQL_Engine/ParseCore'
    ], function(Patterns) {
    "use strict";

        var selectOperation = "select ",
            deleteOperation = "delete ",
            fromOperation = "from ",
            parseOperation = Patterns.opt(Patterns.txt(selectOperation)),
            comseparator = Patterns.rgx(new RegExp( "\\s\?\[,\]\\s\?")),
            targetField = Patterns.rep(Patterns.rgx(/\w+/), comseparator),
            targetTable = Patterns.rep(Patterns.rgx(/\w+/), comseparator),
            whitespecesibbol = Patterns.rgx(/\s+?/);

    return function (string) {
        var whitespace, end, field, operation, from, table,
        whereOptional = {};
        operation =  parseOperation.exec(string, 0);
        end = operation.end;
        if(!end) {
            operation =  parseOperation.exec(string, 0);
            end = operation.end;
        }
        console.log(end);
        field = targetField.exec(string, end);
        end = field.end;
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
/*
* Expected Object({ operation: 'select ', targetField: [ 'product_id1', 'product_id2' ], targetTable: [ 'm_income' ], where: Object({  }) })
* to equal Object({ operation: 'select', targetField: [ 'product_id1', 'product_id2' ], targetTable: [ 'm_income' ], where: Object({  }) }).
*
* */