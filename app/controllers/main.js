var strategies = require('../helpers/passport/strategies'),
    authTypes = geddy.mixin(strategies, {local: {name: 'local account'}}),
    helpers = require('../helpers/application');;

var Main = function () {

  this.index = function (req, resp, params) {
    helpers.currentUser(this.session);
    var self = this;

    geddy.model.User.first({id: this.session.get('userId')}, function (err, user) {
      if (user) {
        self.redirect({controller: 'users', action: 'show', user: user.username});
      } else {
        self.respond(params, {
          format: 'html',
          template: 'app/views/main/index'
        });
      };
    });
  };

  this.login = function (req, resp, params) {
    this.respond(params, {
      format: 'html',
      template: 'app/views/main/login'
    });
  };

  this.logout = function (req, resp, params) {
    this.session.unset('userId');
    this.session.unset('authType');
    this.respond(params, {
      format: 'html',
      template: 'app/views/main/logout'
    });
  };

  this.ui = function (req, resp, params) {
    this.respond(params, {
      format: 'html',
      template: 'app/views/main/ui'
    });
  }

};

exports.Main = Main;
