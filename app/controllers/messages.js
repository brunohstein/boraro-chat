var passport = require('../helpers/passport'),
    cryptPass = passport.cryptPass,
    requireAuth = passport.requireAuth;

var Messages = function () {
  this.before(requireAuth);

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Message.all(function(err, messages) {
      self.respond({params: params, messages: messages});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

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
              room.save(function(err, data) {
                self.redirect({controller: 'rooms', action: 'show'});
              });
            });
          });
        });
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Message.first(params.id, function(err, message) {
      if (!message) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, message: message.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Message.first(params.id, function(err, message) {
      if (!message) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, message: message});
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

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Message.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Messages = Messages;
