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
        var query = sqlparser(query);
        var ansver = [];
        for (var i = 0, responceObj,
                 field = query.targetField,
                 where = query.where;
             i < database[query.targetTable].length; i++) {
            //console.log((database[query.targetTable])[i]);
            responceObj = {};
            if (where.length > 0) {
                for (var k = 0; k < where.length; k++) {
                    if (parseCriterial((((database[query.targetTable])[i])[where[k].firstJoinField]), where[k].secondJoinField, where[k].sign)) {

                        responceObj[field] = ((database[query.targetTable])[i])[field];
                        ansver.push(responceObj);
                    }
                }
            } else {
                responceObj[field] = ((database[query.targetTable])[i])[field];
                ansver.push(responceObj);
            }
        }

        return ansver;
    }

    return databaseEmitter;
});

