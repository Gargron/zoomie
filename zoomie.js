//  Zoomie.js 1.1
//  (c) 2012 Eugen Rochko
//  Zoomie.js may be freely distributed under the MIT license.

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
    var self = this;

    this.windowElement = $('<div>').addClass('zoomie-window').css({
      'background-image': this.element.data('full-src'),
      'width': self.options.radius * 2,
      'height': self.options.radius * 2
    });

    this.containerElement = $('<div>').addClass('zoomie');
    this.fullImage        = new Image();
    this.fullImage.src    = this.element.data('full-src');

    this.element.wrap(this.containerElement).after(this.windowElement);

    $(this.fullImage).on('load', function () {
      self.ratioX = self.containerElement.innerWidth() / self.fullImage.width;
      self.ratioY = self.containerElement.innerHeight() / self.fullImage.height;

      if (self.ratioX >= 1 || self.ratioY >= 1) {
        // If the original image is smaller than or equal to the viewport image,
        // then this tool is meaningless so we exit
        return;
      }

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
    });
  };

  $.fn.zoomie = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_zoomie')) {
        $.data(this, 'plugin_zoomie', new Zoomie(this, options));
      }
    });
  };
}(jQuery, window, document));
