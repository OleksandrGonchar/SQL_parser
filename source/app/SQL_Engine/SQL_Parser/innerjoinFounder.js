define([
    'source/app/SQL_Engine/ParseCore'
], function (Patterns) {
    "use strict";

    function innerjoinFounder(string, end) {

        return Patterns.txt('inner join ').exec(string, end) ||
            Patterns.txt('join ').exec(string, end);
    }

    return innerjoinFounder;
});