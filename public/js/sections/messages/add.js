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
      MessagesAdd.clear();
      setTimeout(function() {
        MessagesIndex.refresh();
      }, 500);
    });

    MessagesAdd.ui.textarea.keypress(function(e) {
      if (e.which == 13) {
        MessagesAdd.ui.form.submit();
        MessagesAdd.clear();
        setTimeout(function() {
          MessagesIndex.refresh();
        }, 500);
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
