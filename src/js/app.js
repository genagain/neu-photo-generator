$(document).ready( () => {

    $('.js-input').on('keyup', () => {
      let user_input = $('.js-input').val(),
                elem = $('.js-quote');
        elem.html(user_input);
        return user_input;
    });

    $('.js-button').on('click', () => {
            let elem = $('.js-quote'),
          user_input = $('.js-input').val();

            elem.html(user_input);

        let words = user_input.split(' '),
            index = Math.floor(Math.random() * (words.length - 1)),
            wordA = words[index],
            wordB = words[index + 1],
      randomWords = wordA + ' ' + wordB;

      elem.html(elem.html().replace(new RegExp( randomWords, 'g' ),'<strong>' + randomWords + '</strong>'));

    });
  //
  // onBtnEvent('mouseenter', BtnMouseEnter);
  // onBtnEvent('mouseleave', BtnMouseLeave);

});

// end doc ready

let fbPostBtn = $('.js-button--fb');


fbPostBtn.on('click', () => {
  html2canvas(document.querySelector('.js-poster'))
    .then(function(canvas) {
      console.log(canvas,'click!', $('.js-input').val())
      $('.js-ghost').append(canvas);

      let imgData = document.querySelector('canvas').toDataURL('image/png');

  });
});






let onBtnEvent = (event, callback) => {
	let button = $('.js-button--fb');
	button.on(event, callback);
}

let BtnMouseEnter = (e) => {
  let target = $(e.currentTarget),
  animation = target.data('hover');
  target.addClass(animation);
}

let BtnMouseLeave = (e) => {
  let target = $(e.currentTarget),
  animation = target.data('hover');
  target.removeClass(animation);
}
