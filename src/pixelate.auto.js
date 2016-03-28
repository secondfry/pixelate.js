/*
 * pixelate.auto.js
 *
 * @copyright Copyright (c) 2016 Rustam Second_Fry Gubaydullin (@Second_Fry), 2013 43081j (@43081j)
 * @license   https://github.com/secondfry/license/blob/master/LICENSE (MIT License)
 */
'use strict';

var PixelateAuto = function(autoOptions){
	function ready(fn) {
		if (document.readyState != 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	function pixelateImages(images) {
		if (images) {
			images.forEach(function (image) {
				if (image.complete) {
					image.src = image.src + '?' + new Date().getTime();
				}
				image.addEventListener('load', function (e) {
					this.pixelate(autoOptions);
				})
			})
		}
	}

	ready(function () {
		pixelateImages(document.querySelectorAll('img'));
		document.addEventListener('DOMNodeInserted', function (e) {
			if (e.target && e.target.querySelectorAll) {
				pixelateImages(e.target.querySelectorAll('img'));
			}
		})
	});
};
