---
date: '2011-01-18'
title: 'RWD toolset'
permalink: /2012/01/18/rwd-toolset/
tags: ['rwd']
---

**RWD Toolset** is a small JavaScript file paired with a style sheet I threw together to help when developing responsive sites. It adds a form to the bottom of your site to calculate relative dimensions, either in percentages or EMs. It also displays the current window width to help in figuring out where your layout breaks so you know where you need to add your media queries.

While it's easy enough to open up your calculator app and do the math there, **RWD Toolset** adds a form to the page that you're developing, where you can enter the target size and context size and then get the results based either in percentages or EMs. The form uses Ethan Marcotte's [formula](https://alistapart.com/article/fluidgrids) for calculating relative based widths: **Target Size / Context Size = Result.**  I found that being able to do this math right on the page, in addition to being able to see what my current window size is, helps decrease the time needed when developing a responsive site.

Another task I find myself often doing when building responsive sites is checking where my layout breaks, to determine where I need to add my media query for my breakpoints. [Brent Simmons](http://inessential.com/2012/01/13/things_i_learned_doing_responsive_web_de) explains this concept nicely.

> When I first started, I created two breakpoints (where the layout changes): one for iPad-sized screens and one for phone-sized screens. It seemed logical. Later on I figured out a better way: create breakpoints when the layout breaks. I just shrank the width of my browser window until the design broke in some way, then I dealt with it, either by changing things or by creating a breakpoint and changing the layout at that point. This made more sense because I was working with the design rather than thinking about specific devices.

Using this method when developing a responsive design, it frees the design from being bound to certain devices. To figure out the exact width a layout breaks, I threw together a few more lines of JavaScript to output the current window width. Now I can see exactly at what width my layout breaks and use that to create my media queries.

I've combined these two scripts together into what I'm calling the **RWD Toolset**. Since I've just thrown these two scripts together for development purposes, I'm sure there are ways to improve the code, though it accomplishes what I need it to do. If you have improvements, feel free to let me know in the comments below.

## How to use RWD Toolset:

Download the JavaScript file and the CSS file and add them to your site.
**RWD Toolset** requires jQuery so make sure you have that included on your site too.

```html
<link rel="stylesheet" href="css/rwd-toolset.css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="js/rwd-toolset.js"></script>
```

Once the files are in place you, should now have the **RWD Toolset** toolbar on the bottom of your page.

My idea in building the **RWD Toolset** was to use it as a tool to help me in the development stage when working a responsive site. **RWD Toolset** has been tested in Chrome, Firefox, and IE9. Hopefully this will help speed up your development time when working on your own responsive sites.

<!--
* [View RWD Toolset Demo](http://brettjankord.com/projects/rwd-toolset/)
* [Download RWD Toolset](http://brettjankord.com/projects/rwd-toolset/rwd-toolset.zip)
-->
