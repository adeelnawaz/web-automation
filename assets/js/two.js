(function ($) {
  $('span.two').hover(function () {
    $(this).animate({'letter-spacing': '+=5'}, 500);
  }, function () {
    $(this).animate({'letter-spacing': '-=5'}, 500);
  });
}(jQuery));

