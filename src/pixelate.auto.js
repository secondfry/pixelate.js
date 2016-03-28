/*
 * pixelate.auto.js
 *
 * @copyright Copyright (c) 2016 Rustam Second_Fry Gubaydullin (@Second_Fry), 2013 43081j (@43081j)
 * @license   https://github.com/secondfry/license/blob/master/LICENSE (MIT License)
 */
'use strict';

var PixelateAuto = function(autoOptions){
	return PixelateHelper.ready(function(){
		PixelateHelper.pixelateImages(document.querySelectorAll('img'), autoOptions);
		PixelateHelper.pixelateVideos(document.querySelectorAll('video'), autoOptions);
		document.addEventListener('DOMNodeInserted', function (e) {
			if (e.target && e.target.querySelectorAll) {
				PixelateHelper.pixelateImages(e.target.querySelectorAll('img'), autoOptions);
			}
		});
		return this;
	});
};
