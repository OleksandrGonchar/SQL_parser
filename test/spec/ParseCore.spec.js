define([
    '../../src/app/SQL_Engine/ParseCore'
], function ( Patterns ) {
    "use strict";

    describe('Patterns ParseCore', function () {

        describe('txt', function () {
            it('Should be defined', function () {
                expect(Patterns.txt).toBeDefined();
            });

            it('Should read predefine text', function () {
                var txt = Patterns.txt('Hello');
                expect(txt.exec('Hello', 0)).toEqual({
                    res: 'Hello',
                    end: 5
                })
            });

            it('Should be return undefined if npt found', function () {
                var txt = Patterns.txt('Hello');
                expect(txt.exec('Hllo', 0)).toBeUndefined();
            });

            it('Should be read from specified position', function () {
                var txt = Patterns.txt('Hello');
                expect(txt.exec('1234 Hello', 5)).toEqual({
                    res: 'Hello',
                    end: 10
                });
            });
        });

        describe('rgx', function () {
            it('Should be defined', function () {
                expect(Patterns.rgx).toBeDefined();
            });

            it('Should be fined in string', function () {
                expect(Patterns.rgx(/\d+/).exec('12324njnkmk', 0)).toEqual({
                    res: "12324",
                    end: 5
                });
            });

            it('Should be fined in string', function () {
                expect(Patterns.rgx(/\d+/).exec('jnkmk 12324', 6)).toEqual({
                    res: "12324",
                    end: 11
                });
            });
        });

        describe('opt', function () {
            var select = Patterns.txt( 'SELECT' );
            var optSelect = Patterns.opt(select);

            it('Should be defined', function () {
                expect(Patterns.opt).toBeDefined();
            });

            it('Should be fined in string', function () {
                expect(optSelect.exec( 'SELECT * FROM', 0)).toEqual({
                    res: 'SELECT',
                    end: 6
                });
            });

            it('Should return undefined if not selected', function () {
                expect(optSelect.exec( 'SLCT * FROM', 0)).toEqual({
                    res: undefined,
                    end: 0
                });
            });
        });

        describe('any', function () {
            var p = Patterns.any([Patterns.txt("abc"), Patterns.txt("def")]);

            it('Should be defined', function () {
                expect(Patterns.any).toBeDefined();
            });

            it('Should be return first answer', function () {
                expect(p.exec("abc", 0)).toEqual({
                    res: 'abc',
                    end: 3
                });
            });

            it('Should be return def', function () {
                expect(p.exec("def", 0)).toEqual({
                    res: 'def',
                    end: 3
                });
            });

            it('Should be return undefined', function () {
                expect(p.exec("DOU", 0)).toBeUndefined();
            });
        });

        describe('seq', function () {
            var p = Patterns.seq([Patterns.txt("abc"), Patterns.txt("def")]);

            it('Should be defined', function () {
                expect(Patterns.seq).toBeDefined();
            });

            it('Should be return array result', function () {
                expect(p.exec("abcdef", 0)).toEqual({
                    res: ["abc", "def"],
                    end: 6
                });
            });
        });

        describe('rep', function () {
            var patternArray = Patterns.rep(Patterns.rgx(/\d+/), Patterns.txt(','));

            it('Should be defined', function () {
                expect(Patterns.rep).toBeDefined();
            });

            it('Should return array of result', function () {
                expect(patternArray.exec("9,23,456 fdf", 0)).toEqual({
                    res: ["9", "23", "456"],
                    end: 8
                });
            });

            it('Should be return 123', function () {
                expect(patternArray.exec("123ABC", 0)).toEqual({
                    res: ["123"],
                    end: 3
                });
            });

            it('Should be return 123', function () {
                expect(patternArray.exec("ABC", 0)).toEqual({
                    res: [],
                    end: 0
                });
            });
        });

    });
});