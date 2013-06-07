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
    var data = $.parseJSON(httpGet(MessagesIndex.url() + '.json'));
    MessagesIndex.counter = data.messages.length;

    MessagesIndex.showLoader();
    MessagesIndex.scroll(false);
    setTimeout(function() {
      MessagesIndex.hideLoader();
    }, 1000);
    setInterval(function() {
      MessagesIndex.refresh();
    }, 500);
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
    var data = $.parseJSON(httpGet(MessagesIndex.url() + '.json')),
        updates = data.messages.length - MessagesIndex.counter;

    if (updates > 0) {
      MessagesIndex.render(data.messages);
    };

    MessagesIndex.counter = data.messages.length;
  },

  render: function(messages) {
    for (i = MessagesIndex.counter; i < messages.length; i++) {
      MessagesIndex.ui.list.append(MessagesIndex.template(messages[i]));

      if (/^(jpg|jpeg|gif|png)$/.test(messages[i].body.split('.').pop())) {
        $('#message-' + messages[i].id).find('.body').html('<img src="' + messages[i].body + '">');
      };

      MessagesIndex.scroll(true);
    }
  }

};

$(function() {
  MessagesIndex.init();
});
