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
