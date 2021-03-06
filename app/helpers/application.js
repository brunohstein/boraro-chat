module.exports = {
  slugify: function(str) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return str;
  },

  currentUser: function(session) {
    geddy.model.User.first({id: session.get('userId')}, function (err, user) {
      if (user) {
        geddy.currentUser = user;
      }
    });
  },

  isId: function(str) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);
  },

  isImage: function(str) {
    return /^(jpg|jpeg|gif|png)$/.test(str.split('.').pop());
  }
}
