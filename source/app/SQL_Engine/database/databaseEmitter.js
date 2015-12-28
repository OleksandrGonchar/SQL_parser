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
        var database = JSON.parse(localStorage.getItem("fakedb"));
        var queryParser = sqlparser(query);
        var ansver = [];
        for (var i = 0, responceObj,
                 field = queryParser.targetField,
                 join = queryParser.innerjoin,
                 where = queryParser.where;
             i < database[queryParser.targetTable].length; i++) {
            responceObj = {};
            if (where.length > 0) {
                for (var k = 0; k < where.length; k++) {
                    if (join) {
                        for (var j = 0; j < field.length; j++) {
                            if (parseCriterial(
                                    ((database[queryParser.targetTable])[i])[where[k].secondJoinField],
                                    ((database[queryParser.targetTable])[i])[where[k].firstJoinField],
                                    where[k].sign
                                )) {
                                if (((database[queryParser.targetTable])[i])[field[j]]) {
                                    responceObj[field[j]] = ((database[queryParser.targetTable])[i])[field[j]];
                                    ansver.push(responceObj);
                                } else {
                                    if (((database[queryParser.joibedTable])[i])[field[j]]) {
                                        responceObj[field[j]] = ((database[queryParser.joibedTable])[i])[field[j]];
                                    }
                                }
                            }
                        }
                    } else {
                        if (parseCriterial(
                                ((database[queryParser.targetTable])[i])[where[k].firstJoinField],
                                where[k].secondJoinField,
                                where[k].sign
                            )) {
                            for (var e = 0; e < field.length; e++) {
                                responceObj[field[e]] = ((database[queryParser.targetTable])[i])[field[e]];
                                ansver.push(responceObj);
                            }
                        }
                    }
                }
            } else {
                responceObj[field] = ((database[queryParser.targetTable])[i])[field];
                ansver.push(responceObj);
            }
        }

        return ansver;
    }

    return databaseEmitter;
});