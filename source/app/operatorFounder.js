define([
    'ParseCore'
], function (Patterns) {
    "use strict";

    function operatorFounder(string, end) {
        string = string.trim();

        return Patterns.any([
            Patterns.txt("delete "),
            Patterns.txt("select ")
        ]).exec(string, end);
    }

    return operatorFounder;
});
