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
    
}); // end doc ready
