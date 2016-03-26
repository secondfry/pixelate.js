/*
 * pixelate.js
 *
 * Original author: 43081j (2013)
 *
 * @copyright Copyright (c) 2016 Rustam Second_Fry Gubaydullin (@Second_Fry), 2013 43081j (@43081j)
 * @license   https://github.com/secondfry/license/blob/master/LICENSE (MIT License)
 */
(function(window, $) {
	var pixelate = function() {
		this._settings = {
			value: 0.1,
			reveal_on_hover: false,
			reveal_on_click: false
		};
		this._arguments = [].slice.call(arguments, 0);
		this.element = this;
		this.parent = this.parentNode;

		var _core = this;

		this.parseArguments = function() {
			for(var option in this._settings) {
				if(this._settings.hasOwnProperty(option)) {
					if(this.element.dataset.hasOwnProperty(option)) {
						switch(this.element.dataset[option]) {
							case 'true':
							case 'false':
								this._settings[option] = (this.element.dataset[option] === 'true');
								break;
							default:
								this._settings[option] = this.element.dataset[option];
						}
					}
					if(typeof this._arguments !== 'undefined' && this._arguments.length === 1 && this._arguments[0].hasOwnProperty(option)) {
						switch(this._arguments[0][option]) {
							case 'true':
							case 'false':
								this._settings[option] = (this._arguments[0][option] === 'true');
								break;
							default:
								this._settings[option] = this._arguments[0][option];
						}
					}
				}

			}
		};
		this.perform = function() {
			this.width = this.element.width;
			this.height = this.element.height;
			this.canvas = document.createElement('canvas');
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.context = this.canvas.getContext('2d');
			this.context.mozImageSmoothingEnabled = false;
			this.context.webkitImageSmoothingEnabled = false;
			this.context.imageSmoothingEnabled = false;
			this.crop_width = this.width * this._settings.value;
			this.crop_height = this.height * this._settings.value;
			this.context.drawImage(this.element, 0, 0, this.crop_width, this.crop_height);
			this.context.drawImage(this.canvas, 0, 0, this.crop_width, this.crop_height, 0, 0, this.canvas.width, this.canvas.height);
			this.element.style.display = 'none';
			this.parent.insertBefore(this.canvas, this.element);
		};
		this.listen = function() {
			_core.releaved = false;
			if(this._settings.reveal_on_hover === true) {
				this.canvas.addEventListener('mouseenter', function() {
					if(_core.revealed) return;
					_core.context.drawImage(_core.element, 0, 0, _core.width, _core.height);
				});
				this.canvas.addEventListener('mouseleave', function() {
					if(_core.revealed) return;
					_core.context.drawImage(_core.element, 0, 0, _core.crop_width, _core.crop_height);
					_core.context.drawImage(_core.canvas, 0, 0, _core.crop_width, _core.crop_height, 0, 0, _core.canvas.width, _core.canvas.height);
				});
			}
			if(this._settings.reveal_on_click === true) {
				this.canvas.addEventListener('click', function() {
					_core.revealed = !_core.revealed;
					if(_core.revealed) {
						_core.context.drawImage(_core.element, 0, 0, _core.width, _core.height);
					} else {
						_core.context.drawImage(_core.element, 0, 0, _core.crop_width, _core.crop_height);
						_core.context.drawImage(_core.canvas, 0, 0, _core.crop_width, _core.crop_height, 0, 0, _core.canvas.width, _core.canvas.height);
					}
				});
			}
		};

		this.parseArguments();
		this.perform();
		this.listen();
	};
	window.HTMLImageElement.prototype.pixelate = pixelate;
	if(typeof $ === 'function') {
		$.fn.extend({
			pixelate: function() {
				return this.each(function() {
					pixelate.apply(this, arguments);
				});
			}
		});
	}
	document.addEventListener('DOMContentLoaded', function() {
		var img = document.querySelectorAll('img[data-pixelate]');
		for(var i = 0; i < img.length; i++) {
			img[i].addEventListener('load', function() {
				this.pixelate();
			});
		}
	});
})(window, typeof jQuery === 'undefined' ? null : jQuery);
