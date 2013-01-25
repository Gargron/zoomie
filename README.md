zoomie
======

A JavaScript jQuery plugin, a zoom-on-hover tool for images, like a magnifying glass.

[![Example](http://24.media.tumblr.com/tumblr_mb4rq4mu0B1qjafb1o1_500.png)](https://artistsnclients.com/slots/155)

### Dependencies

* jQuery

### Usage

    <link rel="stylesheet" type="text/css" href="/zoomie.css" />
    <script src="/jquery.js"></script>
    <script src="/zoomie.js"></script>

    <img id="test" src="/medium-image.png" data-full-src="/full-image.png" alt="A smaller image" />

    <script>
      $(function () {
        $('#test').zoomie();
      });
    </script>

### Generated mark-up

    <div class="zoomie">
      <img src="/medium-image.png" data-full-src="/full-image.png" alt="A smaller image" />
      <div class="zoomie-window"></div>
    </div>
