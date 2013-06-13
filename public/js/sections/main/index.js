var MainIndex = {

  ui: {
    username: $('#username', $('.main.index')),
    umirror:  $('#username-mirror', $('.main.index')),
    password: $('#password', $('.main.index')),
    pmirror:  $('#password-mirror', $('.main.index'))
  },

  init: function() {
    MainIndex.bind();
  },

  bind: function() {
    MainIndex.ui.username.keyup(function(e) {
      MainIndex.ui.umirror.val(MainIndex.ui.username.val());
    });

    MainIndex.ui.password.keyup(function(e) {
      MainIndex.ui.pmirror.val(MainIndex.ui.password.val());
    });
  }

};

$(function() {
  MainIndex.init();
});
