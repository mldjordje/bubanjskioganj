/*--------------Gallery Popup------------------*/
"use strict";
      (function ($) {
        var container = [];
        $("#gallery")
        .find(".gallery-item")
        .each(function () {
          var $link = $(this).find(".gallery-popup"),
          item = {
            src: $link.attr("href"),
            w: $link.data("width"),
            h: $link.data("height"),
            title: $link.data("caption")
          };
          container.push(item);
        });
        $(".gallery-popup").click(function (event) {
          event.preventDefault();
          var $pswp = $(".pswp")[0],
          options = {
            index: $(this).parent(".gallery-item").index(),
            bgOpacity: 0.85,
            showHideOpacity: true
          };
          var gallery = new PhotoSwipe(
            $pswp,
            PhotoSwipeUI_Default,
            container,
            options
            );
          gallery.init();
        });
      })(jQuery);