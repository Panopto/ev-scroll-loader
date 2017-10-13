(function($) {

    var q = QUnit;

    q.module('jQuery#evScrollLoader', {
        setup: function() {
            this.$elems = $('#qunit-fixture').children();
        }
    });

    q.test('is chainable', 4, function() {
        var $evScrollLoaders = this.$elems.evScrollLoader();
        q.strictEqual($evScrollLoaders, this.$elems, 'should be chainable');
        q.strictEqual($evScrollLoaders.evScrollLoader('hideLoader'), this.$elems, 'should be chainable');
        q.strictEqual($evScrollLoaders.evScrollLoader('showLoader'), this.$elems, 'should be chainable');
        q.strictEqual($evScrollLoaders.evScrollLoader('scrollTo'), this.$elems, 'should be chainable');
    });

    q.test('check structure', 3, function() {
        var $evScrollLoaders = this.$elems.evScrollLoader();
        q.ok($evScrollLoaders.hasClass('scroll-content'), 'element should have "scroll-content" class');
        q.ok($evScrollLoaders.parent().hasClass('scrollWrap'), 'element should be wrapped by "scrollWrap" element');
        q.ok($evScrollLoaders.next().is('div.loader'), 'element should be followed by "loader"');
    });

    q.test('check position', 1, function() {
        q.strictEqual(this.$elems.evScrollLoader().closest('.scrollWrap').css('position'), 'relative', 'expected "relative" position');
    });

    q.test('check scroll', 1, function() {
        q.strictEqual(this.$elems.evScrollLoader().closest('.scrollWrap').css('overflow-y'), 'scroll', 'expected vertical scrolling');
    });

    q.test('check height', 3, function() {
        var evScrollLoaders = [],
            heights = [200, 600];
        this.$elems.each(function(index, element) {
            // Initialize element with some content to test height handling
            for (var i = 0; i < 10; i++) {
                $(element).append('<div style="height:40px;">test</div>');
            }
            evScrollLoaders[index] = $(element).evScrollLoader({
                height: heights[index]
            });
        });
        var $first = evScrollLoaders[0];
        // Expecting requested height to be less than scrollHeight
        q.strictEqual(Math.floor($first.closest('.scrollWrap').height()), heights[0], '');
        var $second = evScrollLoaders[1];
        // Expecting requested height to be greater than scrollHeight so scrollHeight should be used
        q.strictEqual(Math.floor($second.closest('.scrollWrap').height()), $second[0].scrollHeight, '');
        var $third = evScrollLoaders[2];
        // Expecting scrollHeight to be used since requested height should be 'undefined'
        q.strictEqual(Math.floor($third.closest('.scrollWrap').height()), $third[0].scrollHeight, '');
    });

    q.test('check hide/show', 3, function() {
        var $evScrollLoaders = this.$elems.evScrollLoader();
        // Make sure we don't start out hidden
        q.ok($evScrollLoaders.is(':visible'), 'expected evScrollLoaders to be visible');
        q.ok($evScrollLoaders.evScrollLoader('hideLoader').not(':visible'), 'expected evScrollLoaders to be hidden');
        q.ok($evScrollLoaders.evScrollLoader('showLoader').is(':visible'), 'expected evScrollLoaders to be visible');
    });

    q.asyncTest('check scroll loading', 3, function() {
        q.stop(2);
        var $evScrollLoaders = this.$elems.evScrollLoader({
            onScrolled: function() {
                q.ok(true, 'expected onScrolled to be called');
                q.start(1);
            }
        });
        $evScrollLoaders.each(function() {
            var $loader = $(this);
            var $wrap = $loader.closest('.scrollWrap');
            $wrap.scrollTop($wrap[0].scrollHeight);
        });
    });

    q.test('check scrollTo', 2, function() {
        var $el = this.$elems.first(),
            items = [],
            $loader,
            $wrap;
        // Initialize element with some content
        for (var i = 0; i < 10; i++) {
            items[i] = $('<div style="height:40px;">test</div>');
            $el.append(items[i]);
        }
        $loader = $el.evScrollLoader({
            height: '80'
        });
        $wrap = $loader.closest('.scrollWrap');
        q.notEqual(items[3].offset().top, $wrap.offset().top);
        $loader.evScrollLoader('scrollTo', items[3].offset().top);
        q.equal(items[3].offset().top, $wrap.offset().top);
    });

}(jQuery));
