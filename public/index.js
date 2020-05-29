$(() => {
  // Create a 'clear' button and append it to each list item
  const allTasks = $('#todoItems').find('li');
  let i;

  function renderTask(task) {
    const newTask = document.createElement('li');
    newTask.innerText = task.name;
    $('#todoItems').append(newTask);
    $('#newTask').val('');

    const $deleteBtn = $('<span/>', {
      class: 'clear',
      html: '\u00D7',
    });

    $deleteBtn.appendTo(newTask);

    $deleteBtn.click(function () {
      this.parentElement.remove();
      deleteTask(task.id);
    });
  }

  getTasks().done((tasks) => {
    tasks.forEach(renderTask);
  });

  // Add a 'checked' symbol when clicking on a list item
  const list = $('#todoItems')[0];
  list.addEventListener(
    'click',
    function (ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    },
    false
  );

  // Create a new list item when clicking on the 'Add' button
  $('#taskForm').on('submit', newTask);
  function newTask(event) {
    event.preventDefault();
    const inputValue = $('#newTask').val().trim();
    if (!inputValue) {
      return;
    }
    createTask(inputValue).done(renderTask);
  }

  const widgets = $('#widgetBar > label > li');
  const windows = $('.widgetTray > li').addClass('widgetOff');
  for (i = 0; i < widgets.length; i++) {
    widgets[i].onclick = function () {
      for (var j = 0; j < windows.length; j++) {
        if (windows[j].id === this.id) {
          console.log(windows[0]);
          console.log($('.widgetTray > li')[0].className);
          windows[j].className === 'widgetOn'
            ? (windows[j].className = 'widgetOff')
            : (windows[j].className = 'widgetOn');
        }
      }
    };
  }

  $('li#home').addClass('colorPageWidget');

  // database


  function getTasks() {
    return $.get({
      url: '/tasks'
    });
  }

  function createTask(taskName) {
    return $.post({
      url: '/tasks',
      data: { name: taskName },
      dataType: 'json',
    });
  }

  function deleteTask(id) {
    $.ajax({
      url: `/tasks/${id}`,
      type: 'DELETE',
      success: function () {
        console.log(`deleted ${id}`);
      },
    });
  }
});
