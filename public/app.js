'use strict';
$(() => {

  const hamburgerCheck = $('#hamburgerToggle > input');
  let h1hidden = false;
  hamburgerCheck.on('click', () => {
    if ($(window).width() < 430) {
      if (h1hidden){
        $('nav > a > h1').css('visibility', 'visible');
        h1hidden = false;
      } else {
        $('nav > a > h1').css('visibility', 'hidden');
        h1hidden = true;
      }
    } else {
      $('nav > a > h1').css('visibility', 'visible');
      h1hidden = false;
    }
  });

});
