pixelate.js
===

**pixelate.js** is a simple library and jQuery plugin to pixelate any set of images and optionally reveal them on hover. [Check][pixelate_demo] that by yourself.

Usage
===

**pixelate.js** can be used with or without jQuery.

```javascript
// Following two lines are near identical
$('img').pixelate();
document.querySelector('img').pixelate();
```

Or via HTML data attributes:

```html
<img src="test.jpg" alt="" data-pixelate />
```

Options
===

* `value` The percentage of pixelation to perform, a value between `0` and `1`.
* `reveal_on_hover` Reveal the image on hover.
* `reveal_on_click` Reveal the image on click.

These options may be specified by data tags, like so:

```html
<img src="img.jpg" alt="" data-pixelate data-value="0.5" data-reveal_on_hover="false" data-reveal_on_click="false">
```

or by jQuery/JavaScript:

```javascript
$('#myimage').pixelate({ value: 0.5, reveal_on_hover: false, reveal_on_click: false });
```

License
===
https://raw.githubusercontent.com/secondfry/license/master/LICENSE

[pixelate_demo]: http://secondfry.github.io/pixelate.js/
