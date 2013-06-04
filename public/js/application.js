$.getScript('/js/core/core.js', function() {
  $.getScript('/js/core/models.js', function() {
    $.getScript('/js/config/init.js');
  });
});

$.getScript('/js/shared/modals.js');

$(function() {
  var controller = $('body').data('controller'),
      action     = $('body').data('action');

  $.getScript('/js/sections/' + controller + '/' + action + '.js');
});
