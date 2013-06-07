var MessagesAdd = {

  ui: {
    submit:   $('.send', $('.messages.add')),
    textarea: $('.text', $('.messages.add')),
    form:     $('.form', $('.messages.add'))
  },

  init: function() {
    MessagesAdd.bind();
  },

  bind: function() {
    MessagesAdd.ui.submit.click(function() {
      setTimeout(function() {
        MessagesAdd.clear();
      }, 500);
    });

    MessagesAdd.ui.textarea.keypress(function(e) {
      if (e.which == 13) {
        MessagesAdd.ui.form.submit();
        MessagesAdd.clear();
        return false;
      }
    });
  },

  clear: function() {
    MessagesAdd.ui.textarea.val('');
  }

};

$(function() {
  MessagesAdd.init();
});
