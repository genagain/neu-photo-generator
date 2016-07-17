'use strict';

$(document).ready(function () {

    $('.js-input').on('keyup', function () {
        var user_input = $('.js-input').val(),
            elem = $('.js-quote');
        elem.html(user_input);
        return user_input;
    });

    $('.js-button').on('click', function () {
        var elem = $('.js-quote'),
            user_input = $('.js-input').val();

        elem.html(user_input);

        var words = user_input.split(' '),
            index = Math.floor(Math.random() * (words.length - 1)),
            wordA = words[index],
            wordB = words[index + 1],
            randomWords = wordA + ' ' + wordB;

        elem.html(elem.html().replace(new RegExp(randomWords, 'g'), '<strong>' + randomWords + '</strong>'));
    });
}); // end doc ready