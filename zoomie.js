//  Zoomie.js 1.1
//  (c) 2012 Eugen Rochko
//  Zoomie.js may be freely distributed under the MIT license.

$(function () {
  'use strict';

  var zwin = $('.zoomie-window'),
    zcon = $('.zoomie'),
    zimg = new Image();

  zimg.src = zcon.data('full-src');

  $(zimg).on('load', function () {
    if (zcon.innerWidth() >= zimg.width || zcon.innerHeight() >= zimg.height) {
      // If the original image is smaller than or equal to the viewport image,
      // then this tool is meaningless so we exit
      return;
    }

    var ratio_x = zcon.innerWidth()  / zimg.width,
      ratio_y = zcon.innerHeight() / zimg.height;

    zwin.css('background-image', 'url(' + zcon.data('full-src') + ')');

    zcon.on('mouseenter', function () {
      zwin.show();
    });

    zcon.on('mousemove', function (e) {
      var offset = zcon.offset(),
        x = e.pageX - offset.left,
        y = e.pageY - offset.top;

      zwin.css({
        'top':  y - 100,
        'left': x - 100,
        'background-position': ((((x - zcon.innerWidth()) / ratio_x) * -1) - zimg.width + 100) + 'px ' + ((((y - zcon.innerHeight()) / ratio_y) * -1) - zimg.height + 100) + 'px'
      });

      if (e.pageX < offset.left || e.pageY < offset.top || x > zcon.innerWidth() || y > zcon.innerHeight()) {
        // Hide the tool if the mouse is outside of the viewport image coordinates. Can't use the
        // onmouseleave event because the mouse would always stay in the tool and therefore in
        // the viewport and the event would never trigger
        zwin.hide();
      }
    });
  });
});
