/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#scrollLoader', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 3, function() {
    var $scrollLoaders = this.elems.scrollLoader();
    strictEqual($scrollLoaders, this.elems, 'should be chainable');
    strictEqual($scrollLoaders.scrollLoader('hideLoader'), this.elems, 'should be chainable');
    strictEqual($scrollLoaders.scrollLoader('showLoader'), this.elems, 'should be chainable');
  });

  test('check structure', 3, function() {
    var $scrollLoaders = this.elems.scrollLoader();
    ok($scrollLoaders.hasClass('scroll-content'), 'element should have "scroll-content" class');
    ok($scrollLoaders.parent().hasClass('scrollWrap'), 'element should be wrapped by "scrollWrap" element');
    ok($scrollLoaders.next().is('div.loader'), 'element should be followed by "loader"');
  });

  test('check position', 1, function() {
    strictEqual(this.elems.scrollLoader().closest('.scrollWrap').css('position'), 'relative', 'expected "relative" position');
  });

  test('check scroll', 1, function() {
    strictEqual(this.elems.scrollLoader().closest('.scrollWrap').css('overflow-y'), 'scroll', 'expected vertical scrolling');
  });

  test('check height', 3, function() {
    var scrollLoaders = [];
    var heights = [200, 600];
    var elems = this.elems;
    elems.each(function(index, element) {
      // Initialize element with some content to test height handling
      for (var i = 0; i < 10; i++) {
        $(element).append('<div style="height:40px;">test</div>');
      }
      scrollLoaders[index] = $(element).scrollLoader({
        height: heights[index]
      });
    });
    var $first = scrollLoaders[0];
    // Expecting requested height to be less than scrollHeight
    strictEqual(Math.floor($first.closest('.scrollWrap').height()), heights[0] - 10, '');
    var $second = scrollLoaders[1];
    // Expecting requested height to be greater than scrollHeight so scrollHeight should be used
    strictEqual(Math.floor($second.closest('.scrollWrap').height()), $second[0].scrollHeight - 10, '');
    var $third = scrollLoaders[2];
    // Expecting scrollHeight to be used since requested height should be 'undefined'
    strictEqual(Math.floor($third.closest('.scrollWrap').height()), $third[0].scrollHeight - 10, '');  });

  test('check hide/show', 3, function() {
    var $scrollLoaders = this.elems.scrollLoader();
    // Make sure we don't start out hidden
    ok($scrollLoaders.is(':visible'), 'expected scrollLoaders to be visible');
    ok($scrollLoaders.scrollLoader('hideLoader').not(':visible'), 'expected scrollLoaders to be hidden');
    ok($scrollLoaders.scrollLoader('showLoader').is(':visible'), 'expected scrollLoaders to be visible');
  });

  test('check scroll loading', 3, function() {
    var $scrollLoaders = this.elems.scrollLoader({
      callback: function() {
        ok(true, 'expected callback to be called');
      }
    });
    $scrollLoaders.each(function() {
      var $loader = $(this);
      var $wrap = $loader.closest('.scrollWrap');
      $wrap.scrollTop($wrap[0].scrollHeight);
      $loader.trigger('scroll');
    });
  });

}(jQuery));
