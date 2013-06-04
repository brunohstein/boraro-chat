/* Realtime */

$.getScript('/js/core/core.js', function() {
  $.getScript('/js/core/models.js', function() {
    $.getScript('/js/config/init.js');
  });
});

/* Shared */

$.getScript('/js/shared/modals.js');

/* Section */

$(function() {
  var controller = $('body').data('controller'),
      action     = $('body').data('action');

  $.getScript('/js/sections/' + controller + '/' + action + '.js');
});
