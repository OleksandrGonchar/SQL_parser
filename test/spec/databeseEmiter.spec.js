define(function (require) {
    "use strict";

    var fakeUserTable, fakePostTable;
    var sqlQuery1 = "select text from fakePostTable";
    var sqlQuery2 = "select text from fakePostTable where id >= 3";
    var dbName = "fakedb";
    var databaseEmitter = require('../../source/app/SQL_Engine/database/databaseEmitter');

    describe('databaseEmitter', function () {
        beforeEach((function () {
            //console.log("Begin test",localStorage.getItem(dbName));
            localStorage.removeItem(dbName);
            //console.log("After remove item",localStorage.getItem(dbName));
            fakeUserTable = [
                {
                    id: 1,
                    firstName: "John",
                    lastName: "Doe",
                    login: "jdoe"
                }, {
                    id: 2,
                    firstName: "Jane",
                    lastName: "Doe",
                    login: "jadoe"
                }, {
                    id: 3,
                    firstName: "King",
                    lastName: "Kong",
                    login: "kk"
                }
            ];
            fakePostTable = [
                {
                    id: 1,
                    text: "Hello...",
                    userId: 1
                }, {
                    id: 2,
                    text: "I have t...",
                    userId: 1
                }, {
                    id: 3,
                    text: "BANANA",
                    userId: 3
                }
            ];

            localStorage.setItem(dbName, JSON.stringify({
                fakePostTable: fakePostTable,
                fakeUserTable: fakeUserTable
            }));
            //console.log("End test",localStorage.getItem(dbName));
        }));

        it('Should be defined', function () {
            expect(databaseEmitter).toBeDefined();
        });

        it('Should return table', function () {
            expect(databaseEmitter(sqlQuery1)).toEqual([
                {text: "Hello..."},
                {text: "I have t..."},
                {text: "BANANA"}
            ]);
        });

        it('Should return table with parameters', function () {
            expect(databaseEmitter(sqlQuery2)).toEqual([
                {text: "BANANA"}
            ]);
        });
    });
});