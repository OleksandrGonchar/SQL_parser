define([
    'databaseEmitter',
    'lib/lodash/lodash.min',
    'lib/jquery/jquery.min'
], function (database, lodash) {
    "use strict";

    (function aplication() {

        var searchField = $('#searchField');
        var button = $('#submitButton');
        var answer;
        var value = '';
        button.click(function(e){
            e.preventDefault();
            value = searchField.val();
            console.log(value);
            answer = database(value);
            console.log(answer);
        });
    })();

    //output
});