'use strict';
$(() => {
  const $html = $('html');
  $('#theme-selector').change((event) => {
    const newTheme = event.target.value;
    $html.removeClass().addClass(newTheme);
    localStorage.setItem('theme', newTheme);
  });
  let theme = localStorage.getItem('theme');
  $html.removeClass().addClass(theme);
});
