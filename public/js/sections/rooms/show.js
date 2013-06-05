var RoomsShow = {

  ui: {
    list:     $('.list'),
    submit:   $('.send'),
    textarea: $('.text'),
    form:     $('.form')
  },

  init: function() {
    RoomsShow.bind();
    RoomsShow.showLoader();
    RoomsShow.scroll(false);
    setTimeout(function() {
      RoomsShow.hideLoader();
    }, 1500);
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

  showLoader: function() {
    RoomsShow.ui.list.append('<img src="/img/shared/loader.gif" class="loader">');

    $('.loader').css({
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '-30px 0 0 -30px'
    });

    RoomsShow.ui.list.animate({
      opacity: 0.5
    });
  },

  hideLoader: function() {
    $('.loader').fadeOut(function() {
      $(this).remove();
    });

    RoomsShow.ui.list.animate({
      opacity: 1
    });
  },  

  clear: function() {
    RoomsShow.ui.textarea.val('');
  },

  scroll: function(animated) {
    if (animated == false) {
      setTimeout(function() {
        RoomsShow.ui.list.scrollTop(RoomsShow.ui.list[0].scrollHeight);
      }, 1500);
    } else if (animated == true) {
      RoomsShow.ui.list.animate({
        scrollTop: RoomsShow.ui.list[0].scrollHeight
      }, 1000);
    }
  }

};

$(function() {
  RoomsShow.init();
});
