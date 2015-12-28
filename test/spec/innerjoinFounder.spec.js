define(function ( require ) {
    "use strict";

    var innerjoinFounder = require('../../source/app/SQL_Engine/SQL_Parser/innerjoinFounder');

    describe('SQL Engine', function () {

        var targetString1 = ' delete produ.ct_id1,product_id2.field, product_id3 from posts inner join users on posts',
            targetString2 = 'select users.firstName, posts.text from posts join users on posts.userid = users.id where users.id2  <= 2';

        describe('innerjoinFounder', function () {

            it('Should be defined', function () {
                expect(innerjoinFounder).toBeDefined();
            });

            it('Should be equal', function () {
                expect(innerjoinFounder(targetString1, 63)).toEqual({
                    res: "inner join ",
                    end: 74
                });
            });

            it('Should be equal', function () {
                expect(innerjoinFounder(targetString2, 46)).toEqual({
                    res: "join ",
                    end: 51
                });
            });

        });
    });
});

