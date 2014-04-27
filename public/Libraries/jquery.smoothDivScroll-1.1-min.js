/*
 * jQuery SmoothDivScroll 1.1
 *
 * Copyright (c) 2010 Thomas Kahn
 * Licensed under the GPL license.
 *
 * http://www.maaki.com/thomas/SmoothDivScroll/
 *
 * Depends:
 * jquery.ui.widget.js
 *
 */
(function($) {

	$.widget("thomaskahn.smoothDivScroll", {
		// Default options
		options: {
			scrollableArea: "div.scrollableArea",
			scrollWrapper: "div.scrollWrapper",
			hiddenOnStart: false,
			ajaxContentURL: "",
			countOnlyClass: "",
			scrollStep: 15,
			scrollInterval: 10,
			mouseDownSpeedBooster: 3,
			autoScroll: "",
			autoScrollDirection: "right",
			autoScrollStep: 5,
			autoScrollInterval: 10,
			startAtElementId: ""
		},
		_create: function() {

			// Set variables
			var self = this, o = this.options, el = this.element;

			el.data("scrollWrapper", el.find(o.scrollWrapper));
			el.data("scrollableArea", el.find(o.scrollableArea));
			el.data("speedBooster", 1);
			el.data("motherElementOffset", el.offset().left);
			el.data("scrollXPos", 0);
			el.data("scrollableAreaWidth", 0);
			el.data("startingPosition", 0);
			el.data("rightScrollInterval", null);
			el.data("leftScrollInterval", null);
			el.data("autoScrollInterval", null);
			el.data("previousScrollLeft", 0);
			el.data("pingPongDirection", "right");
			el.data("getNextElementWidth", true);
			el.data("swapAt", null);
			el.data("startAtElementHasNotPassed", true);
			el.data("swappedElement", null);
			el.data("originalElements", el.data("scrollableArea").children(o.countOnlyClass));
			el.data("visible", true);
			el.data("initialAjaxContentLoaded", false);
			el.data("enabled", true);
			
			// mouseup anywhere (stop boosting the scrolling speed)
			$("body").bind("mouseup", function() {
				el.data("speedBooster", 1);
			});

			/*****************************************
			SET UP EVENT FOR RESIZING THE BROWSER WINDOW
			*****************************************/
			$(window).bind("resize", function() {
				self._trigger("windowResized");
			});

			/*****************************************
			FETCHING AJAX CONTENT ON INITIALIZATION
			*****************************************/
			// If there's an ajaxContentURL in the options, 
			// fetch the content
			if (o.ajaxContentURL.length > 0) {
				self.replaceContent(o.ajaxContentURL);
			}
			else {
				self.recalculateScrollableArea();
			}

			// Should it be hidden on start?
			if (o.hiddenOnStart) {
				self.hide();
			}

			/*****************************************
			AUTOSCROLLING
			*****************************************/
			// If the user has set the option autoScroll, the scollable area will
			// start scrolling automatically. If the content is fetched using AJAX
			// the autoscroll is not started here but in recalculateScrollableArea.
			// Otherwise recalculateScrollableArea won't have the time to calculate
			// the width of the scrollable area before the autoscrolling starts.
			if ((o.autoScroll.length > 0) && !(o.hiddenOnStart) && (o.ajaxContentURL.length <= 0)) {
				self.startAutoScroll();
			}

		},
		/**********************************************************
		Recalculate the scrollable area
		**********************************************************/
		recalculateScrollableArea: function() {

			var tempScrollableAreaWidth = 0, foundStartAtElement = false, o = this.options, el = this.element, self = this;

			// Add up the total width of all the items inside the scrollable area
			// and check to see if there's a specific element to start at
			el.data("scrollableArea").children(o.countOnlyClass).each(function() {
				// Check to see if the current element in the loop is the one where the scrolling should start
				if ((o.startAtElementId.length > 0) && (($(this).attr("id")) === o.startAtElementId)) {
					el.data("startingPosition", tempScrollableAreaWidth);
					foundStartAtElement = true;
				}
				var thisWidth = $(this).outerWidth();
				if(thisWidth>tempScrollableAreaWidth){
					tempScrollableAreaWidth = thisWidth;
				}
			});
		
			tempScrollableAreaWidth+=20;
			
			// If the element with the ID specified by startAtElementId
			// is not found, reset it
			if (!(foundStartAtElement)) {
				el.data("startAtElementId", "");
			}

			// Set the width of the scrollable area
			el.data("scrollableAreaWidth", tempScrollableAreaWidth);
			el.data("scrollableArea").width(el.data("scrollableAreaWidth"));

			// Move to the starting position
			el.data("scrollWrapper").scrollLeft(el.data("startingPosition"));
			el.data("scrollXPos", el.data("startingPosition"));

			// If the content of the scrollable area is fetched using AJAX
			// during initialization, it needs to be done here. After it has
			// been loaded a flag variable is set to indicate that the content
			// has been loaded already and shouldn
			if (!(el.data("initialAjaxContentLoaded"))) {
				if ((o.autoScroll.length > 0) && !(o.hiddenOnStart) && (o.ajaxContentURL.length > 0)) {
					self.startAutoScroll();
					el.data("initialAjaxContentLoaded", true);
				}
			}

		},
		/**********************************************************
		Stopping, starting and doing the autoscrolling
		**********************************************************/
		stopAutoScroll: function() {
			var self = this, el = this.element;

			clearInterval(el.data("autoScrollInterval"));
			el.data("autoScrollInterval", null);

			self._trigger("autoScrollStopped");

		},
		startAutoScroll: function() {
			var self = this, el = this.element, o = this.options;
			
			// Stop any running interval
			clearInterval(el.data("autoScrollInterval"));
			el.data("autoScrollInterval", null);

			// Callback
			self._trigger("autoScrollStarted");

			// Start interval
			el.data("autoScrollInterval", setInterval(function() {
				

				// If the scroller is not visible or
				// if the scrollable area is shorter than the scroll wrapper
				// any running autoscroll interval should stop.
				if (!(el.data("visible")) || (el.data("scrollableAreaWidth") <= (el.data("scrollWrapper").innerWidth()))) {
					// Stop any running interval
					clearInterval(el.data("autoScrollInterval"));
					el.data("autoScrollInterval", null);
				}
				else {
					// Store the old scrollLeft value to see if the scrolling has reached the end
					el.data("previousScrollLeft", el.data("scrollWrapper").scrollLeft());

					var delay = o.autoScrollInterval;

					switch (o.autoScrollDirection) {
						case "right":
							el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollStep);
							if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
								self._trigger("autoScrollRightLimitReached");
								clearInterval(el.data("autoScrollInterval"));
								el.data("autoScrollInterval", null);
								self._trigger("autoScrollIntervalStopped");
							}
							break;

						case "left":
							el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollStep);
							if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
								self._trigger("autoScrollLeftLimitReached");
								clearInterval(el.data("autoScrollInterval"));
								el.data("autoScrollInterval", null);
								self._trigger("autoScrollIntervalStopped");
							}
							break;

						case "backandforth":
							if (el.data("pingPongDirection") === "right") {
								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + (o.autoScrollStep));
							}
							else {
								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - (o.autoScrollStep));
							}

							// If the scrollLeft hasnt't changed it means that the scrolling has reached
							// the end and the direction should be switched
							if (el.data("previousScrollLeft") === el.data("scrollWrapper").scrollLeft()) {
								if (el.data("pingPongDirection") === "right") {
									el.data("pingPongDirection", "left");
									self._trigger("autoScrollRightLimitReached");
								}
								else {
									el.data("pingPongDirection", "right");
									self._trigger("autoScrollLeftLimitReached");
								}
							}
							break;

						case "endlessloopright":
							// Get the width of the first element. When it has scrolled out of view,
							// the element swapping should be executed. A true/false variable is used
							// as a flag variable so the swapAt value doesn't have to be recalculated
							// in each loop.

							if (el.data("getNextElementWidth")) {
								if ((o.startAtElementId.length > 0) && (el.data("startAtElementHasNotPassed"))) {
									el.data("swapAt", $("#" + o.startAtElementId).outerWidth(true));
									el.data("startAtElementHasNotPassed", false);
								}
								else {
									el.data("swapAt", el.data("scrollableArea").children(":first").outerWidth(true));
								}

								el.data("getNextElementWidth", false);
							}

							// Do the autoscrolling
							el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + o.autoScrollStep);

							// Check to see if the swap should be done
							if (el.data("swapAt") <= el.data("scrollWrapper").scrollLeft()) {
								el.data("swappedElement", el.data("scrollableArea").children(":first").detach());
								el.data("scrollableArea").append(el.data("swappedElement"));
								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - el.data("swappedElement").outerWidth(true));
								el.data("getNextElementWidth", true);
							}
							break;
						case "endlessloopleft":
							// Get the width of the first element. When it has scrolled out of view,
							// the element swapping should be executed. A true/false variable is used
							// as a flag variable so the swapAt value doesn't have to be recalculated
							// in each loop.

							if (el.data("getNextElementWidth")) {
								if ((o.startAtElementId.length > 0) && (el.data("startAtElementHasNotPassed"))) {
									el.data("swapAt", $("#" + o.startAtElementId).outerWidth(true));
									el.data("startAtElementHasNotPassed", false);
								}
								else {
									el.data("swapAt", el.data("scrollableArea").children(":first").outerWidth(true));
								}

								el.data("getNextElementWidth", false);
							}

							// Do the autoscrolling
							el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() - o.autoScrollStep);

							// Check to see if the swap should be done
							if (el.data("scrollWrapper").scrollLeft() === 0) {
								el.data("swappedElement", el.data("scrollableArea").children(":last").detach());
								el.data("scrollableArea").prepend(el.data("swappedElement"));
								el.data("scrollWrapper").scrollLeft(el.data("scrollWrapper").scrollLeft() + el.data("swappedElement").outerWidth(true));
								el.data("getNextElementWidth", true);
							}
							break;
						default:
							break;

					}
				}
			}, o.autoScrollInterval));

		},
		restoreOriginalElements: function() {
			var self = this, el = this.element;

			// Restore the original content of the scrollable area
			el.data("scrollableArea").html(el.data("originalElements"));
			self.recalculateScrollableArea();
			self.moveToElement("first");
		},
		show: function() {
			var el = this.element;
			el.data("visible", true);
			el.show();
		},
		hide: function() {
			var el = this.element;
			el.data("visible", false);
			el.hide();
		},
		enable: function() {
			var el = this.element;

			// Set enabled to true
			el.data("enabled", true);
		},
		disable: function() {
			var el = this.element;

			// Clear all running intervals
			clearInterval(el.data("autoScrollInterval"));
			clearInterval(el.data("rightScrollInterval"));
			clearInterval(el.data("leftScrollInterval"));

			// Set enabled to false
			el.data("enabled", false);
		},
		destroy: function() {
			var el = this.element;

			// Clear all running intervals
			clearInterval(el.data("autoScrollInterval"));
			clearInterval(el.data("rightScrollInterval"));
			clearInterval(el.data("leftScrollInterval"));
			
			// Restore the original content of the scrollable area
			el.data("scrollableArea").html(el.data("originalElements"));

			// Remove the width of the scrollable area
			el.data("scrollableArea").removeAttr("style");

			el.data("scrollWrapper").scrollLeft(0);

			// Call the base destroy function
			$.Widget.prototype.destroy.apply(this, arguments);

		}
	});
})(jQuery);