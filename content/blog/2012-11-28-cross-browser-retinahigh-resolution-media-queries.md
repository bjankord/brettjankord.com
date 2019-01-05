---
title: 'Cross browser retina/high resolution media queries'
date: '2012-11-28'
permalink: /2012/11/28/cross-browser-retina-high-resolution-media-queries/
tags:
 - CSS
 - Media Queries
---

[fantasai][1], [Ben Frain][2], and [Peter Gasston][3] have all written about this topic before, though I still see a lot developers using verbose media queries for retina/high resolution displays so I figured I would write up my own post.

Most developers are currently writing retina/high resolution media queries similar to the examples below:

This media query example is from [37signals article on retina images and scss][4]. It is based on the one in Thomas Fuchs’ Retinafy book but, it has been modified to define the Google Nexus 7 with it’s 1.3 pixel ratio as a retina-capable device.

```css
@media (-webkit-min-device-pixel-ratio: 1.3),
  (min--moz-device-pixel-ratio: 1.3),
  (-o-min-device-pixel-ratio: 2.6/2),
  (min-device-pixel-ratio: 1.3),
  (min-resolution: 1.3dppx) {
  /* Retina-specific stuff here */
}
```

Chris Coyier has a [retina display media query example][5] that looks like this:

```css
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min--moz-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2/1),
  only screen and (min-device-pixel-ratio: 2),
  only screen and (min-resolution: 192dpi),
  only screen and (min-resolution: 2dppx) {
  /* Retina-specific stuff here */
}
```

## What's wrong with the above solutions

Nothing really, though they could be a lot cleaner. A friend asked me about retina media queries and how to get them to work on his new Windows 8 Phone.

It got me thinking about the standard retina/high resolution media query I typically use. Usually I just copy and paste from other sites and had never put much thought into it.

When I tested the query I usually use on his phone, I learned that IE does not have a device-pixel-ratio media query. There is no -ms-device-pixel-ratio. You can't detect the device-pixel-ration with JavaScript using window.devicePixelRatio in IE either. Also of note, window.devicePixelRatio does not currently work in Firefox, though it does work in Opera and Chrome.

## IE is using standards, this is new

**The device-pixel-ratio is not a standard media query.**

`-webkit-min-device-pixel-ratio` is not a standard

`min-moz-device-pixel-ratio` is not a standard

`-o-min-device-pixel-ratio` is not a standard

**`min-device-pixel-ratio`: I don't think the un-prefixed version works an any browsers, because it's not a standard.**

Ok, so we got that cleared up. Good news is the resolution media query is **a standard media query**.

I started looking to see which browsers supported the resolution media query. I forked [Jordan Moore's Palm Reader][6] to do some [testing][7] specifically related to device-pixel-ratio and resolution media queries. I also looked at [MDN's documentation on resolution media queries][8] and found that it actually has great support.

**Resolution media queries** are currently supported in **IE9+, FF3.5+, Opera9.5+**. However, support for resolution media queries is lacking in webkit browsers. Support for resolution media queries was recently added to webkit on Oct. 23rd, 2012.

This means you can replace, the `min-moz-device-pixel-ratio`, the `-o-min-device-pixel-ratio` with a resolution media query. You can also just remove the unprefixed `min-device-pixel-ratio`.

This cleans up Coyier's retina/high resolution media query.

```css
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-resolution: 192dpi),
  only screen and (min-resolution: 2dppx) {
  /* Retina-specific stuff here */
}
```

We can clean this up even more though. The dppx unit is a new unit that is equal to the device-pixel-ratio value webkit uses.

However, the dppx unit is not as widely supported as the dpi unit. The dppx unit is supported in FF 16.0+ and Opera 12.10+.

IE does not currently support dppx units.

If you want to support retina/high resolution devices that are running IE, you need to use the resolution media query and use dpi units. If you're going to use the dpi unit, I don't see much need to include the dppx unit as well. Everywhere the dppx unit is supported, the dpi unit is also supported. Using both units would be like writing a media query that uses pixels and ems for the same size.

```css
@media only screen and (min-width: 320px), only screen and (min-width: 20em) {
  /* Two units that equal the same value don't make sense in this media query*/
  /* Why use two units which equal the same value with resolution media queries? */
}
```

## Final retina/high resolution media query

This works in all the browsers that Coyier's original example does and is just a future friendly.

```css
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-resolution: 192dpi) {
  /* Retina-specific stuff here */
}
```

Like I said, others have written about this before, though I still see a lot of people using verbose retina/high resolution media queries. As more Windows 8 devices come out, I can see a need for retina/high resolution media queries that work in IE.

I've done some testing across different desktop browsers and this looks to work cross-browser. I need to do some testing on mobile devices to see if the slimmed down media query works as well as it does on desktops. Hopefully this helps other developers see they can slim down retina/high resolution media queries while still having them work on a wider range of devices.

```css
/* Clean version examples */

/* 1.25 dpr */
@media (-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi) {
  /* Retina-specific stuff here */
}

/* 1.3 dpr */
@media (-webkit-min-device-pixel-ratio: 1.3), (min-resolution: 124.8dpi) {
  /* Retina-specific stuff here */
}

/* 1.5 dpr */
@media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi) {
  /* Retina-specific stuff here */
}

/*2.0 dpr */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* Retina-specific stuff here */
}
```

[1]: http://www.w3.org/blog/CSS/2012/06/14/unprefix-webkit-device-pixel-ratio/
[2]: http://benfrain.com/a-full-vendor-stack-for-targeting-high-resolution-retina-devices/
[3]: http://www.broken-links.com/2012/07/13/using-media-queries-to-test-device-resolution/
[4]: http://37signals.com/svn/posts/3271-easy-retina-ready-images-using-scss
[5]: http://css-tricks.com/snippets/css/retina-display-media-query/
[6]: http://www.jordanm.co.uk/palmreader/
[7]: http://brettjankord.com/projects/palmreader/
[8]: https://developer.mozilla.org/en-US/docs/CSS/resolution
