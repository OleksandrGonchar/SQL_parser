define([
    '../../src/app/SQL_Engine/SQL_Engine'
], function ( SELECT ) {

    describe('SQL Engine', function() {
        var targetString = 'select product_id1 , product_id2 from m_income';

        it('Should be defined', function() {
            expect(SELECT).toBeDefined();
        });

        it('Should be find SELECT and selected parameters ', function() {
            expect(SELECT(targetString)).toEqual({
                operation: "select",
                targetField: ["product_id1", "product_id2"],
                targetTable: ["m_income"],
                where: {}
            });
        });
    });
});

