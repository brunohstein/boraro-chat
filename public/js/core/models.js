(function () {
var Message = function () {
  this.defineProperties({
    body: {type: 'text', required: true}
  });

  this.belongsTo('User');
  this.belongsTo('Room');
};

User = geddy.model.register('Message', Message);
}());

(function () {
var Passport = function () {
  this.defineProperties({
    authType: {type: 'string'},
    key: {type: 'string'}
  });

  this.belongsTo('User');
};

Passport = geddy.model.register('Passport', Passport);
}());

(function () {
var Room = function () {
  this.defineProperties({
    title:  {type: 'string', required: true},
    slug:   {type: 'string'},
    avatar: {type: 'string'}
  });

  this.hasMany('Users');
  this.hasMany('Messages');
};

User = geddy.model.register('Room', Room);
}());

(function () {
var User = function () {
  this.defineProperties({
    username: {type: 'string', required: true},
    password: {type: 'string', required: true},
    name:     {type: 'string', required: true},
    email:    {type: 'string', required: true},
    avatar:   {type: 'string'}
  });

  this.validatesLength('username', {min: 3});
  this.validatesLength('password', {min: 6});
  this.validatesConfirmed('password', 'confirmPassword');

  this.hasMany('Passports');
  this.hasMany('Rooms');
  this.hasMany('Messages');
};

User = geddy.model.register('User', User);
}());