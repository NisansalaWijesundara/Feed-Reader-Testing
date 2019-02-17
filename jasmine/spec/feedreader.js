/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty.
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/*  test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('URL defined', function() {
			for (feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
		});
		/*  test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('has a name defined', function() {
			for (feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});
	});
	/*Test suite 'The menu'*/
	describe('The menu', function() {
		/* test that ensures the menu element is
		 * hidden by default.
		 */
		it('is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toEqual(true);
		});
		/* test that ensures the menu changes
		 * visibility when the menu icon is clicked.
		 */
		it('toggles hide and show', function() {
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
	/*Test suite 'Initial Entries'*/
	describe('Initial Entries', function() {
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		/* test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */
		it('completes work', function() {
			expect($('.feed .entry').length).not.toBe(0);
		});
	});
	/*Test suite 'New Feed Selection'*/
	describe('New Feed Selection', function() {
		let firstFeed;
		let secondFeed;
		beforeEach(function(done) {
			/*load first feed*/
			loadFeed(0, function() {
				firstFeed = $('.feed').text();
				/*load second feed*/
				loadFeed(1, function() {
					secondFeed = $('.feed').text();
					done();
				});
			});
		});
		/* test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		it('loads new content', function() {
			expect(firstFeed).not.toEqual(secondFeed);
		});
	});
}());
