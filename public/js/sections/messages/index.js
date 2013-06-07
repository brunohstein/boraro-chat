var MessagesIndex = {

  ui: {
    list: $('.list', $('.messages.index'))
  },

  init: function() {
    MessagesIndex.showLoader();
    MessagesIndex.scroll(false);
    setTimeout(function() {
      MessagesIndex.hideLoader();
    }, 1000);
  },

  showLoader: function() {
    MessagesIndex.ui.list.append('<img src="/img/shared/loader.gif" class="loader">');

    $('.loader').css({
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '-30px 0 0 -30px'
    });

    MessagesIndex.ui.list.animate({
      opacity: 0.5
    });
  },

  hideLoader: function() {
    $('.loader').fadeOut(function() {
      $(this).remove();
    });

    MessagesIndex.ui.list.animate({
      opacity: 1
    });
  },

  scroll: function(animated) {
    if (animated == false) {
      setTimeout(function() {
        MessagesIndex.ui.list.scrollTop(MessagesIndex.ui.list[0].scrollHeight);
      }, 1000);
    } else if (animated == true) {
      MessagesIndex.ui.list.animate({
        scrollTop: MessagesIndex.ui.list[0].scrollHeight
      }, 1000);
    }
  }

};

$(function() {
  MessagesIndex.init();
});
