'use strict';
$(() => {
  // Create a 'clear' button and append it to each list item
  const allTasks = $('#todoItems').find('li');
  let i;
  for (i = 0; i < allTasks.length; i++) {
    $('<span/>', {
      class: 'clear',
      html: '\u00D7'
    }).appendTo(allTasks[i]);
  }

  // Hide each list item
  let clear = $('.clear');
  for (i = 0; i < clear.length; i++) {
    clear[i].onclick = function() {
      this.parentElement.remove();
    };
  }


  // Add a 'checked' symbol when clicking on a list item
  const list = $('#todoItems')[0];
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);

  // Create a new list item when clicking on the 'Add' button

  $('#taskForm').on('submit', newTask);
  function newTask(event) {
    event.preventDefault();
    const newTask = document.createElement('li');
    const inputValue = $('#newTask').val();
    const t = document.createTextNode(inputValue);
    newTask.appendChild(t);
    if (inputValue) {
      $('#todoItems').append(newTask);
    }
    $('#newTask').val('');

    $('<span/>', {
      class: 'clear',
      html: '\u00D7'
    }).appendTo(newTask);

    clear = $('.clear');
    for (i = 0; i < clear.length; i++) {
      clear[i].onclick = function() {
        this.parentElement.remove();
      };
    }
  }

  const widgets = $('#widgetBar > label > li');
  const windows = $('.widgetTray > li').addClass('widgetOff');
  for (i = 0; i < widgets.length; i++) {
    widgets[i].onclick = function() {
      for (var j = 0; j < windows.length; j++) {
        if (windows[j].id === this.id) {
          console.log(windows[0]);
          console.log($('.widgetTray > li')[0].className);
          windows[j].className === 'widgetOn' ? windows[j].className = 'widgetOff' : windows[j].className = 'widgetOn';
        }
      }
    };
  }

  // const hamburgerCheck = $('#hamburgerToggle > input');
  // hamburgerCheck.on('click', () => {
  //   $('nav > h1').hide();
  // });

});
