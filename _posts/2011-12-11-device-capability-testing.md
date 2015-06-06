---
title: Device Capability Testing
author: Brett
layout: post
comments : true
code_demo: true
permalink: /2011/12/11/device-capability-testing/
dsq_thread_id:
  - 937061094
categories:
  - General
---

<p>Lately, I&#8217;ve been curious how media queries work on different devices. I set up a quick test page to initially test embedded and external media queries and min/max width medias. As I got into developing my test, I decided to also test support for all of the current CSS media types such as; all, screen, handheld, and so on. Also, I set up some tests for all of the current CSS media query features, such as color, orientation, aspect-ratio, etc.</p>

<div class="align-center">
<a href="http://www.flickr.com/photos/gillyberlin/"><img class="size-full wp-image-70" title="6486737463_6b02a5840e_z" src="http://www.brettjankord.com/wp-content/uploads/2011/12/6486737463_6b02a5840e_z.jpg" alt=""/></a>
</div>

<p class="wp-caption-text"><a href="http://www.flickr.com/photos/gillyberlin/">Photo by gillyberlin.</a></p>

<h2>We need more tests!</h2>
<p>I started to feel like I had a pretty good range of data to test for, but decided it would be easy to test for JavaScript support, so I added that in too. This lead me to think about doing some other JavaScript tests. I added some tests for screen size width, html5 script tag support, and decided since I&#8217;m testing for JS, might as well add one of the best feature tests, Modernizr.</p>
<h2>How do you pseudo?</h2>
<p>One thing I&#8217;ve always been curious of is how well pseudo element support is on mobile devices; :before, ::before, :after, ::after. So I set up a test to add text based content with those pseudo elements, and also test to add a .jpg with the pseudo elements.</p>
<h2>False positives and JS media query test ideas.</h2>
<p>It seems modernizr will sometimes return a false postive on touch support, so I added a field to manually enter if the device supports touch. Other manual tests include; physical keyboard, web browser, and device name.</p>
<p>My little test for media queries quickly morphed into a full fledged device capability test.<br />
Originally, I planned to manually enter support for my media query test, but turned to the  <code>matchMedia()</code> function to help ease data collection. Unfortunately, it is not currently supported on a wide range of mobile devices so I sought to figure out another way to automatically collect that data.</p>
<p>My media query tests work be setting all mqs test to display none by default, and then sets them to display:block; if the media query is true. I decided to use JS to test if a element was visable, based on the media query and this proved to be a wider supported alternative to <code>matchMedia()</code>.</p>
<h2>The device capability test.</h2>
<p>So, without any further ado, I present my device capability test -</p>
<p><a href="http://www.fortyfifthdegree.com/test/dct/">http://www.fortyfifthdegree.com/test/dct/</a></p>
<p>Check it out on your phone, tablet, computer or whatever web enabled device you have and submit your tests. Also, be sure to test in portrait and landscape! Some devices I&#8217;d really like to get results for are the Kindle Fire, and original Kindle. I&#8217;m curious how Silk works on the Kindle Fire and if the monochrome mqs feature will work on the original Kindle. Also, I&#8217;m looking for some results from other uncommon web enabled devices, like the Sony PSP, the WII, the Playstation 3, and for some odd reason, Microsoft Kin phones. So do the web a favor, and submit you test results!</p>
<h2>The test results.</h2>
<p>You can also check out the results I&#8217;ve collected so far here:<br />
<a href="http://www.fortyfifthdegree.com/test/dct/dct-results.php" target="_blank">http://www.fortyfifthdegree.com/test/dct/dct-results.php</a></p>
<p>I&#8217;ve currently tested a ton of Android tablets, an iPhone, iPod, iPad, a Logitech Revue, and a ton of other devices, so do check out the results. All the test I&#8217;ve done so far have been done on the stock browser of the device. I&#8217;ve done some testing on my Android phone in some of the other browsers available in the Android Market.<br />
You can view those results here:<br />
<a href="http://www.fortyfifthdegree.com/test/dct/adct-results.php" target="_blank">http://www.fortyfifthdegree.com/test/dct/adct-results.php</a></p>
<p><span class="Apple-style-span" style="font-weight: bold;">Notes about the test and it&#8217;s results.</span></p>
<p><span class="Apple-style-span" style="color: #333333;">All the tests were done with the HTML5 doctype with the meta view port set to:

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
{% endhighlight %}

I&#8217;ve added the maximum-scale=1.0 so I didn&#8217;t have to worry with accidentally zooming and skewing test results. Feel free to view the source if you want to know more about the tests. I need to fine tune some of media feature tests, like resolution, aspect-ratio, so they return a more &#8220;true&#8221; result.</span></p>
<p><em>Due to the massive amount of data collected, I had to do some trickery with the table that displays the results, so it is currently best viewed in Google Chrome. You can view it in Firefox, IE, or other browsers, but the scroll bar on the bottom can be a little difficult to work with.</em></p>
