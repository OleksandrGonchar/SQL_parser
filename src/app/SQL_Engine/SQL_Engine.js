define([
        'src/app/SQL_Engine/ParseCore'
    ], function(Patterns) {
    "use strict";

    return function(string) {
        var operationAndSelectedFields,operation,fields,tableFirst,tableSecond,innerjoin,firstJoinField,secondJoinField,firstJoinCriterial,secondJoinCriterial,sign,
        /*
            * @param {String} input " delete produ.ct_id1,product_id2, product_id3 from m_income1, m_income2 from from "
            * @return {String} " delete produ.ct_id1,product_id2, product_id3 from"
        */
            regexpForSelectField = /^\s*(delete|select)([\s]*[\w|\*]+[[\.\?][\w|\*]+]*)([\s]*[\,][\s]*[\w|\*]+[\.]?[\w|\*]+)*[\s]+(from)/,
            signPattern = Patterns.any([Patterns.txt('<='), Patterns.txt('='), Patterns.txt('>='), Patterns.txt('<'), Patterns.txt('>'), Patterns.txt('<>'), Patterns.txt('like')]),
            where = {};

        operationAndSelectedFields = Patterns.rgx(regexpForSelectField).exec(string, 0);

        operation = Patterns.any(
            [Patterns.txt("delete "),
            Patterns.txt("select ")]
        ).exec(operationAndSelectedFields.res.trim(), 0);

        fields = Patterns.rep(
            Patterns.rgx(/([\s]*[\w|\*]+[[\.\[\w|\*]+]*)/),
            /*
             * @param {String} input " produ.ct_id1,product_id2, product_id3 from"
             * @return {Array} output ["produ.ct_id1","product_id2","product_id3"]
            **/
            Patterns.rgx(new RegExp( "\\s\?\[,\]\\s\?"))
        ).exec(operationAndSelectedFields.res, operation.end);

        tableFirst = Patterns.rgx(/[\s]*[\w]+[\s]*/).exec(string, operationAndSelectedFields.end);

        innerjoin = Patterns.txt('inner join ').exec(string, tableFirst.end);
        if(!innerjoin) {
            innerjoin = Patterns.txt('join ').exec(string, tableFirst.end);
        }
        if(innerjoin) {
            tableSecond = Patterns.rgx(/[\s]*[\w]+[\s]*/).exec(string, innerjoin.end );
            if(tableSecond) {
                firstJoinCriterial = Patterns.rgx(/[\s]*(where|on)[\s]*/).exec(string, tableSecond.end);
                if (firstJoinCriterial) {
                    where.firstRule = {};
                    where.firstRule.method = firstJoinCriterial.res.trim();
                    firstJoinField = Patterns.rgx(/[\s]*[\w|\*]+[\.]?[\w|\*]+[\s]*/).exec(string, firstJoinCriterial.end);
                    if (firstJoinField) {
                        sign = signPattern.exec(string, firstJoinField.end);
                        if(sign) {
                            where.firstRule.sign = sign.res;
                            secondJoinField = Patterns.rgx(/[\s]*[\w|\*]+[\.]?[\w|\*]+[\s]*/).exec(string, sign.end);
                            if(secondJoinField) {
                                where.firstRule.secondJoinField = secondJoinField.res.trim();
                                where.firstRule.firstJoinField = firstJoinField.res.trim();

                                /*
                                * second rule... if found.... and this is duplicate
                                * */
                                if(secondJoinField) {
                                    secondJoinCriterial = Patterns.rgx(/[\s]*(where|on)[\s]*/).exec(string, secondJoinField.end);
                                    if(secondJoinCriterial) {
                                        where.secondRule = {};
                                        where.secondRule.method = secondJoinCriterial.res.trim();
                                        firstJoinField = Patterns.rgx(/[\s]*[\w|\*]+[\.]?[\w|\*]+[\s]*/).exec(string, secondJoinCriterial.end);
                                        if (firstJoinField) {
                                            sign = signPattern.exec(string, firstJoinField.end);
                                            if (sign) {
                                                where.secondRule.sign = sign.res;
                                                secondJoinField = Patterns.rgx(/[\s]*[\w|\*]+[\.]?[\w|\*]?[\s]*/).exec(string, sign.end);
                                                if (secondJoinField) {
                                                    where.secondRule.secondJoinField = secondJoinField.res.trim();
                                                    where.secondRule.firstJoinField = firstJoinField.res.trim();
                                                }else {
                                                    alert("Bad request!");
                                                }
                                            }else {
                                                alert("Bad request!");
                                            }
                                        }else {
                                            alert("Bad request!");
                                        }
                                    }else {
                                        alert("Bad request!");
                                    }
                                }else {
                                    alert("Bad request!");
                                }
                            }else {
                                alert("Bad request!");
                            }
                        }else {
                            alert("Bad request!");
                        }
                    }else {
                        alert("Bad request!");
                    }
                } else {
                    alert("Bad request!");
                }
            }
        }


            return {
                operation: operation.res.trim(),
                targetField: fields.res,
                targetTable: tableFirst.res.trim(),
                innerjoin: innerjoin && innerjoin.res.trim() || null,
                joibedTable: tableSecond && tableSecond.res.trim() || null,
                where: where
            };
        }
});