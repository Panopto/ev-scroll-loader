/*global jQuery,document*/
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
        var heights = [400, 800, null];
        $content.each(function(index, element) {
            loader.apply(element).then(function() {
                $(element).evScrollLoader({
                    height: heights[index],
                    callback: loader
                });
            });
        });
    });

}(jQuery));
