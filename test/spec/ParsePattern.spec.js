define(function ( require) {
    "use strict";

    var Pattern = require('../../src/app/SQL_Engine/ParsePattern');

    describe('Pattern', function () {

        it('Should be defined', function () {
            expect(Pattern).toBeDefined();
        });

        it('Should be ', function () {
            var execFn = jasmine.createSpy('execFn');
            var text = new Pattern(execFn);
            text.exec('hello', 0);
            expect(execFn).toHaveBeenCalledWith('hello', 0);
        });

        it('Should be able to transform result', function () {
            var text = new Pattern(
                function(str, pos) {
                    return {
                        res: str,
                        end: pos
                    };
                }).than(
                    function (res) {
                        return 'transformed'+ res
                    }
                );
            expect(text.exec('Hello', 2)).toEqual({
                res: "transformedHello",
                end: 2
            });
        });

        it('Should return undefined if take undefined ', function () {
            var text = new Pattern(
                function(str, pos) {
                    return undefined;
                }).than(
                function (res) {
                    return 'transformed'+ res
                }
            );
            expect(text.exec('Nothing', 0)).toBeUndefined();
        });
    });
    
});
