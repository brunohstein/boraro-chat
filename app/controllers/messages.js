var passport = require('../helpers/passport'),
    cryptPass = passport.cryptPass,
    requireAuth = passport.requireAuth;

var Messages = function () {
  this.before(requireAuth);

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.create = function (req, resp, params) {
    var self = this,
        message = geddy.model.Message.create(params);

    message.save(function(err, data) {
      if (err) {
        params.errors = err;
        self.transfer('add');
      } else {
        geddy.model.User.first({id: self.session.get('userId')}, function (err, user) {
          user.addMessage(message);

          user.save(function(err, data) {
            geddy.model.Room.first({slug: params.room}, function (err, room) {
              room.addMessage(message);

              room.save();
            });
          });
        });
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Message.first(params.id, function(err, message) {
      message.updateAttributes(params);

      message.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };

};

exports.Messages = Messages;
