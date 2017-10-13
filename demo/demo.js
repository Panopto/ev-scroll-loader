(function($) {

    'use strict';

    var getLoader = function(max) {
        var count = 0;
        return function() {
            var $this = this;
            if (count === max) {
                $this.evScrollLoader('hideLoader');
                return $.Deferred().resolve();
            } else {
                ++count;
                return $.ajax({
                    url: 'demo.json',
                    dataType: 'json',
                    success: function(data, status, xhr) {
                        $.each(data.data, function(index, item) {
                            var $wrappedItem = $('<div class="item">' + item + '</div>');
                            $this.append($wrappedItem);
                            $wrappedItem.click(function() {
                                $this.evScrollLoader('scrollTo', $wrappedItem.offset().top);
                            });
                        });
                    }
                });
            }
        };
    };

    $(document).ready(function() {
        var $content = $('.content'),
            $contentWrap = $('.contentWrap'),
            resize = function() {
                $contentWrap.height($(window).height() * 0.8);
            };
        $(window).resize(resize);
        var heights = ['80%', 400, 800];
        $content.each(function(index, element) {
            var loader = getLoader(10);
            loader.apply($(element)).then(function() {
                $(element).evScrollLoader({
                    height: heights[index],
                    onScrolled: loader
                });
                resize();
            });
        });
    });

}(jQuery));
