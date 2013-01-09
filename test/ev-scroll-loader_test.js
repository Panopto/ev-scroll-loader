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

  module('jQuery#evScrollLoader', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 3, function() {
    var $evScrollLoaders = this.elems.evScrollLoader();
    strictEqual($evScrollLoaders, this.elems, 'should be chainable');
    strictEqual($evScrollLoaders.evScrollLoader('hideLoader'), this.elems, 'should be chainable');
    strictEqual($evScrollLoaders.evScrollLoader('showLoader'), this.elems, 'should be chainable');
  });

  test('check structure', 3, function() {
    var $evScrollLoaders = this.elems.evScrollLoader();
    ok($evScrollLoaders.hasClass('scroll-content'), 'element should have "scroll-content" class');
    ok($evScrollLoaders.parent().hasClass('scrollWrap'), 'element should be wrapped by "scrollWrap" element');
    ok($evScrollLoaders.next().is('div.loader'), 'element should be followed by "loader"');
  });

  test('check position', 1, function() {
    strictEqual(this.elems.evScrollLoader().closest('.scrollWrap').css('position'), 'relative', 'expected "relative" position');
  });

  test('check scroll', 1, function() {
    strictEqual(this.elems.evScrollLoader().closest('.scrollWrap').css('overflow-y'), 'scroll', 'expected vertical scrolling');
  });

  test('check height', 3, function() {
    var evScrollLoaders = [];
    var heights = [200, 600];
    var elems = this.elems;
    elems.each(function(index, element) {
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
    strictEqual(Math.floor($first.closest('.scrollWrap').height()), heights[0] - 10, '');
    var $second = evScrollLoaders[1];
    // Expecting requested height to be greater than scrollHeight so scrollHeight should be used
    strictEqual(Math.floor($second.closest('.scrollWrap').height()), $second[0].scrollHeight - 10, '');
    var $third = evScrollLoaders[2];
    // Expecting scrollHeight to be used since requested height should be 'undefined'
    strictEqual(Math.floor($third.closest('.scrollWrap').height()), $third[0].scrollHeight - 10, '');  });

  test('check hide/show', 3, function() {
    var $evScrollLoaders = this.elems.evScrollLoader();
    // Make sure we don't start out hidden
    ok($evScrollLoaders.is(':visible'), 'expected evScrollLoaders to be visible');
    ok($evScrollLoaders.evScrollLoader('hideLoader').not(':visible'), 'expected evScrollLoaders to be hidden');
    ok($evScrollLoaders.evScrollLoader('showLoader').is(':visible'), 'expected evScrollLoaders to be visible');
  });

  test('check scroll loading', 3, function() {
    var $evScrollLoaders = this.elems.evScrollLoader({
      callback: function() {
        ok(true, 'expected callback to be called');
      }
    });
    $evScrollLoaders.each(function() {
      var $loader = $(this);
      var $wrap = $loader.closest('.scrollWrap');
      $wrap.scrollTop($wrap[0].scrollHeight);
      $loader.trigger('scroll');
    });
  });

}(jQuery));
