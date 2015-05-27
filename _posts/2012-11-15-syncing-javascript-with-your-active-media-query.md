---
title: Syncing JavaScript with your active media query
author: Brett
layout: post
permalink: /2012/11/15/syncing-javascript-with-your-active-media-query/
dsq_thread_id:
  - 936310339
categories:
  - Media Queries
  - Responsive Web Design
---
I&#8217;m starting to move more and more towards the idea of using client-side conditional loading as opposed to server-side conditional loading. I've seen a couple of solutions for handling conditional loading on the client side, from using modernizr and AJAXing content in to toggleing HTML comments around conditional content. One of the best solutions I&#8217;ve seen is <a title="Conditional loading for responsive design" href="http://24ways.org/2011/conditional-loading-for-responsive-designs" target="_blank">Jeremy Keith&#8217;s conditional loading for responsive designs concept</a>. Not only can it be used to load in additional content, but it&#8217;s a great way to sync Javascript functions with your CSS media queries. As I&#8217;ve worked on responsive websites, I noticed a need to be able to sync my JavaScript functionality with my CSS media queries and at times, have only certain JavaScript functionality work within a certain range of breakpoints.

## Iterating on a concept

It seems like the most recent iteration of Jeremy&#8217;s concept is is <a href="https://github.com/emilbjorklund" target="_blank">Emil Björklund</a>&#8216;s version. He came up with <a href="https://gist.github.com/2481019" target="_blank">the idea of using a pseudo element</a> to store a value to associate with the active media query. This works great because then you only have to manage your breakpoints in your CSS file. You can check for the pseudo content value with JavaScript and make sure your JS functionality is in sync with you CSS media queries and you don&#8217;t have to worry about [checking screensize/viewport widths and all the cross-browser issues][1] that go along with that.

Chris Coyier has put together a <a href="http://css-tricks.com/examples/ConditionalCSS/" target="_blank">nice demo</a> as well to show how the concept could work with jQuery. I like how Chris named his breakpoints Baby Bear, Mama Bear, and Papa Bear. I think it&#8217;s important to move away from the idea that screensize/viewport size equals device type.

This concept works great in modern browsers, though I wanted to expand on it and fix some issues I noticed when testing it. I decided to use Coyier&#8217;s demo as a starting point for my iteration.

## Squashing bugs

When I tested Emil&#8217;s demo on my phone, a Galaxy S with Android 2.3, I came across an odd bug in my stock browser and some of the other 3rd party browser you can download on Android  The stock browser on my phone supports both pseudo elements and .getComputedStyle, though it wouldn&#8217;t alert the value for the active media query.

I tested on another Android phone running Android 2.2 and noticed the same error that I saw on my phone as well. I haven&#8217;t tested on any other versions of Android, though I&#8217;m curious if this bug happens on versions. I also tested on a friend&#8217;s Galaxy S3 with Android 4.0.4 and the demo worked fine.

With my interest peak about this issue, I got a hold of a Blackberry Curve running OS6. I noticed the same issue with Emil&#8217;s demo as I did on the Android phones running 2.X.

I decided to switch storing the breakpoint value inside of a font-family property. This fixed the bug in Android 2.X and on the Blackberry running OS6, though it introduced another issue.

As <a href="http://adactio.com/journal/5429/" target="_blank">Jeremy noted</a>: *&#8220;It works! …except in Opera. Where every other browser returns whatever string has been provided in the font-family declaration, Opera returns the font that ends up actually getting used (Times New Roman by default).&#8221;*

I was able to get around this by using pseudo elements for Opera, and font-family for all other modern browsers.

## Old IE

Another issue I had was getting this to work in IE 8 and lower. In a perfect world, we could just develop for the latest version of each browser and call it a day. However, most of the sites I work on still see a fair amount of usage from people using IE 8 and lower. Because of this <a href="https://twitter.com/bjankord/status/197126937926311936" target="_blank">I wanted to</a> find a way to get this working in IE 8 and IE 7. This was somewhat of an issue because IE 8 and below don&#8217;t natively support .getComputedStyle. I added a polyfill for .getComputedStyle and was able to get this technique working in IE 8 and IE 7. This comes in handy occasions when I use <a href="https://github.com/scottjehl/Respond" target="_blank">Scott Jehl&#8217;s respond.js</a>.

## A wider cross-browser solution

Emil&#8217;s versions works great in modern browsers, though I really wanted to get this working on wider range of mobile devices as well as IE 8 and IE 7. By making a few changes on to what was already done, I was able get this technique working on a wider range of devices/browsers.

I set up a <a href="http://brettjankord.com/projects/media-query-sync/" target="_blank">demo</a> for people to see how it works when you use respond.js and a <a href="http://brettjankord.com/projects/media-query-sync/index-without-respondjs.html" target="_blank">demo without respond.js</a>.

You can <a title="Active Media Query on github" href="https://github.com/bjankord/Media-Query-Sync" target="_blank">view the code for it on github</a>.

I wanted to keep the code for this small and avoid using jQuery. I&#8217;ve tested in Chrome, Firefox, Opera, Safari, and IE7+ and it seems to work great. I&#8217;ve also tested on some Android 2.2, 2.3, and 4.0 devices, an iPod, iPhone 4S and iPad 3, and a Blackberry Curve and everything worked as expected. There are so many devices out there, it&#8217;s hard to test on all of them, though I&#8217;m pretty happy with the results I&#8217;ve seen so far. If you come across an issue with this, let me know on [github](https://github.com/bjankord/Media-Query-Sync).

 [1]: http://tripleodeon.com/2011/12/first-understand-your-screen/
