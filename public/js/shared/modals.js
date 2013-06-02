$(function() {
  $('[data-modal]').click(function() {
    var modal = $($(this).data('modal'));
    modal.fadeIn();
  });

  $('.modal').click(function() {
    $(this).fadeOut();
  });

  $('.modal .body').click(function() {
    return false;
  });

  $('.modal .close').click(function() {
    $(this).parents('.modal').fadeOut();
  });
});