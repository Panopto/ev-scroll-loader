(function($) {

    'use strict';

    var loader = function() {
        var $this = $(this);
        return $.ajax({
            url: 'demo.json',
            dataType: 'json',
            success: function(data, status, xhr) {
                $.each(data.data, function(index, item) {
                    $this.append('<div class="item">' + item + '</div>');
                });
            }
        });
    };

    $(document).ready(function() {
        var $content = $('.content');
        loader.apply($content[0]).then(function() {
            $(window).resize(function() {
                $('.contentWrap').height($(this).height() * 0.8);
                $content.trigger('evScrollLoader.resize');
            });
            $(window).trigger('resize');
            $content.evScrollLoader({
                callback: loader
            });
        });
    });

}(jQuery));
