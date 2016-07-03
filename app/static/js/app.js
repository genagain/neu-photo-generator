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
  //
  // onBtnEvent('mouseenter', BtnMouseEnter);
  // onBtnEvent('mouseleave', BtnMouseLeave);
});

// end doc ready

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