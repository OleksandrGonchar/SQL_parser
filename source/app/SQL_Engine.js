define([
    'ParseCore',
    'innerjoinFounder',
    'operatorFounder',
    'fieldFounder',
    'tableFounder',
    'paramsFounder'
],function (Patterns, innerjoinFounder, operatorFounder, fieldFounder,tableFounder, paramsFounder) {
    "use strict";

    return function (string) {

        //declaration variable
        var operationAndSelectedFields,
            operation,
            fields,
            tableFirst,
            tableSecond,
            innerjoin,
            /**
             * @type {RegExp}
             * Monster regular expression for find SQL structure
             * {String} input "delete produ.ct_id1,product_id2.field, product_id3 from m_income1 inner join m_income2 "
             * {Object} output "{ res: "delete produ.ct_id1,product_id2.field, product_id3 from", end 56 }"
             */
            regexpForSelectField = /^\s*(delete|select)([\s]*[\w|\*]+[[\.]?[\w|\*]*]*)([\s]*[\,][\s]*[\w|\*]+[\.]?[\w|\*]+)*[\s]+(from)/,
            where = [];

        //work body
        operationAndSelectedFields = Patterns.rgx(regexpForSelectField).exec(string, 0);
        if (operationAndSelectedFields) {
            operation = operatorFounder(operationAndSelectedFields.res, 0);
            fields = operation && fieldFounder(operationAndSelectedFields.res, operation.end);
            tableFirst = tableFounder(string, operationAndSelectedFields.end);
        } else {
            throw Error('Invalid input');
        }
        innerjoin = tableFirst && innerjoinFounder(string, tableFirst.end);
        tableSecond = innerjoin && tableFounder(string, innerjoin.end);
        where = paramsFounder(where,
            string,
            tableSecond && tableSecond.end ||
            tableFirst && tableFirst.end
        );

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