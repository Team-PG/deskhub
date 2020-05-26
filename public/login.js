'use strict';

$(() => {
  $('.returningUserText').hide();
  $('.newUserText').hide();
  $('input[type="submit"]').hide();

  $('input[type="radio"]').change(function(){
    $('input[type="submit"]').show();

    if ($(this).is(':checked'))
    {
      $('.returningUserText').hide();
      $('.newUserText').hide();
      $(`.${this.id}Text`).toggle();
    }
  });
});

// TODO:
// Update/save results from login form to local storage
