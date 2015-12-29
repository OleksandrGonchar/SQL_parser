define(function (require) {
    "use strict";

    var fakeUserTable, fakePostTable;
    var sqlQuery1 = "select text from fakePostTable";
    var sqlQuery2 = "select text,userId from fakePostTable";
    var sqlQuery3 = "select text from fakePostTable where id >= 3";
    var sqlQuery4 = "select firstName ,text  from fakeUserTable inner join fakePostTable  where id = userId";
    var dbName = "fakedb";
    //var databaseEmitter = require("../../source/app/SQL_Engine/database/databaseEmitter");
    //in one magic moment require don`t work
    describe('databaseEmitter', function () {
        beforeEach((function () {
            localStorage.removeItem(dbName);
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
                    userId: 4
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
        }));

        xit('Should be defined', function () {
            expect(databaseEmitter).toBeDefined();
        });

        xit('Should return table with 3 rows and one field', function () {
            expect(databaseEmitter(sqlQuery1)).toEqual([
                {text: "Hello..."},
                {text: "I have t..."},
                {text: "BANANA"}
            ]);
        });

        xit('Should return table with 3 rows and two field', function () {
            expect(databaseEmitter(sqlQuery2)).toEqual([
                {
                    text: "Hello...",
                    userId: 1
                }, {
                    text: "I have t...",
                    userId: 4
                }, {
                    text: "BANANA",
                    userId: 3
                }
            ]);
        });

        xit('Should return table with parameters', function () {
            expect(databaseEmitter(sqlQuery3)).toEqual([
                {text: "BANANA"}
            ]);
        });

        xit('Should return table with parameters', function () {
            expect(databaseEmitter(sqlQuery4)).toEqual([
                {
                    firstName: 'John',
                    text: 'Hello...'
                }, {
                    firstName: 'King',
                    text: 'BANANA'
                }
            ]);
        });
    });
});