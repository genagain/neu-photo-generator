'use strict';

$.getJSON("../static/js/example_data.json", function (user) {

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

  var template = '<main class="main">' + '<section class="poster">' + '<div class="js-poster poster__content">' + '<div class="poster__column poster__body">' + '<blockquote class="js-quote poster__quote">' + 'Your quote goes here' + // user_input goes here
  '</blockquote>' + '<div class="poster__credit">' + '<span class="poster__name"><strong>' + user.name + '</strong></span>' + '<span class="poster__year">' + user.college.graduation_year + '</span>' + '<span class="poster__major">' + user.college.major + '</span>' + '</div>' + '</div>' + '<div class="poster__column poster__img" style="background-image: url(' + user.photo + ')"></div>' + '</div>' + '</section>' + '</main>';

  // style="background-image: url(' + user.photo + ');"

  $('.js-body').append(template);

  // let img = new Image();
  // img.src = user.photo;
  // img.setAttribute("class", "poster__column poster__img");
  // img.setAttribute("alt", user.name);
  // $('.js-poster').append(img);

  html2canvas(document.querySelector('.js-poster')).then(function (canvas) {
    $('.js-body').append(canvas);
  });
});