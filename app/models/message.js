var Message = function () {
  this.defineProperties({
    body: {type: 'text', required: true}
  });

  this.belongsTo('User');
  this.belongsTo('Room');
};

User = geddy.model.register('Message', Message);
