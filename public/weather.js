'use strict';
$(() => {

  $('li#weather').addClass('colorPageWidget');

  $('#backToWeather').click(function () {
    location.href = '/weather';
  });
});
