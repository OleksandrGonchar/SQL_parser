define(function( require ) {
    "use strict";

    var Patterns = require('src/app/SQL_Engine/ParseCore');

    function fieldFounder(str, end) {
        return Patterns.rep(
            Patterns.rgx(/([\s]*[\w|\*]+[[\.\[\w|\*]*]*[\s]*)/),
            Patterns.rgx(/([\s]*[\,][\s]*)/)
        ).exec(str, end);
    }

    return fieldFounder;
});