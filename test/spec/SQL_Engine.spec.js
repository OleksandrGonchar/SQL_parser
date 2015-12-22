define([
    '../../src/app/SQL_Engine/SQL_Engine'
], function ( SELECT ) {
    "use strict";

    describe('SQL Engine', function() {
        var targetString1 = ' delete produ.ct_id1,product_id2.field, product_id3 from m_income1 inner join m_income2 ',
            targetString2 = 'select *.kk from m_income1  ',
            targetString3 = 'select users.firstName, posts.text from posts join users on posts.userid = users.id where users.id2  <= 2';

        it('Should be defined', function() {
            expect(SELECT).toBeDefined();
        });

        it('Should return "delete product_id1 , product_id2 from"', function () {
            expect(SELECT(targetString2)).toEqual({
                operation: 'select',
                targetField: ['*.kk'],
                targetTable: 'm_income1',
                innerjoin: null,
                joibedTable: null,
                where: []
            });
        });

        xit('qq', function () {
            expect(SELECT('select * from topics where id_author>=2')).toEqual({
                operation: 'select',
                targetField: ['*.kk'],
                targetTable: 'm_income1',
                innerjoin: null,
                joibedTable: null,
                where: []
            });
        });

        it('Should return "delete product_id1 , product_id2 from"', function () {
            expect(SELECT(targetString1)).toEqual({
                operation: 'delete',
                targetField: ['produ.ct_id1','product_id2.field','product_id3'],
                targetTable: 'm_income1',
                innerjoin: 'inner join',
                joibedTable: 'm_income2',
                where: []
            });
        });

        it('Should parse join result', function () {
            expect(SELECT(targetString3)).toEqual({
                operation: 'select',
                targetField: ['users.firstName', 'posts.text'],
                targetTable: 'posts',
                innerjoin: 'join',
                joibedTable: 'users',
                where: [
                    {
                        method: 'on',
                        firstJoinField: 'posts.userid',
                        sign: '=',
                        secondJoinField: 'users.id'
                    },{
                        method: 'where',
                        sign: '<=',
                        firstJoinField: 'users.id2',
                        secondJoinField: '2'
                    }
                ]
            });
        });
    });

});