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
      '<p>' + message.body + '</p>',
      '<i>' + geddy.date.relativeTime(new Date(message.createdAt)) + '</i>',
    '</li>'].join('');
  return $(template);
};

var MessagesController = function (opts) {
  var self = this;
  this.options = opts || {};

  this.create = function (message) {
    $('.list').append(renderTemplate(message));
  };

  this.update = function (message) {
    $('#message-' + message.id).replaceWith(renderTemplate(message));
    renderUser(message);
  };

  this.remove = function (id) {
    $('#message-' + id).remove();
  };
};

var renderUser = function(message) {
  var data = $.parseJSON(httpGet('http://' + location.host + '/' + message.userId + '.json'));
  $('#message-' + message.id).append(' <b>' + data.user.name + '</b>');
};

geddy.Messages = new MessagesController();

geddy.model.Message.on('save',   geddy.Messages.create);
geddy.model.Message.on('update', geddy.Messages.update);
geddy.model.Message.on('remove', geddy.Messages.remove);
