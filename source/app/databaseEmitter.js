define([
    'SQL_Engine'
], function (sqlparser) {
    "use strict";

    function parseCriterial(param1, param2, parametr) {
        //if parameter can be number change type of parameter from string to number
        if (+param1) {
            param1 = +param1;
        }
        if (+param2) {
            param2 = +param2;
        }
        if (parametr === '=') {
            return param1 === param2;
        }
        if (parametr === '<=') {
            return param1 <= param2;
        }
        if (parametr === '<') {
            return param1 < param2;
        }
        if (parametr === '>=') {
            return param1 >= param2;
        }
        if (parametr === '>') {
            return param1 > param2;
        }
        if (parametr === '<>') {
            return param1 !== param2;
        }
    }

    function databaseEmitter(query) {
        //evil magic 4 loops on in another
        var rowObject;
        var ansver = [];
        var database = JSON.parse(localStorage.getItem('fakedb'));
        var sqlQuery = sqlparser(query);
        for (var i = 0, curentTable = database[sqlQuery.targetTable]; i < curentTable.length; i++) {
            rowObject = {};
            for (var k = 0, f = true, curentField = sqlQuery.targetField; k < curentField.length; k++) {
                if (sqlQuery.where.length > 0) {
                    for (var e = 0, checkedField1, checkedField2; e < sqlQuery.where.length; e++) {

                        for (var j = 0, len = (database[sqlQuery.joibedTable]) && (database[sqlQuery.joibedTable]).length || 1; j < len; j++) {
                            checkedField1 = +sqlQuery.where[e].firstJoinField || (curentTable[i])[sqlQuery.where[e].firstJoinField];
                            checkedField2 = +sqlQuery.where[e].secondJoinField || ((database[sqlQuery.joibedTable])[j])[sqlQuery.where[e].secondJoinField];

                            if (parseCriterial(checkedField1, checkedField2, sqlQuery.where[e].sign)) {

                                rowObject[curentField[k]] = (curentTable[i])[curentField[k]] || ((database[sqlQuery.joibedTable])[j])[curentField[k]];
                                if (f) {
                                    f = false;
                                    ansver.push(rowObject);
                                }
                            }
                        }
                    }
                } else {
                    rowObject[curentField[k]] = (curentTable[i])[curentField[k]];
                }
            }
            if (sqlQuery.where.length === 0) {
                ansver.push(rowObject);
            }
        }

        return ansver;
    }

    return databaseEmitter;
});