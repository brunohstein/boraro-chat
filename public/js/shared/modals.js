$(function() {
  $('[data-modal]').click(function() {
    var modal = $('#' + $(this).data('modal'));
    modal.fadeIn();
    return false;
  });

  $('.modal').click(function() {
    $(this).fadeOut();
    return false;
  });

  $('.modal .body').click(function() {
    return false;
  });

  $('.modal .close').click(function() {
    $(this).parents('.modal').fadeOut();
    return false;
  });
});