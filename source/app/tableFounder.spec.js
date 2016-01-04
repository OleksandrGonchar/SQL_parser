define(function ( require ) {
    "use strict";

    var tableFounder = require('tableFounder');

    describe('SQL Engine', function () {
        var targetString1 = ' m_income1 m_income2 ',
            targetString2 = ' m_income1 ,  m_income2 ',
            targetString3 = ' * ',
            targetString4 = ' /*dew*1234* ';

        describe('tableFounder', function () {

            it('Should be defined', function () {
                expect(tableFounder).toBeDefined();
            });

            it('Should be undefined', function () {
                expect(tableFounder(targetString4, 0)).toBeUndefined();
            });

            it('Should found " m_income1 " in string ', function () {
                expect(tableFounder(targetString1, 0)).toEqual({
                    res: ' m_income1 ',
                    end: 11
                });
            });

            it('Should found " m_income1 " in string', function () {
                expect(tableFounder(targetString2, 0)).toEqual({
                    res: ' m_income1 ',
                    end: 11
                });
            });

            it('Should found " * " in string', function () {
                expect(tableFounder(targetString3, 0)).toEqual({
                    res: ' * ',
                    end: 3
                });
            });

        });

    });
});
