//  jQuery Zoomie 1.2
//  (c) 2012 Eugen Rochko
//  jQuery Zoomie may be freely distributed under the MIT license.

(function ($, window, document) {
  'use strict';

  var defaults = {
    radius: 100
  };

  var Zoomie = function (element, options) {
    this.element = element;
    this.options = $.extend(defaults, options);
    this.init();
  };

  Zoomie.prototype.init = function () {
    var self = this,
      fullSrc = this.element.data('full-src'),
      resizeTimer = undefined;
    if(!fullSrc) {
      fullSrc = this.element[0].src;
    }

    this.containerElement = $('<div>').addClass('zoomie').insertAfter(this.element);
    this.element.detach().appendTo(this.containerElement);

    this.windowElement = $('<div>').addClass('zoomie-window').css({
      'background-image': 'url(' + fullSrc + ')',
      'width': self.options.radius * 2,
      'height': self.options.radius * 2
    }).appendTo(this.containerElement);
    
    this.fullImage        = new Image();
    this.fullImage.src    = fullSrc;

    $(this.fullImage).on('load', function () {
      self.ratioX = self.containerElement.innerWidth() / self.fullImage.width;
      self.ratioY = self.containerElement.innerHeight() / self.fullImage.height;

      self.containerElement.on('mouseenter', function () {
        self.windowElement.show();
      });

      self.containerElement.on('mousemove', function (e) {
        var offset = self.containerElement.offset(),
          x        = e.pageX - offset.left,
          y        = e.pageY - offset.top,
          windowX  = x - self.options.radius,
          windowY  = y - self.options.radius,
          imageX   = (((x - self.containerElement.innerWidth()) / self.ratioX) * -1) - self.fullImage.width + self.options.radius,
          imageY   = (((y - self.containerElement.innerHeight()) / self.ratioY) * -1) - self.fullImage.height + self.options.radius;

        self.windowElement.css({
          'top':  windowY,
          'left': windowX,
          'background-position': imageX + 'px ' + imageY + 'px'
        });

        if (e.pageX < offset.left || e.pageY < offset.top || x > self.containerElement.innerWidth() || y > self.containerElement.innerHeight()) {
          // Hide the tool if the mouse is outside of the viewport image coordinates. Can't use the
          // onmouseleave event because the mouse would always stay in the tool and therefore in
          // the viewport and the event would never trigger
          self.windowElement.hide();
        }
      });

      $(window).on('resize', function () {
        // If the window is resized it is possible that the viewport image changed size
        // so we better calculate the ratios anew
        if (typeof resizeTimer === "undefined") {
          // We bubble the resize callback because we don't need it firing every millisecond
          resizeTimer = setTimeout(function () {
            resizeTimer = undefined;
            self.ratioX = self.containerElement.innerWidth() / self.fullImage.width;
            self.ratioY = self.containerElement.innerHeight() / self.fullImage.height;
          }, 200);
        }
      });
    });
  };

  $.fn.zoomie = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_zoomie')) {
        $.data(this, 'plugin_zoomie', new Zoomie($(this), options));
      }
    });
  };
}(jQuery, window, document));
