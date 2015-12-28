define(function (require) {
    "use strict";

    var paramsFounder = require('../../source/app/SQL_Engine/SQL_Parser/paramsFounder');

    describe('SQL Engine', function () {

        describe('paramsFounder', function () {

            var targetString1 = 'select users.firstName, posts.text from posts join users on posts.userid = users.id',
                targetString2 = 'select users.firstName, posts.text from posts join users on posts.userid = users.id where users.id2  <= 2',
                array;

            beforeEach((function () {
                array = [];
            }));

            it('Should be defined', function () {
                expect(paramsFounder).toBeDefined();
            });

            it('Should return object', function () {
                expect(paramsFounder(array, targetString1, 56)).toEqual([
                    {
                        method: 'on',
                        firstJoinField: 'posts.userid',
                        sign: '=',
                        secondJoinField: 'users.id'
                    }
                ]);
            });

            it('Should return object', function () {
                expect(paramsFounder(array, targetString2, 56)).toEqual([
                    {
                        method: 'on',
                        firstJoinField: 'posts.userid',
                        sign: '=',
                        secondJoinField: 'users.id'
                    }, {
                        method: 'where',
                        firstJoinField: 'users.id2',
                        sign: '<=',
                        secondJoinField: '2'
                    }
                ]);
            });

        });

    });
});
