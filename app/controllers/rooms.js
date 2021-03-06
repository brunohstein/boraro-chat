var passport =    require('../helpers/passport'),
    cryptPass =   passport.cryptPass,
    requireAuth = passport.requireAuth,
    formidable  = require('formidable'),
    fs =          require('fs'),
    http =        require('http'),
    path =        require('path'),
    helpers =     require('../helpers/application');

var Rooms = function () {
  this.before(requireAuth);

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    helpers.currentUser(this.session);
    var self = this;

    geddy.model.Room.all(function(err, rooms) {
      self.respond({params: params, rooms: rooms});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this,
        room = geddy.model.Room.create(params);

    room.slug = helpers.slugify(room.title);

    geddy.model.Room.first({slug: room.slug}, function(err, data) {

      if (room.avatar == '') {
        room.avatar = '/img/shared/default-room-avatar.png';
      }

      if (data) {
        params.errors = {
          slug: 'This room has already been created.'
        };
        self.transfer('add');
      } else {
        room.save(function(err, data) {
          if (err) {
            params.errors = err;
            self.transfer('add');
          } else {
            geddy.model.User.first({id: self.session.get('userId')}, function (err, user) {
              user.addRoom(room);
              
              user.save(function(err, data) {
                self.redirect('/' + user.username);
              });
            });
          }
        });
      }
    });    

  };

  // this.create = function (req, resp, params) {
  //   var self = this,
  //       form = new formidable.IncomingForm(),
  //       room,
  //       uploadedFile,
  //       savedFile;

  //   form.onPart = function (part) {
  //     if (!part.filename) {
  //       form.handlePart(part);
  //     }

  //     uploadedFile = encodeURIComponent(part.filename);
  //     savedFile = fs.createWriteStream(path.join('public', 'uploads', 'rooms', uploadedFile));

  //     part.addListener('data', function(data) {
  //       savedFile.write(data);
  //     });

  //     part.addListener('end', function () {
  //       var err;

  //       if (uploadedFile) {
  //         savedFile.end();
  //       } else {
  //         err = new Error('Something went wrong in the upload.');
  //         self.error(err);
  //       }
  //     });
  //   };

  //   form.parse(req, function(err, fields) {
  //     room = geddy.model.Room.create(fields);
  //     room.avatar = '/uploads/rooms/' + uploadedFile;
  //     room.slug = helpers.slugify(room.title);

  //     geddy.model.Room.first({slug: room.slug}, function(err, data) {
  //       if (data) {
  //         params.errors = {
  //           slug: 'This room has already been created.'
  //         };
  //         self.transfer('add');
  //       } else {
  //         room.save(function(err, data) {
  //           if (err) {
  //             params.errors = err;
  //             self.transfer('add');
  //           } else {
  //             geddy.model.User.first({id: self.session.get('userId')}, function (err, user) {
  //               user.addRoom(room);
                
  //               user.save(function(err, data) {
  //                 self.redirect('/' + user.username);
  //               });
  //             });
  //           }
  //         });
  //       }
  //     });
  //   });
  // };

  this.show = function (req, resp, params) {
    helpers.currentUser(this.session);
    var self = this;

    geddy.model.Room.first({slug: params.room}, function(err, room) {
      if (!room) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        geddy.model.Message.all({roomId: room.id}, {sort: 'createdAt'}, function(err, data) {
          var messages = [];

          if (data.length > 0) {
            data.forEach(function(message) {
              message.getUser(function(err, user) {
                message['user'] = user;
                messages.push(message);

                if (messages.length == data.length) {
                  self.respond({params: params, room: room, messages: messages});
                }
              });
            });
          } else {
            self.respond({params: params, room: room, messages: messages});
          }
        });
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Room.first({slug: params.room}, function(err, room) {
      if (!room) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, room: room});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Room.first({slug: params.room}, function(err, room) {
      room.updateAttributes(params);

      room.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.transfer('show');
        }
      });
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Room.remove({slug: params.room}, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Rooms = Rooms;
