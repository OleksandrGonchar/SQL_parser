define(function ( require ) {
    "use strict";

    var operatorFounder = require('../../src/app/SQL_Engine/SQL_Parser/operatorFounder');

    describe('SQL Engine', function () {

        describe('operatorFounder', function () {
            var targetString1 = "select al from all",
                targetString2 = "delete al from all",
                targetString3 = "     delete   al from all",
                targetString4 = "abra kadabra ";

            it('Should be defined', function () {
                expect(operatorFounder).toBeDefined();
            });

            it('Should be undefined', function () {
                expect(operatorFounder(targetString4, 0)).toBeUndefined();
            });

            it('Should return select', function () {
                expect(operatorFounder(targetString1, 0)).toEqual({
                    res: 'select ',
                    end: 7
                });
            });

            it('Should return object with field res: select', function () {
                expect(operatorFounder(targetString2, 0)).toEqual({
                    res: 'delete ',
                    end: 7
                });
            });

            it('Should return object with field res: select', function () {
                expect(operatorFounder(targetString3, 0)).toEqual({
                    res: 'delete ',
                    end: 7
                });
            });

        });

    });
});

