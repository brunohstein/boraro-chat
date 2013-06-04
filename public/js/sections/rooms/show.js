var RoomsShow = {

  ui: {
    list:     $('.list'),
    submit:   $('.send'),
    textarea: $('.text'),
    form:     $('.form')
  },

  init: function() {
    RoomsShow.bind();
    RoomsShow.scroll();
  },

  bind: function() {
    RoomsShow.ui.submit.click(function() {
      RoomsShow.clear();
      RoomsShow.scroll();
    });

    RoomsShow.ui.textarea.keypress(function(e) {
      if (e.which == 13) {
        RoomsShow.ui.form.submit();
        RoomsShow.clear();
        RoomsShow.scroll();
        return false;
      }
    });
  },  

  clear: function() {
    RoomsShow.ui.textarea.val('');
  },

  scroll: function() {
    RoomsShow.ui.list.animate({
      scrollTop: RoomsShow.ui.list[0].scrollHeight
    }, 1000);
  }

};

$(function() {
  RoomsShow.init();
});
