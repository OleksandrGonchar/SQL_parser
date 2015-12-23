define(function( require ) {
    "use strict";

    var Patterns = require('src/app/SQL_Engine/ParseCore');

    function innerjoinFounder(string, end){

        return Patterns.txt('inner join ').exec(string, end) ||
            Patterns.txt('join ').exec(string, end);
    }

    return innerjoinFounder;
});