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

    html2canvas(document.querySelector('.js-poster')).then(function (canvas) {
      $('.js-body').append(canvas);
    });
  });
});

//      .then(function(canvas) {
//        $('.js-body').append(canvas);
//        $('canvas').attr('id', 'js-canvasImg');
//    });
//
//
//    var checkExist = setInterval(function() {
//      if ( $('#js-canvasImg').length ) {
//        console.log("Exists!");
//
//        function drawImage(imageObj) {
//   var canvas = document.getElementById('js-canvasImg');
//   var context = canvas.getContext('2d');
//   var x = 0;
//   var y = 0;
//
//   context.drawImage(imageObj, x, y);
//
//   var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
//   var data = imageData.data;
//
//   for(var i = 0; i < data.length; i += 4) {
//     var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
//     // red
//     data[i] = brightness;
//     // green
//     data[i + 1] = brightness;
//     // blue
//     data[i + 2] = brightness;
//   }
//
//   // overwrite original image
//   context.putImageData(imageData, x, y);
// }
//
// var imageObj = new Image();
// imageObj.onload = function() {
//   drawImage(this);
// };
// imageObj.src = user.photo;
//
//        clearInterval(checkExist);
//      }
//    }, 100); // check every 100ms