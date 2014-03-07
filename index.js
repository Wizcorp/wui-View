var inherit = require('inherit');
var WuiDom = require('WuiDom');

/**
 * @class
 * @classDesc
 * @augments WuiDom
 */
function WuiView() {
	WuiDom.call(this);
	this.assign('div', { className: 'WuiView' });
	this.hideMethod();
}

inherit(WuiView, WuiDom);
module.exports = WuiView;

/**
 * @param options
 * @param itemName
 */
WuiView.prototype.create = function (options, itemName) {

	options.parentElement.appendChild(this.rootElement);
	this.emit('created', options, itemName);
};

/**
 * @param params
 */
WuiView.prototype.open = function () {
	window.document.documentElement.scrollIntoView(true);
	this.show();
};

/**
 * close
 */
WuiView.prototype.close = function () {
	this.hide();
};

/**
 * set scrolling listener
 */
function setScrolling(view, value) {
	if (view.scrollingDisabled === undefined) {
		view.allowDomEvents();

		view.on('dom.touchmove', function (e) {
			// TODO: this does not work on a desktop

			if (view.scrollingDisabled) {
				e.preventDefault();
			}
		});
	}

	view.scrollingDisabled = value;
}

/**
 * disableScrolling
 */
WuiView.prototype.disableScrolling = function () {
	setScrolling(this, true);
};

/**
 * enableScrolling
 */
WuiView.prototype.enableScrolling = function () {
	setScrolling(this, false);
};