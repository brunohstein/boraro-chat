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
