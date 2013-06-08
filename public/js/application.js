$.getScript('/js/core/core.js', function() {
  $.getScript('/js/core/models.js');
});

$(function() {
  $.getScript('/js/shared/httpget.js');
  $.getScript('/js/shared/modals.js');

  var controller = $('body').data('controller'),
      action     = $('body').data('action');

  $.getScript('/js/sections/' + controller + '/' + action + '.js');
});