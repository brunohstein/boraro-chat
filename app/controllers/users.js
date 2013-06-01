var passport = require('../helpers/passport'),
    cryptPass = passport.cryptPass,
    requireAuth = passport.requireAuth,
    helpers = require('../helpers/application');

var Users = function () {
  this.before(requireAuth, {
    except: ['add', 'create', 'show']
  });

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    helpers.currentUser(this.session);
    var self = this;

    geddy.model.User.all(function(err, users) {
      self.respond({params: params, users: users});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this,
        user = geddy.model.User.create(params);

    geddy.model.User.first({username: user.username}, function(err, data) {
      if (data) {
        params.errors = {
          username: 'This username is already in use.'
        };
        self.transfer('add');
      } else {
        if (user.isValid()) {
          user.password = cryptPass(user.password);
        }
        user.save(function(err, data) {
          if (err) {
            params.errors = err;
            self.transfer('add');
          } else {
            self.redirect({controller: 'main', action: 'login'});
          }
        });
      }
    });
  };

  this.show = function (req, resp, params) {
    helpers.currentUser(this.session);
    var self = this;

    geddy.model.User.first({username: params.user}, function(err, user) {
      if (!user) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        user.password = '';
        user.getRooms(function (err, rooms) {
          self.respond({params: params, user: user, rooms: rooms});
        });
      }
    });
  };

  this.edit = function (req, resp, params) {
    helpers.currentUser(this.session);
    var self = this;

    geddy.model.User.first({username: params.user}, function(err, user) {
      if (!user) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, user: user});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.User.first({username: params.user}, function(err, user) {
      var skip = params.password ? [] : ['password'];

      user.updateAttributes(params, {skip: skip});

      if (params.password && user.isValid()) {
        user.password = cryptPass(user.password);
      }

      user.save(function(err, data) {
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

    geddy.model.User.remove({username: params.user}, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Users = Users;
