define([
    '../../src/app/SQL_Engine/SQL_Engine'
], function ( SELECT ) {
    "use strict";

    describe('SQL Engine', function() {
        var targetString1 = 'inner join product_id1 , product_id2 from m_income1, m_income2',
            targetString2 = 'select * from m_income1, m_income2';

        it('Should be defined', function() {
            expect(SELECT).toBeDefined();
        });

        it('Should find command SELECT and selected parameters on selected tables', function() {
            expect(SELECT(targetString1)).toEqual({
                operation: "inner join",
                targetField: ["product_id1", "product_id2"],
                targetTable: ["m_income1", "m_income2"],
                where: {}
            });
        });

        it('Should return query for all field from table', function () {
            expect(SELECT(targetString2)).toEqual({
                operation: "select",
                targetField: ["*"],
                targetTable: ["m_income1", "m_income2"],
                where: {}
            });
        });
    });
});

