---
date: '2012-11-15'
title: 'Syncing JavaScript with your active media query'
tags: ['js', 'css']
permalink: /2012/11/15/syncing-javascript-with-your-active-media-query/
---

Just read [Jeremy Keith's conditional loading for responsive designs concept](https://24ways.org/2011/conditional-loading-for-responsive-designs). Not only can it be used to load in additional content, but it's a great way to sync JavaScript functions with your CSS media queries. As I've worked on responsive websites, I noticed a need to be able to sync my JavaScript functionality with my CSS media queries and at times, have only certain JavaScript functionality work within a certain range of breakpoints.

## Iterating on a concept

It seems like the most recent iteration of Jeremy's concept is [Emil Björklund's](https://github.com/emilbjorklund) version. He came up with [the idea of using a pseudo element](https://gist.github.com/emilbjorklund/2481019) to store a value to associate with the active media query. This works great because then you only have to manage your breakpoints in your CSS file. You can check for the pseudo content value with JavaScript and make sure your JS functionality is in sync with you CSS media queries and you don't have to worry about [checking screensize/viewport widths and all the cross-browser issues](http://tripleodeon.com/2011/12/first-understand-your-screen/) that go along with that.

Chris Coyier has put together a [nice demo](https://css-tricks.com/examples/ConditionalCSS/) as well to show how the concept could work with jQuery. I like how Chris named his breakpoints `Baby Bear`, `Mama Bear`, and `Papa Bear`. I think it's important to move away from the idea that screensize/viewport size equals device type.

This concept works great in modern browsers, though I wanted to expand on it and fix some issues I noticed when testing it. I decided to use Coyier's demo as a starting point for my iteration.

## Squashing bugs

When I tested Emil's demo on my phone, a Galaxy S with Android 2.3, I came across an odd bug in my stock browser and some of the other 3rd party browser you can download on Android  The stock browser on my phone supports both pseudo elements and `.getComputedStyle`, though it wouldn't alert the value for the active media query.

I tested on another Android phone running Android 2.2 and noticed the same error that I saw on my phone as well. I haven't tested on any other versions of Android, though I'm curious if this bug happens on versions. I also tested on a friend's Galaxy S3 with Android 4.0.4 and the demo worked fine.

With my interest peaked about this issue, I got a hold of a Blackberry Curve running OS6. I noticed the same issue with Emil's demo as I did on the Android phones running 2.X.

I decided to switch storing the breakpoint value inside of a font-family property. This fixed the bug in Android 2.X and on the Blackberry running OS6, though it introduced another issue.

As [Jeremy noted](https://adactio.com/journal/5429/),

> It works! …except in Opera. Where every other browser returns whatever string has been provided in the font-family declaration, Opera returns the font that ends up actually getting used (Times New Roman by default).

I was able to get around this by using pseudo elements for Opera, and font-family for all other modern browsers.

## Old IE

Another issue I had was getting this to work in IE 8 and lower. In a perfect world, we could just develop for the latest version of each browser and call it a day. However, most of the sites I work on still see a fair amount of usage from people using IE 8 and lower. Because of this [I wanted to](https://twitter.com/bjankord/status/197126937926311936) find a way to get this working in IE 8 and IE 7. This was somewhat of an issue because IE 8 and below don't natively support `.getComputedStyle`. I added a polyfill for `.getComputedStyle` and was able to get this technique working in IE 8 and IE 7. This comes in handy occasions when I use [Scott Jehl's respond.js](https://github.com/scottjehl/Respond).

## A wider cross-browser solution

Emil's versions works great in modern browsers, though I really wanted to get this working on wider range of mobile devices as well as IE 8 and IE 7. By making a few changes on to what was already done, I was able get this technique working on a wider range of devices/browsers.

You can [view the code for it on GitHub](https://github.com/bjankord/Media-Query-Sync).

I wanted to keep the code for this small and avoid using jQuery. I've tested in Chrome, Firefox, Opera, Safari, and IE7+ and it seems to work great. I've also tested on some Android 2.2, 2.3, and 4.0 devices, an iPod, iPhone 4S and iPad 3, and a Blackberry Curve and everything worked as expected. There are so many devices out there, it's hard to test on all of them, though I'm pretty happy with the results I've seen so far. If you come across an issue with this, let me know on [GitHub](https://github.com/bjankord/Media-Query-Sync).
