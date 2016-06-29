'use strict';

$(document).ready(function () {

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
    '</blockquote>' + '<div class="poster__credit">' + '<span class="poster__name"><strong>' + user.name + '</strong></span>' + '<span class="poster__year">' + user.college.graduation_year + '</span>' + '<span class="poster__major">' + user.college.major + '</span>' + '</div>' + '</div>' + '<div class="poster__column poster__img js-img" style="background-image: url(' + user.photo + ')"></div>' + '</div>' + '</section>' + '</main>';

    $('.js-body').append(template);
  });

  onBtnEvent('mouseenter', BtnMouseEnter);
  onBtnEvent('mouseleave', BtnMouseLeave);
});

var fbPostBtn = $('.js-button--fb');

fbPostBtn.on('click', function () {
  html2canvas(document.querySelector('.js-poster')).then(function (canvas) {
    console.log(canvas, 'click!', $('.js-input').val());
    $('.js-ghost').append(canvas);

    var imgData = document.querySelector('canvas').toDataURL('image/png');
  });
});

var onBtnEvent = function onBtnEvent(event, callback) {
  var button = $('.js-button--fb');
  button.on(event, callback);
};

var BtnMouseEnter = function BtnMouseEnter(e) {
  var target = $(e.currentTarget),
      animation = target.data('hover');
  target.addClass(animation);
};

var BtnMouseLeave = function BtnMouseLeave(e) {
  var target = $(e.currentTarget),
      animation = target.data('hover');
  target.removeClass(animation);
};