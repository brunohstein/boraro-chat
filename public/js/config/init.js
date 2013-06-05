var httpGet = function(theUrl) {
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
};

geddy.io.addListenersForModels(['Message']);

var renderTemplate = function(message) {
  var template = [
    '<li id="message-' + message.id + '">',
      '<p class="body">' + message.body + '</p>',
      '<img class="avatar" src="/img/shared/default-user-avatar.png">',
      '<div class="info">',
        '<h2 class="name"></h2>',
        '<span class="time">' + geddy.date.relativeTime(new Date(message.createdAt)) + '</span>',
      '</div>',
    '</li>'].join('');
  return $(template);
};

var MessagesController = function (opts) {
  var self = this;
  this.options = opts || {};

  this.create = function (message) {
    $('.list').append(renderTemplate(message));
    RoomsShow.scroll();
  };

  this.update = function (message) {
    $('#message-' + message.id).replaceWith(renderTemplate(message));
    renderUser(message);
    renderAvatar(message);
    renderImage(message);
  };

  this.remove = function (id) {
    $('#message-' + id).remove();
  };
};

var renderUser = function(message) {
  var data = $.parseJSON(httpGet('http://' + location.host + '/' + message.userId + '.json'));
  $('#message-' + message.id).find('.name').text(data.user.name);

  var currentUser = $('.list').attr('data-currentUser');

  if (data.user.id == currentUser) {
    $('#message-' + message.id).addClass('self');
  } else {
    $('#message-' + message.id).addClass('other');
  }
};

var renderAvatar = function(message) {
  $('#message-' + message.id + ' .avatar').attr('src', '/img/shared/default-user-avatar.png');
};

var renderImage = function(message) {
  if (/^(jpg|jpeg|gif|png)$/.test(message.body.split('.').pop())) {
    $('#message-' + message.id).find('.body').html('<img src="' + message.body + '">');
  }
}

geddy.Messages = new MessagesController();

geddy.model.Message.on('save',   geddy.Messages.create);
geddy.model.Message.on('update', geddy.Messages.update);
geddy.model.Message.on('remove', geddy.Messages.remove);
