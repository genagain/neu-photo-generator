"use strict";

$(document).ready(function () {

  $.getJSON("../static/js/fb_data.json", function (user) {

    var firstName = user.first_name;
    var fullName = user.name;
    var avatar = user.picture.data.url;

    var education = user.education;
    var college = education.find(isCollege);

    function isCollege(school) {
      return school.type === "College";
    }

    var major = college.concentration.reduce(isMajor, []);
    var fullMajor = major.substr(0, major.length - 3);

    function isMajor(fullMajor, concentration) {
      var isMinor = concentration.name.includes("Minor" || "minor" || "MINOR");
      if (isMinor === false) {
        return fullMajor + concentration.name + ' & ';
      } else {
        return fullMajor;
      }
    }

    var fullYear = college.year.name.split('');
    var shortYear = fullYear[2] + fullYear[3];

    console.log(JSON.stringify(fullName + ', ' + fullMajor + ', ' + shortYear, null, 2));

    // $('.js-input').on('keyup', () => {
    //   let user_input = $('.js-input').val(),
    //             elem = $('.js-quote');
    //     elem.html(user_input);
    //     return user_input;
    // });
    //
    // $('.js-button').on('click', () => {
    //         let elem = $('.js-quote'),
    //       user_input = $('.js-input').val();
    //
    //         elem.html(user_input);
    //
    //     let words = user_input.split(' '),
    //         index = Math.floor(Math.random() * (words.length - 1)),
    //         wordA = words[index],
    //         wordB = words[index + 1],
    //   randomWords = wordA + ' ' + wordB;
    //
    //   elem.html(elem.html().replace(new RegExp( randomWords, 'g' ),'<strong>' + randomWords + '</strong>'));
    //
    // });

    // let template ='<main class="main">' +
    //     '<section class="poster">' +
    //       '<div class="js-poster poster__content">' +
    //         '<div class="poster__column poster__body">' +
    //         	'<blockquote class="js-quote poster__quote">' +
    //             'Your quote goes here' + // user_input goes here
    //         	'</blockquote>' +
    //       		'<div class="poster__credit">' +
    //       			'<span class="poster__name"><strong>' + user.name + '</strong></span>' +
    //       			'<span class="poster__year">' + user.college.graduation_year + '</span>' +
    //       			'<span class="poster__major">' + user.college.major + '</span>' +
    //       		'</div>' +
    //       	'</div>' +
    //         '<div class="poster__column poster__img js-img" style="background-image: url(' + user.photo + ')"></div>' +
    //       '</div>' +
    //     '</section>' +
    //   '</main>';
    //
    //
    // $('.js-body').append(template);
  });

  onBtnEvent('mouseenter', BtnMouseEnter);
  onBtnEvent('mouseleave', BtnMouseLeave);
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