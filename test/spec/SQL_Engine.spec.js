define([
    '../../src/app/SQL_Engine/SQL_Engine'
], function ( SELECT ) {
    "use strict";

    describe('SQL Engine', function() {
        var targetString1 = 'delete product_id1 , product_id2 from m_income1, m_income2',
            targetString2 = 'select * from m_income1, m_income2',
            targetString3 = 'delete * from m_income1,m_income2,m_income3';

        it('Should be defined', function() {
            expect(SELECT).toBeDefined();
        });

        it('Should find command SELECT and selected parameters on selected tables', function() {
            expect(SELECT(targetString1)).toEqual({
                operation: "delete",
                targetField: ["product_id1", "product_id2"],
                targetTable: ["m_income1", "m_income2"],
                innerjoin: {},
                where: {}
            });
        });

        it('Should return query for all field from table', function () {
            expect(SELECT(targetString2)).toEqual({
                operation: "select",
                targetField: ["*"],
                targetTable: ["m_income1", "m_income2"],
                innerjoin: {},
                where: {}
            });
        });

        it('Should return query for all field from table', function () {
            expect(SELECT(targetString3)).toEqual({
                operation: "delete",
                targetField: ["*"],
                targetTable: ["m_income1", "m_income2", "m_income3"],
                innerjoin: {},
                where: {}
            });
        });
    });

    describe('Inner JOIN', function () {
        var targetString1 = "select dt, product_id, title, amount, price " +
            "from m_income inner join m_product where m_income.product_id=m_product.id";

        it('Should can parse inner join select', function () {
            expect(SELECT(targetString1)).toEqual({
                operation: "select",
                targetField: ['dt', 'product_id', 'title', 'amount', 'price'],
                targetTable: ["m_income"],
                innerjoin: {
                    table1: {
                    name: "m_income",
                    field: 'id'
                },
                    table2: {
                        name: 'm_product',
                        field: 'id'
                    },
                    criterion: ''},
                where: {}
            });
        });
    });

});

