var RoomsShow = {

  ui: {
    sidebar: $('.sidebar', $('.rooms.show')),
    avatar:  $('.sidebar .avatar', $('.rooms.show'))
  },

  init: function() {
    RoomsShow.adjustAvatar();
  },

  adjustAvatar: function() {
    $(window).load(function() {
      var width = RoomsShow.ui.avatar.width(),
          crop = RoomsShow.ui.sidebar.width();

      if (width > crop) {
        RoomsShow.ui.avatar.css({
          marginLeft: - ((width - crop) / 2)
        });
      }
    });
  }

};

$(function() {
  $.getScript('/js/sections/messages/index.js');
  $.getScript('/js/sections/messages/add.js');

  RoomsShow.init();
});
