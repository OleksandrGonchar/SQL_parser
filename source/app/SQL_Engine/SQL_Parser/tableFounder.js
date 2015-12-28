define(function (require) {
    "use strict";

    var Patterns = require('source/app/SQL_Engine/ParseCore');

    function tableFounder(string, end) {
        return Patterns.rgx(/[\s]*[\w|\*]+[\s]*/).exec(string, end);
    }

    return tableFounder;
});