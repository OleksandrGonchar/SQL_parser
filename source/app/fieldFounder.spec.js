define(function (require) {
    "use strict";

    var fieldFounder = require('fieldFounder');

    describe('SQL Engine', function () {

        describe('fieldFounder', function () {
            var targetString1 = "all bya all",
                targetString2 = "all , bya all",
                targetString3 = "all,bya all",
                targetString4 = "all.bya all",
                targetString5 = "* all";

            it('Should be defined', function () {
                expect(fieldFounder).toBeDefined();
            });

            it('Should return object with field res: ["all"]', function () {
                expect(fieldFounder(targetString1, 0)).toEqual({
                    res: ["all"],
                    end: 4
                });
            });

            it('Should return object with field res: ["all", "bya"]', function () {
                expect(fieldFounder(targetString2, 0)).toEqual({
                    res: ["all", "bya"],
                    end: 10
                });
            });

            it('Should return object with field res: ["all", "bya"]', function () {
                expect(fieldFounder(targetString3, 0)).toEqual({
                    res: ["all", "bya"],
                    end: 8
                });
            });

            it('Should return object with field res: ["all.bya"]', function () {
                expect(fieldFounder(targetString4, 0)).toEqual({
                    res: ["all.bya"],
                    end: 8
                });
            });

            it('Should return object with field res: ["*"]', function () {
                expect(fieldFounder(targetString5, 0)).toEqual({
                    res: ["*"],
                    end: 2
                });
            });

        });

    });
});
