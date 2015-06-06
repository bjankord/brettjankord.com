---
title: Cross Browser Retina/High Resolution Media Queries
author: Brett
layout: post
comments : true
code_demo: true
permalink: /2012/11/28/cross-browser-retinahigh-resolution-media-queries/
dsq_thread_id:
  - 948576598
categories:
  - Media Queries
---
[fantasai][1], [Ben Frain][2], and [Peter Gasston][3] have all written about this topic before, though I still see a lot developers using verbose media queries for retina/high resolution displays so I figured I would write up my own post.

Most developers are currently writing retina/high resolution media queries similar to the examples below:

This media query example is from [37signals article on retina images and scss][4]. It is based on the one in Thomas Fuchs’ Retinafy book but, it has been modified to define the Google Nexus 7 with it’s 1.3 pixel ratio as a retina-capable device.

{% highlight css %}
@media
(-webkit-min-device-pixel-ratio: 1.3),
(min--moz-device-pixel-ratio: 1.3),
(-o-min-device-pixel-ratio: 2.6/2),
(min-device-pixel-ratio: 1.3),
(min-resolution: 1.3dppx) {
   /* Retina-specific stuff here */
}
{% endhighlight %}

Chris Coyier has a [retina display media query example][5] that looks like this:

{% highlight css %}
@media
only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and ( min--moz-device-pixel-ratio: 2),
only screen and ( -o-min-device-pixel-ratio: 2/1),
only screen and ( min-device-pixel-ratio: 2),
only screen and ( min-resolution: 192dpi),
only screen and ( min-resolution: 2dppx) {
    /* Retina-specific stuff here */
}
{% endhighlight %}

## What&#8217;s wrong with the above solutions

Nothing really, though they could be a lot cleaner. A friend asked me about retina media queries and how to get them to work on his new Windows 8 Phone.

It got me thinking about the standard retina/high resolution media query I typically use. Usually I just copy and paste from other sites and had never put much thought into it.

When I tested the query I usually use on his phone, I learned that IE does not have a device-pixel-ratio media query. There is no -ms-device-pixel-ratio. You can&#8217;t detect the device-pixel-ration with Javascript using window.devicePixelRatio in IE either. Also of note, window.devicePixelRatio does not currently work in Firefox, though it does work in Opera and Chrome.

## IE is using standards, this is new

**The device-pixel-ratio is not a standard media query.**

-webkit-min-device-pixel-ratio: is not a standard

min&#8211;moz-device-pixel-ratio: is not a standard

-o-min-device-pixel-ratio: is not a standard

**min-device-pixel-ratio: I don&#8217;t think the un-prefixed version works an any browsers, because it&#8217;s not a standard.**

Ok, so we got that cleared up. Good news is the resolution media query is **a standard media query**.

