var MessagesIndex = {

  ui: {
    list: $('.list', $('.messages.index'))
  },

  counter: 0,

  url: function() {
    if (location.href.slice(-1) == '/') {
      return location.href.slice(0, -1);
    } else {
      return location.href;
    };
  },

  currentUser: function() {
    return MessagesIndex.ui.list.attr('data-currentUser');
  },

  init: function() {
    var data = JSON.parse(httpGet(MessagesIndex.url() + '.json'));
    MessagesIndex.counter = data.messages.length;

    MessagesIndex.showLoader();

    MessagesIndex.scroll(false);

    setTimeout(function() {
      MessagesIndex.hideLoader();
    }, 1000);

    setInterval(function() {
      MessagesIndex.refresh();
    }, 2000);
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
      MessagesIndex.ui.list.stop().animate({
        scrollTop: MessagesIndex.ui.list[0].scrollHeight
      }, 500);
    }
  },

  template: function(message) {
    var self = [
      '<li id="message-' + message.id + '" class="self">',
        '<p class="body">' + message.body + '</p>',
        '<img class="avatar" src="' + message.user.avatar + '"> ',
        '<div class="info">',
          '<h2 class="name">' + message.user.name + '</h2>',
          '<span class="time">' + geddy.date.relativeTime(new Date(message.createdAt)) + '</span>',
        '</div>',
      '</li>'].join('');

    var other = [
      '<li id="message-' + message.id + '" class="other">',
        '<p class="body">' + message.body + '</p>',
        '<div class="info">',
          '<h2 class="name">' + message.user.name + '</h2>',
          '<span class="time">' + geddy.date.relativeTime(new Date(message.createdAt)) + '</span>',
        '</div>',
        '<img class="avatar" src="' + message.user.avatar + '"> ',
      '</li>'].join('');

    if (message.user.id == MessagesIndex.currentUser()) {
      return $(self);
    } else {
      return $(other);
    };
  },

  refresh: function() {
    $.ajax({
      url: MessagesIndex.url() + '.json',
      type: 'get',
      dataType: 'json',
      cache: false,
      async: false,
      success: function(data) {
        var updates = data.messages.length - MessagesIndex.counter;

        if (updates > 0) {
          for (i = MessagesIndex.counter; i < data.messages.length; i++) {
            MessagesIndex.render(data.messages[i]);
          }

          MessagesIndex.counter = data.messages.length;
        };
      }
    });
  },

  render: function(message) {
    MessagesIndex.ui.list.append(MessagesIndex.template(message));

    if (/^(jpg|jpeg|gif|png)$/.test(message.body.split('.').pop())) {
      $('#message-' + message.id).find('.body').html('<img src="' + message.body + '">');
    };

    MessagesIndex.scroll(true);
  }

};

$(function() {
  MessagesIndex.init();
});
