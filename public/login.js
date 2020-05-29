'use strict';

$(() => {
  $('.returningUserText').hide();
  $('.newUserText').hide();
  $('.saveInfo').hide();

  $('input[type="submit"]').hide();

  $('input[type="radio"]').change(function(){
    $('input[type="submit"]').show();
    $('.saveInfo').show();
    $('input[type="text"]').val('');
    $('input[type="password"]').val('');
    if ($(this).is(':checked')) {
      $('.returningUserText').hide();
      $('.newUserText').hide();
      $(`.${this.id}Text`).toggle();
    }
  });

  // Send a request through jquery for the login form with a jquery get or post, do the redirecting for the form in here as well
  $('input[type="submit"]').on('submit', function(e) {
    e.preventDefault();
  });

});

// TODO:
// Update/save results from login form to local storage
