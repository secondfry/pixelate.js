/*
 * pixelate.js
 *
 * Original author: 43081j (2013)
 *
 * @copyright Copyright (c) 2016 Rustam Second_Fry Gubaydullin (@Second_Fry), 2013 43081j (@43081j)
 * @license   https://github.com/secondfry/license/blob/master/LICENSE (MIT License)
 */
'use strict';

(function(window, $) {
	window.HTMLImageElement.prototype.pixelate = function() {
		this._settings = {
			value: 0.25,
			reveal_on_hover: false,
			reveal_on_click: false
		};
		this._arguments = [].slice.call(arguments, 0);
		if(typeof this._done == 'undefined') {
			this._done = false;
		}

		this.parseArguments = function() {
			for(var option in this._settings) {
				if(this._settings.hasOwnProperty(option)) {
					if(this.dataset.hasOwnProperty(option)) {
						switch(this.dataset[option]) {
							case 'true':
							case 'false':
								this._settings[option] = (this.dataset[option] === 'true');
								break;
							default:
								this._settings[option] = this.dataset[option];
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
			this.displayWidth = this.width;
			this.displayHeight = this.height;

			this.canvas = document.createElement('canvas');
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this.canvas.style = this.style;
			this.canvas.classList = this.classList;
			for(var option in this.dataset) {
				if(this.dataset.hasOwnProperty(option)) {
					this.canvas.dataset[option] = this.dataset[option];
				}
			}

			this.context = this.canvas.getContext('2d');
			this.context.mozImageSmoothingEnabled = false;
			this.context.webkitImageSmoothingEnabled = false;
			this.context.imageSmoothingEnabled = false;

			this.cropWidth = this.displayWidth * this._settings.value;
			this.cropHeight = this.displayHeight * this._settings.value;
			this.context.drawImage(this, 0, 0, this.cropWidth, this.cropHeight);
			this.context.drawImage(this.canvas, 0, 0, this.cropWidth, this.cropHeight, 0, 0, this.displayWidth, this.displayHeight);

			this.style.display = 'none';
			this.parentNode.insertBefore(this.canvas, this);
		};
		this.listen = function() {
			this.releaved = false;
			if(this._settings.reveal_on_hover === true) {
				this.canvas.addEventListener('mouseenter', (function() {
					if(this.revealed) return;
					this.context.drawImage(this, 0, 0, this.displayWidth, this.displayHeight);
				}).bind(this));
				this.canvas.addEventListener('mouseleave', (function() {
					if(this.revealed) return;
					this.context.drawImage(this, 0, 0, this.cropWidth, this.cropHeight);
					this.context.drawImage(this.canvas, 0, 0, this.cropWidth, this.cropHeight, 0, 0, this.displayWidth, this.displayHeight);
				}).bind(this));
			}
			if(this._settings.reveal_on_click === true) {
				this.canvas.addEventListener('click', (function() {
					this.revealed = !this.revealed;
					if(this.revealed) {
						this.context.drawImage(this, 0, 0, this.displayWidth, this.displayHeight);
					} else {
						this.context.drawImage(this, 0, 0, this.cropWidth, this.cropHeight);
						this.context.drawImage(this.canvas, 0, 0, this.cropWidth, this.cropHeight, 0, 0, this.displayWidth, this.displayHeight);
					}
				}).bind(this));
			}
		};

		if(!this._done) {
			this._done = true;
			this.parseArguments();
			this.perform();
			this.listen();
		}
	};
	if(typeof $ === 'function') {
		$.fn.extend({
			pixelate: function() {
				return this.each(function() {
					window.HTMLImageElement.prototype.pixelate.apply(this, arguments);
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
