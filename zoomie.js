/**
 * Made by Eugen Rochko <eugen@zeonfederated.com>
 * for A&C (artistsnclients.com)
 */

$(function() {
  'use strict';

  var zwin = $('.zoomie-window');
  var zcon = $('.zoomie');
  var zimg = new Image();

  zimg.src = zcon.data('full-src');

  $(zimg).on('load', function () {
    if (zcon.innerWidth() >= zimg.width || zcon.innerHeight() >= zimg.height) {
      return;
    }

    var ratio_x = zcon.innerWidth()  / zimg.width;
    var ratio_y = zcon.innerHeight() / zimg.height;

    zwin.css('background-image', 'url(' + zcon.data('full-src') + ')');

    zcon.on('mouseenter', function () {
      zwin.show();
    });

    zcon.on('mousemove', function (e) {
      var offset = zcon.offset();
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;

      zwin.css({
        'top':  y - 100,
        'left': x - 100,
        'background-position': ((((x - zcon.innerWidth()) / ratio_x) * -1) - zimg.width + 100) + 'px ' + ((((y - zcon.innerHeight()) / ratio_y) * -1) - zimg.height + 100) + 'px'
      });

      if (e.pageX < offset.left || e.pageY < offset.top || x > zcon.innerWidth() || y > zcon.innerHeight()) {
        zwin.hide();
      }
    });
  });
});