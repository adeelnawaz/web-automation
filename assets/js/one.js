(function ($) {
  $('span.one').hover(function () {
    $(this).animate({'background-color': '#ddd', 'border-radius': 10}, 500);
  }, function () {
    $(this).animate({'background-color': 'transparent', 'border-radius': 0}, 500);
  });
}(jQuery));
