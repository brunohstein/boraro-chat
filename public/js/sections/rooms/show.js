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
      setTimeout(function() {
        RoomsShow.clear();
        RoomsShow.scroll(true);
      }, 100);
    });

    RoomsShow.ui.textarea.keypress(function(e) {
      if (e.which == 13) {
        RoomsShow.ui.form.submit();
        RoomsShow.clear();
        RoomsShow.scroll(true);
        return false;
      }
    });
  },  

  clear: function() {
    RoomsShow.ui.textarea.val('');
  },

  scroll: function(animated) {
    if (animated == 'undefined') {
      RoomsShow.ui.list.scrollTop(RoomsShow.ui.list[0].scrollHeight);
    } else {
      setTimeout(function() {
        RoomsShow.ui.list.animate({
          scrollTop: RoomsShow.ui.list[0].scrollHeight
        }, 1000);
      }, 150);
    }
  }

};

$(function() {
  RoomsShow.init();
});
