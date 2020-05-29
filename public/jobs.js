'use strict';
$(() => {
  $('.jobDescription').hide();
  const items = $('li');
  for(let i = 0; i < items.length; i++) {
    $(`#viewJobDesc${i}`).on('click',() => {
      $(`#jobDesc${i}`).toggle();
    });

  }

  $('li#jobs').addClass('colorPageWidget');

  $('#backToJobs').click(function () {
    location.href = '/jobs';
  });
});
