define([
    'ParseCore'
], function (Patterns) {
    "use strict";

    function tableFounder(string, end) {
        return Patterns.rgx(/[\s]*[\w|\*]+[\s]*/).exec(string, end);
    }

    //output
    return tableFounder;
});