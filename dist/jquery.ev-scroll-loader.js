/**
 * ev-scroll-loader 1.0.0 2016-02-22
 * Ensemble Video jQuery Scroll Loader Plugin
 * https://github.com/ensembleVideo/ev-scroll-loader
 * Copyright (c) 2016 Symphony Video, Inc.
 * Licensed (MIT AND GPL-2.0)
 */
(function(factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function($) {

    'use strict';

    var defaults = {
        callback: function() {}
    };

    var methods = {
        init: function(options) {
            var settings = $.extend({}, defaults, options);
            return this.each(function() {
                var $this = $(this),
                    $wrap = $this.wrap('<div class=\"scrollWrap\"/>').closest('.scrollWrap'),
                    scrollHeight,
                    parentHeight,
                    setHeight,
                    wrapHeight,
                    handleHeights = function() {
                        scrollHeight = $this[0].scrollHeight;
                        parentHeight = $wrap.parent().height();
                        // If a height was set, use that, otherwise height of parent, but always take scrollHeight if it's smaller
                        setHeight = settings.height || Math.min(scrollHeight, parentHeight);
                        wrapHeight = Math.min(setHeight, scrollHeight) - 10;
                        $wrap.css({
                            'position': 'relative',
                            'height': wrapHeight + 'px',
                            'overflow-y': 'scroll'
                        });
                    };
                $this.addClass('scroll-content');
                $wrap.append('<div class="loader"></div>');
                handleHeights();
                $wrap.scroll(function() {
                    // When we have scrolled to the bottom of our content, call the callback
                    if ($wrap.scrollTop() === $wrap[0].scrollHeight - wrapHeight) {
                        settings.callback.apply($this[0]);
                    }
                });
                // Custom event clients can call to force re-calculation of heights
                $this.on('evScrollLoader.resize', function() {
                    handleHeights();
                });
            });
        },
        showLoader: function() {
            var $wrap = $(this).closest('.scrollWrap');
            $('.loader', $wrap).show();
            return this;
        },
        hideLoader: function() {
            var $wrap = $(this).closest('.scrollWrap');
            $('.loader', $wrap).hide();
            return this;
        }
    };

    $.fn.evScrollLoader = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
    };

});
