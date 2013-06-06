var passport =    require('../helpers/passport'),
    cryptPass =   passport.cryptPass,
    requireAuth = passport.requireAuth,
    formidable =  require('formidable'),
    fs =          require('fs'),
    http =        require('http'),
    path =        require('path'),
    crypto =      require('crypto'),
    helpers =     require('../helpers/application');

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
        form = new formidable.IncomingForm(),
        user,
        uploadedFile,
        savedFile;

    // form.onPart = function (part) {
    //   if (!part.filename) {
    //     form.handlePart(part);
    //   }

    //   uploadedFile = encodeURIComponent(part.filename);
    //   savedFile = fs.createWriteStream(path.join('public', 'uploads', 'users', uploadedFile));

    //   part.addListener('data', function(data) {
    //     savedFile.write(data);
    //   });

    //   part.addListener('end', function () {
    //     var err;

    //     if (uploadedFile) {
    //       savedFile.end();
    //     } else {
    //       err = new Error('Something went wrong in the upload.');
    //       self.error(err);
    //     }
    //   });
    // };

    form.parse(req, function(err, fields) {
      user = geddy.model.User.create(fields);
      var avatar = user.email;
      user.avatar = 'http://www.gravatar.com/avatar/' + crypto.createHash('md5').update(avatar).digest("hex");
      // user.avatar = '/uploads/users/' + uploadedFile;

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
        };
      });
    });
  };

  this.show = function (req, resp, params) {
    helpers.currentUser(this.session);
    var self = this;

    if (helpers.isId(params.user)) {
      geddy.model.User.first({id: params.user}, function(err, user) {
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
    } else {
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

      var avatar = user.email;
      user.avatar = 'http://www.gravatar.com/avatar/' + crypto.createHash('md5').update(avatar).digest("hex");;

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
