'use strict';

$(() => {
  $('.returningUserText').hide();
  $('.newUserText').hide();
  $('.saveInfo').hide();

  $('input[type="submit"]').hide();

  $('input[type="radio"]').change(function(){
    $('input[type="submit"]').show();
    $('.saveInfo').show();
    $('input[type="text"]').val('').prop('required', false);
    $('input[type="password"]').val('').prop('required', false);
    if ($(this).is(':checked')) {
      $('.returningUserText').hide();
      $('.newUserText').hide();
      $(`.${this.id}Text`).toggle().prop('required', true);
    }
  });



  // Send a request through jquery for the login form with a jquery get or post, do the redirecting for the form in here as well
  $('input[type="submit"]').on('submit', function(e) {
    e.preventDefault();
    const returnUser = $('#returningName').val();
    const newUser = $('#newName').val();
    const newLoc = $('#newLoc').val();

    localStorage.setItem('username', returnUser || newUser);
    localStorage.setItem('location', newLoc);

  });

});
