---
title: 'Beyond device detection'
date: '2013-01-22'
permalink: /2013/01/22/beyond-device-detection/
summary: The landscape of web enabled devices is drastically changing at a rapid pace . Device detection is no longer a reliable solution to adapt…
tags:
 - JS
 - Device Detection
layout: layouts/post.njk
type: article
---

The landscape of web enabled devices is drastically changing at a [rapid pace][1]. Device detection is no longer a reliable solution to adapt with the changes we are seeing in the technological world. The amount of new web enabled devices being released is just too high.

## A question of reliability

Device detection _cannot_ reliably report the features of every device people are using to access the web. The main reason is for this is that reliable feature detection can only be done client-side via JavaScript. There are [ideas to offer feature detection on the server][2], yet these options are not available today.

There are [serives][3] which aim to provide a list of known features on a device based on it's user agent, however, they are not without drawbacks.

The difficulty of keeping up with every new web enabled device and testing it and making sure it’s features are added to a database is no small task. It’s a maintenance nightmare as well as a costly endeavor. If one major company decides to break away from standards you rely on for device detection and feature pairing based on the user agent, the whole technique becomes less reliable.

For device detection to be accurate, it must be reliable. For device detection to be reliable, it must be tested on all of the new devices and maintained to make sure does not produce major false positives. This task is becoming more and more challenging.

{% Image "img/wp-content/uploads/2013/01/test-all-the-devices.jpg", "Pile of web enabled devices with text overlaid on top that reads, Gotta catch 'em all" %}

A more future-friendly solution for adapting to this change is to move beyond device detection and to rely on feature detection alone.

## Device Detection != Feature Detection

One common pattern I saw with device detection when I was working on [Categorizr][6] and looking at other projects, new and old, was too assume features based on the type of device. For instance, it was, and unfortunately [still is][7], [common][8] for people to [talk about][9] how mobiles and tablets support touch and desktops do not. This is simply not true anymore.

(Credit: CNET)

## Feature Detection != Device Detection

I will admit, it’s difficult to move beyond device detection. We want our sites to be suitable for and to work on as many devices as possible. Yet relying on user agents to determine features is not reliable, though we continue with this same set logic. We just reverse it. I’m sure you've all seen [a list][10] of media queries designed [specifically for the iPhone or the iPad][11]. Or maybe the misconception I brought up previously, that we can rely on detecting touch support to determine what type of device a user is on. These are not only silly, but have become tiring to see [over][12] and [over][13].

**If you believe device detection != feature detection, you must accept that, feature detection != device detection.**

Move beyond device detection through feature detection. Let feature detection be just that, feature detection. The lines we've drawn in the sand to differentiate devices are fading away. We are seeing this with Windows 8 tablets and laptops/desktops. But we are also seeing the [lines][14] [between][15] [mobile][16] and [tablet][17] blur.

Once you move beyond device detection, you will be better prepared to adapt to the constantly changing landscape of web enabled devices. The Web is changing and if we wish to keep up with it, we too, must change the ways to adapt to it.

[1]: http://newsroom.cisco.com/press-release-content?articleId=888280
[2]: https://docs.google.com/presentation/d/1y_A6VOZy9bD2i0VLHv9ZWr0W3hZJvlTNCDA0itjI0yM/edit#slide=id.p19
[3]: http://wurfl.sourceforge.net/
[4]: http://www.brettjankord.com/2013/01/10/active-development-on-categorizr-has-come-to-an-end/
[5]: http://commons.wikimedia.org/wiki/File:Device_pile.jpg
[6]: https://github.com/bjankord/Categorizr
[7]: http://tympanus.net/codrops/2013/01/21/ui-design-guidelines-for-responsive-design/
[8]: http://www.html5rocks.com/en/mobile/cross-device/
[9]: http://blog.grayghostvisuals.com/modernizr/conditionally-loading-resources/
[10]: http://css-tricks.com/snippets/css/media-queries-for-standard-devices/
[11]: http://perishablepress.com/target-iphone-and-ipad-with-css3-media-queries/
[12]: http://stackoverflow.com/questions/6191590/css-media-query-on-iphone
[13]: http://web-design-weekly.com/snippets/iphone-5-media-query/
[14]: http://www.theverge.com/2013/1/21/3902234/lg-joins-the-5-inch-1080p-party-with-optimus-g-pro
[15]: http://www.engadget.com/2013/01/07/huawei-launches-6-1-inch-ascend-mate/
[16]: http://www.androidcentral.com/production-line-leak-claims-show-644-inch-screen-sony-device
[17]: http://reviews.cnet.com/2733-3126_7-936-3.html
