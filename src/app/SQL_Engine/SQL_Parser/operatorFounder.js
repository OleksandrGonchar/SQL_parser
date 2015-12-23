define(function( require ) {
    "use strict";

    var Patterns = require('src/app/SQL_Engine/ParseCore');

    function operatorFounder(string, end){
        string = string.trim();

        return Patterns.any([
            Patterns.txt("delete "),
            Patterns.txt("select ")
        ]).exec(string, end);
    }

    return operatorFounder;
});
