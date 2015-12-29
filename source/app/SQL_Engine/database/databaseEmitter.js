define([
    '../SQL_Parser/SQL_Engine'
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
        var rowObject;
        var ansver = [];
        var database = JSON.parse(localStorage.getItem('fakedb'));
        var sqlQuery = sqlparser(query);
        if (!sqlQuery.innerjoin) {
            for (var i = 0, curentTable = database[sqlQuery.targetTable]; i < curentTable.length; i++) {
                rowObject = {};
                for (var k = 0, curentField = sqlQuery.targetField; k < curentField.length; k++) {
                    console.log(curentField[k]);
                    if (sqlQuery.where.length > 0) {
                        console.log(sqlQuery.where.length > 0);
                        for (var e = 0, checkedField1, checkedField2; e < sqlQuery.where.length; e++) {
                            checkedField1 = +sqlQuery.where[e].firstJoinField || (curentTable[i])[sqlQuery.where[e].firstJoinField];
                            checkedField2 = +sqlQuery.where[e].secondJoinField || (database[sqlQuery.joibedTable])[sqlQuery.where[e].secondJoinField];
                            if (parseCriterial(checkedField1, checkedField2, sqlQuery.where[e].sign)) {
                                console.log(checkedField1);
                                console.log(checkedField2);

                            }
                        }
                    } else {
                        rowObject[curentField[k]] = (curentTable[i])[curentField[k]];
                    }
                }
                console.log(rowObject);
                ansver.push(rowObject);
            }
        }
        console.log(JSON.stringify(sqlQuery));

        return ansver;
    }

    return databaseEmitter;
});