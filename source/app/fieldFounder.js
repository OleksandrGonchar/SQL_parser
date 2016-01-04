define([
    'ParseCore'
], function (Patterns) {
    "use strict";


    function fieldFounder(str, end) {
        return Patterns.rep(
            Patterns.rgx(/([\s]*[\w|\*]+[[\.\[\w|\*]*]*[\s]*)/),
            Patterns.rgx(/([\s]*[\,][\s]*)/)
        ).exec(str, end);
    }

    return fieldFounder;
});