I started looking to see which browsers supported the resolution media query. I forked [Jordan Moore&#8217;s Palm Reader][6] to do some [testing][7] specifically related to device-pixel-ratio and resolution media queries. I also looked at [MDN&#8217;s documentation on resolution media queries][8] and found that it actually has great support.

**Resolution media queries** are currently supported in **IE9+, FF3.5+, Opera9.5+**. However, support for resolution media queries is lacking in webkit browsers. Support for resolution media queries was recently added to webkit on Oct. 23rd, 2012.

This means you can replace, the min&#8211;moz-device-pixel-ratio, the -o-min-device-pixel-ratio with a resolution media query. You can also just remove the unprefixed min-device-pixel-ratio.

This cleans up Coyier&#8217;s retina/high resolution media query.

{% highlight css %}
@media
only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and ( min-resolution: 192dpi),
only screen and ( min-resolution: 2dppx) {
    /* Retina-specific stuff here */
}
{% endhighlight %}


We can clean this up even more though. The dppx unit is a new unit that is equal to the device-pixel-ratio value webkit uses.

However, the dppx unit is not as widely supported as the dpi unit. The dppx unit is supported in FF 16.0+ and Opera 12.10+.

IE does not currently support dppx units.

If you want to support retina/high resolution devices that are running IE, you need to use the resolution media query and use dpi units. If you&#8217;re going to use the dpi unit, I don&#8217;t see much need to include the dppx unit as well. Everywhere the dppx unit is supported, the dpi unit is also supported. Using both units would be like writing a media query that uses pixels and ems for the same size.

{% highlight css %}
@media
only screen and ( min-width: 320px),
only screen and ( min-width: 20em) {
  /* Two units that equal the same value don't make sense in this media query*/
  /* Why use two units which equal the same value with resolution media queries? */
}
{% endhighlight %}


## Final retina/high resolution media query

This works in all the browsers that Coyier&#8217;s original example does and is just a future friendly.

{% highlight css %}
@media
only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and (min-resolution: 192dpi) {
    /* Retina-specific stuff here */
}
{% endhighlight %}


Like I said, others have written about this before, though I still see a lot of people using verbose retina/high resolution media queries. As more Windows 8 devices come out, I can see a need for retina/high resolution media queries that work in IE.

I&#8217;ve done some testing across different desktop browsers and this looks to work cross-browser. I need to do some testing on mobile devices to see if the slimmed down media query works as well as it does on desktops. Hopefully this helps other developers see they can slim down retina/high resolution media queries while still having them work on a wider range of devices.

{% highlight css %}
/* Clean version examples */

/* 1.25 dpr */
@media
(-webkit-min-device-pixel-ratio: 1.25),
(min-resolution: 120dpi){
    /* Retina-specific stuff here */
}

/* 1.3 dpr */
@media
(-webkit-min-device-pixel-ratio: 1.3),
(min-resolution: 124.8dpi){
    /* Retina-specific stuff here */
}

/* 1.5 dpr */
@media
(-webkit-min-device-pixel-ratio: 1.5),
(min-resolution: 144dpi){
    /* Retina-specific stuff here */
}

/*2.0 dpr */
@media
(-webkit-min-device-pixel-ratio: 2),
(min-resolution: 192dpi){
    /* Retina-specific stuff here */
}
{% endhighlight %}

## Update

I&#8217;ve finished my testing on the mobile devices I have access to and the results are interesting to say the least.

I tested on an Android 2.3 device, an Android 4.1, and an iPad 3. I also got my hands on two of the new Windows 8 phones for testing.

The simplified retina/high resolution media query works great across the stock browsers on iOS and Android. -webkit-device-pixel-ratio and window.DevicePixelRatio work great as well as expected. The stock browser on iOS and Android is webkit based browsers so there really is no surprise there.

Things get interesting when looking at how Opera Mini, Firefox for Mobile (Fennec), and IE on Windows Phone 8 handle retina/high resolution media queries.

## Opera Mini

On iOS and Android, Opera Mini reported odd values across the board for high resolution media queries and window.devicePixelRatio. I&#8217;m guessing this has to do with it being a proxy browser.

On my iPad 3 and my Android 4.1 device, both devices have a device-pixel-ratio of 2. However, when using window.devicePixelRatio, Opera Mini reports the value of 1 on these devices.

In regards to media queries, using Opera prefixed min-device-pixel-ratio media query, only the -o-min-device-pixel-ratio:1 reported true on the iPad 3 and Android 4.1 device. However, the min-resolution:192dpi media query reported true.

The resolution media query is reporting the right value in Opera Mini, but the prefixed -o-min-device-pixel-ratio is not.

Also of interest, only dpi units work in Opera Mini currently.

On my Android 2.3 device, the device-pixel-ratio is 1.5. Again, -o-min-device-pixel-ratio:1 was the only Opera prefixed media query to report true. However, the only min-resolution media query to report true was the one set to 96dpi.

I&#8217;m guessing these issues are all caused from Opera Mini being a proxy browser.

Of note, -o-device-pixel-ratio media queries and resolution media queries work create in **Opera Mobile** on Android. Opera Mobile also supports dpi, dpcm, and dppx units in resolution media queries.

## Firefox for Mobile (Fennec)

I tested Firefox for Mobile on my Android devices and saw some of the most bizarre results from testing. On both my Android 2.3 and Android 4.1 devices, the min&#8211;moz-device-pixel-ratio: 1 media query was the only moz prefixed media query to report true.

On the Android 4.1 device, which has a dpr of 2, the min-resolution:192dpi and min-resolution:2ddpx reported true. Interestingly, these same two media queries reported true on the Android 2.3 device which has a dpr of 1.5.

It seems like resolution media queries work a bit better than min&#8211;moz-device-pixel-ratio media queries in Firefox for Mobile on Android, but both a buggy.

## Interenet Explorer on Windows Phone 8

I tested on two of the new Windows 8 phones, the Nokia 920, and the HTC 8x. Both phones do not support any of the device-pixel-ratio media queries. The devices do support the resolution media query, dpi and dpcm units, but not dppx units.

However, both devices reported a resolution of 96dpi. I am not sure if this is correct or not. I&#8217;ve seen people say the phone has a high resolution screen, so it seems odd that it only reports 96dpi. If anyone has more info on this, let me know in the comments below.

Retina/high resolution media queries work great across a wide range of different devices and different browsers, though if you really wanted to make your site look great on the widest range of retina/high resolution displays and browsers, I&#8217;d look at using [icon fonts][9], [SVG images][10] and [compressive images][11].

 [1]: http://www.w3.org/blog/CSS/2012/06/14/unprefix-webkit-device-pixel-ratio/
 [2]: http://benfrain.com/a-full-vendor-stack-for-targeting-high-resolution-retina-devices/
 [3]: http://www.broken-links.com/2012/07/13/using-media-queries-to-test-device-resolution/
 [4]: http://37signals.com/svn/posts/3271-easy-retina-ready-images-using-scss
 [5]: http://css-tricks.com/snippets/css/retina-display-media-query/
 [6]: http://www.jordanm.co.uk/palmreader/
 [7]: http://brettjankord.com/projects/palmreader/
 [8]: https://developer.mozilla.org/en-US/docs/CSS/resolution
 [9]: http://css-tricks.com/using-fonts-for-icons/
 [10]: http://www.broken-links.com/2010/06/14/using-svg-in-backgrounds-with-png-fallback/
 [11]: http://filamentgroup.com/lab/rwd_img_compression/
