---
title: 'HRWD &#8211; Hybrid Responsive Web Design'
author: Brett
layout: post
code_demo: true
permalink: /2012/02/29/hrwd-hybrid-responsive-web-design/
dsq_thread_id:
  - 936332068
categories:
  - Categorizr
  - Responsive Web Design
  - RESS
---
As the <a href="http://androidandme.com/2012/02/news/android-posts-250-year-over-year-growth-with-850k-daily-activations/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+androidandme+%28Android+and+Me%29&utm_content=Google+Reader" target="_blank">amount of web capable devices grows</a>, a one size fits all website will no longer suffice. Responsive web design seems to be the most popular solution to achieving device agnostic web design, but there are issues we still need to resolve when creating a responsive website.

Many great minds have dissected and critiqued responsive web design, and it&#8217;s merits as a solution to creating sites for the mobile web. I&#8217;ve tried to compile a general list of issues/concerns people have had about responsive web design. As we continue to experiment and find ways to adapt to the growing landscape of the web, it&#8217;s important to communicate with one another and review our processes and techniques. What is true today, may change tomorrow.

## Issue with Responsive Web Design

[<img class="aligncenter size-full wp-image-422" title="fools-gold" src="http://www.brettjankord.com/wp-content/uploads/2011/12/fools-gold.jpg" alt="" />][1]

Back in in August 2010, Jason Grigsby published an article, <a href="http://www.cloudfour.com/css-media-query-for-mobile-is-fools-gold/" target="_blank">CSS Media Query for Mobile is Fool&#8217;s Gold</a>.

Some of the main points from the article are:

*   **Media queries add more code to create the &#8220;mobile&#8221; version of the site**
*   ****Media queries i**gnore the mobile context**
*   ****Media queries d**o not optimize HTML or JavaScript**

<div>
  Jason also brought up many good points about images:
</div>

<div>
</div>

<div>
  <ul>
    <li>
      <strong>How letting the browser scale images is a bad idea</strong>
    </li>
    <li>
      <strong>Full size images = unnecessarily large files to download</strong>
    </li>
    <li>
      <strong>Using media queries to deliver different images doesn&#8217;t work</strong>
    </li>
  </ul>
</div>

Jason concludes that he believes responsive design still rocks, though it&#8217;s important to understand that media queries are not a silver bullet when creating a mobile site.

James Pearce, another expert in the realm of mobile replied to this article,

&#8220;*+1 for context… the most important point. If there’s a media query that will turn an airline’s desktop site (flight booking, credit card promotions, photos of reclining seats, chairman’s statements etc) into its corresponding mobile site (flight time checker, on-line check-in, QR-code boarding pass etc), then I would love to see it.*&#8221;

James later wrote another article about issues related to responsive web design titled, <a title="Permanent Link to Not a mobile web, merely a 320px-wide one" href="http://tripleodeon.com/2010/10/not-a-mobile-web-merely-a-320px-wide-one/" rel="bookmark">Not a mobile web, merely a 320px-wide one</a> in which he discusses issues with responsive web design.

[<img class="aligncenter size-full wp-image-423" title="merely-320" src="http://www.brettjankord.com/wp-content/uploads/2011/12/merely-320.jpg" alt="" />][2]

*   **Media queries only affect the styling once the markup and other resources have reached the browser**
*   **Media queries are not supported by most of the world’s web browsers.**

The main issue James gets into is how responsive web design, as it&#8217;s currently being done, is **not suitable to handle context**. It also does little to handle **performance optimization**. James goes on to say that &#8220;*&#8230;it’s quite likely that they [the mobile user] really deserve different content and services altogether – or, at least, a differently prioritized version of the default desktop experience.*&#8221;

While it&#8217;s true, mobile users *may* want different content or services altogether. <a href="http://blog.comscore.com/2011/11/the_rise_of_digital_omnivores.html" target="_blank">Studies</a> have also shown that users love content, no matter what device they are on. To help determine if a separate mobile site is necessary, one should <a href="http://globalmoxie.com/blog/mobile-context-stats.shtml" target="_blank">research</a> their user base. Look at your site statistics and analytics. This will give you the information you need to decided if you can offer a differently prioritized version of your desktop site, or if you need to create a custom experience tailored specially for individual user groups, be it a native app or web app. Though if you do decide to go with separate mobile site, I believe the concepts from responsive web design; fluid grids, fluid images, and media queries will still be beneficial to your separate mobile site/web app.

### A word on context

Context is a funny thing, and everyone has their opinion on what the mobile web is, and thus, what <a href="http://adactio.com/journal/4443/" target="_blank">mobile context</a> is. One of this best articles I&#8217;ve come across on this topic is by Jason Rhodes entitled, <a href="http://jasonthings.com/2011/03/626/" target="_blank">More Responsive Design, Please</a>.

Stephanie Rieger also has some great thoughts on mobile context. <a href="http://www.slideshare.net/yiibu/the-trouble-with-context" target="_blank">The Trouble With Context</a> and <a href="http://stephanierieger.com/mobile-users-dont-do-that/" target="_blank">Mobile User Don&#8217;t Do That</a>

Almost a year later after Grigsby published his article regarding concerns with media queries, there was another article published on Web Design Shock about issues with responsive web design titled, [11 Reasons Why Responsive Design Isn&#8217;t That Cool!](http://www.webdesignshock.com/responsive-design-problems/)

Form these three articles we can see there are some common issues people have with how responsive web design has been done so far.

<div>
  <ul>
    <li>
      <strong>Media queries ignore the mobile context</strong>
    </li>
    <li>
      <strong>Media queries add more code to create the &#8220;mobile&#8221; version of the site</strong>
    </li>
    <li>
      <strong>CSS media query is a bad choice for multiple devices</strong>
    </li>
    <li>
      <strong>Media queries do not optimize HTML or JavaScript or remove unnecessary code</strong>
    </li>
    <li>
      <strong>Mobile needs are different from desktop needs</strong>
    </li>
    <li>
      <strong>Issues with handling images on varying devices</strong>
    </li>
  </ul>
</div>

<div>
</div>

## It&#8217;s time we to try and solve these issues

I agree with points raised. I believe each new technique that comes out needs to be reviewed and critiqued. This is how we move the web forward. Along with offering critique and reviewing our processes, we need to seek solutions.

[<img class="aligncenter size-full wp-image-427" title="puzzle2" src="http://www.brettjankord.com/wp-content/uploads/2011/12/puzzle2.jpg" alt="" />][3]

### The first part of the puzzle is solved by thinking Mobile First

<div>
  If you have not picked up Luke Wroblewski&#8217;s book, <a href="http://www.lukew.com/resources/mobile_first.asp" target="_blank">Mobile First</a>, I highly recommend it. Going <a href="http://www.lukew.com/ff/entry.asp?933" target="_blank">mobile first</a> with our responsive websites allows us to solve some of the issues people have raised about responsive web design.
</div>

<div>
</div>

<div>
  <ul>
    <li>
      <strong>Media queries ignore the mobile context<br /> </strong>By starting a project with a mobile first mindset, we are now focusing on mobile from the beginning, thus acknowledging mobile context and the needs of mobile users. This also allows us new potential for interactions between us and our users, based on new capabilities. It also helps us prepare for the growing market of varying mobile devices.
    </li>
  </ul>

  <ul>
    <li>
      <strong>Media queries add more code to create the &#8220;mobile&#8221; version of the site<br /> </strong>By building our site for mobile devices first, we can progressively enhance our base version of the site by conditionally loading in assets/resources for other more capable devices as opposed to trying to scale down our desktop sites to be more suitable for mobiles. This type of thinking is tricky though, and requires us to really re-examine a lot of our common practices that we have become accustom to. I believe the many benefits of going mobile first out weigh the trouble involved in <a href="http://www.slideshare.net/bryanrieger/rethinking-the-mobile-web-by-yiibu" target="_blank">rethinking the mobile web</a>.
    </li>
  </ul>

  <ul>
    <li>
      <strong>CSS media queries are a bad choice for multiple devices<br /> </strong>This issue stems from the idea of starting with a desktop site and using media queries to scale down to a mobile layout. This results in mobile devices that <a href="http://www.quirksmode.org/m/css.html#t021" target="_blank">don&#8217;t support</a> <a href="http://caniuse.com/#search=media queries" target="_blank">media queries</a> getting the desktop styles. Though by going mobile first with our media queries, we can easily create styles for devices that don&#8217;t understand media queries, and then use media queries to progressively enhance our layout.
    </li>
  </ul>
</div>

<div>
  Bryan Rieger, puts this nicely,<br /> &#8220;<em>The absence of a media query is in fact, the ﬁrst media query</em>&#8220;.<br /> -Rethinking the Mobile Web
</div>

<div>
</div>

<div>
</div>

### The second part of the puzzle is Adaptation

[<img class="aligncenter size-full wp-image-428" title="be-like-water" src="http://www.brettjankord.com/wp-content/uploads/2011/12/be-like-water.jpg" alt="" />][4]

<div>
  When it comes to adaptation, Bryan and Stephanie Rieger are leading the charge on what works and what doesn&#8217;t. I would highly reccomend looking through Stephanie&#8217;s slides on <a href="http://www.slideshare.net/yiibu/pragmatic-responsive-design" target="_blank">Pragmatic Responsive Design</a> and Bryan&#8217;s slides on <a href="http://www.slideshare.net/yiibu/adaptation-why-responsive-design-actually-begins-on-the-server">Adaptation: Why Responsive Design Actually Begins On The Server<br /> </a>
</div>

<div>
</div>

<div>
  <strong>Server side adaptation allows us:</strong>
</div>

*   **Optimize the pay-load from the server to the user, for example, add or remove markup / scripts / styles for different device groups**
*   **The ability to alternate content appropriate for context**

<div>
  <strong>Client side adaptation allows us:</strong>
</div>

<div>
</div>

<div>
  <ul>
    <li>
      <strong>Ability to test for capabilities &#8211; Feature Detection &#8211; Modernizr</strong>
    </li>
    <li>
      <strong>Ability to modify the layout as screen real estate increases - Media Queries &#8211; Responsive Web Design &#8211; JavaScript solutions</strong>
    </li>
  </ul>

  <h2>
    What tool do we use for server side adaptation?
  </h2>

  <div>
    In Riegers&#8217; slides, they suggest using a device database to handle the server side logic for websites adaptation. <a href="http://deviceatlas.com/" target="_blank">Device Atlas</a>, and <a href="http://wurfl.sourceforge.net/" target="_blank">WURFL</a> are great resources as well as <a href="http://www.handsetdetection.com/" target="_blank">Handset Detection</a>. However, each of these options come with a price, literally. If you go with the cloud version of Device Atlas, it&#8217;s <a href="http://deviceatlas.com/cart/add/2483428" target="_blank">$399/year</a> per website or <a href="http://deviceatlas.com/cart/add/2483430" target="_blank">$3,990/year</a> for 50 websites. Their enterprise prices are not listed, I don&#8217;t even want to know what those cost. WURFL has recently updated their licensing terms. If you plan to use WURFL on a commercial project, you need to buy a license. Handset Detection seems to be the most reasonably <a style="color: #000000;" href="https://www.handsetdetection.com/pricing" target="_blank">priced solution</a> at $13/month for 100,000 detections. They also have a free option with 10,000 detections per month.
  </div>

  <div>
  </div>

  <div>
  </div>

  <h3>
    What other options do we have?
  </h3>

  <p>
    <a href="http://www.brettjankord.com/wp-content/uploads/2012/01/categorizr.jpg"><img class="aligncenter size-full wp-image-110" title="categorizr" src="http://www.brettjankord.com/wp-content/uploads/2012/01/categorizr.jpg" alt="Categorizr - A modern device detection script" /></a>
  </p>
</div>

**Categorizr** is modern device detection script I wrote to help handle simple device profiling. You can read more about [Categorizr here](https://github.com/bjankord/Categorizr). The concept is that by basing device detection on the idea of mobile first, detection not only becomes easier, it&#8217;s also more accurate. If your curious how **Categorizr** handles user agents, you can <a href="http://brettjankord.com/categorizr/categorizr-results.php" target="_blank">view test results here</a> from over 11,000 user agents, most of them are from the WURFL database or <a href="http://brettjankord.com/categorizr/ua-check.php" target="_blank">check your own device</a> and see what category it falls into.

## So now we have all the tools, what is hybrid responsive web design?

Hybrid responsive web design is not a <a href="http://blog.mozilla.com/webdev/2011/06/27/approaches-to-mobile-web-development-part-4-%E2%80%93-a-hybrid-approach/" target="_blank">new concept</a>, and there is more than one way someone could create a hybrid responsive website. Though the general idea behind HRWD is that it pairs the concepts of responsive web design with the concepts of server side device detection. It builds on top of the concepts we know are true for responsive web design, and adds concepts from traditional mobile device detection.

After looking through Riegers&#8217; slides from last year&#8217;s Breaking Development conference and reading Luke Wroblewski&#8217;s post, <a href="http://www.lukew.com/ff/entry.asp?1392" target="_blank">RESS: Responsive Design + Server Side Components</a>, I really started to get interested in experimenting with this concept. <a href="http://yiibu.com/" target="_blank">Yiibu.com</a> and <a href="http://filamentgroup.com/" target="_blank">The Filament Group&#8217;s</a> website are two sites that also really got me thinking in this direction. The first step required an accurate way to handle device detection. The way device detection has traditionally been done was flawed in my mind, as it was not very future friendly, though this is the nature of the beast when you get into user agent sniffing. I wanted to find a solution that would be free for anyone who wanted to use it, and would provide accurate results and this is what led me to develop [Categorizr](https://github.com/bjankord/Categorizr). With** Categorizr**, you can group devices into specific categories and handle various adaptations from one device group to another on the server. I&#8217;ve found though, that mobile devices are where most of the server-side adaptation is needed. Adaptation for tablets and smartTVs can mainly be based on the desktop version and handled client side.

## Issues HRWD solves

*   **********Media queries d****o not optimize HTML or JavaScript or **remove unnecessary code  
    ****This is a problem many people have had with responsive web design. Media queries are a client side technology based for styling, thus they cannot remove unnecessary code, optimize HTML or JavaScript. To do this, we need to do it on the server side. With **Categorizr**, you can detect what type of device the user is on, and give them only the markup / scripts / styles they need.****

*   **********Mobile needs are different from desktop needs  
    ******To quote **James Pearce** again, &#8220;*&#8230;it’s quite likely that they [the mobile user] really deserve &#8230; a differently prioritized version of the default desktop experience.**&#8221; *We can use **Categorizr **to dectect the type of device the user is on, be it mobile, tablet, desktop, or smartTV. From there we can handle priority changes on the server, whether that means shifting around markup, or loading different content/resources altogher, before sending it down to the user.****

*   **Issues with handling images on varying devices  
    **This is something I would not recommend using **Categorizr** for. While it does a great job of figuring out what type of device your on, it won&#8217;t get you specifics. Since there is a lot of variety in mobile screen sizes, I would recommend looking at <a href="http://www.sencha.com/learn/how-to-use-src-sencha-io/" target="_blank">Sencha.io Src</a> or <a href="http://adaptive-images.com/" target="_blank">Adaptive Images</a>. Currently there is <a href="http://www.w3.org/community/respimg/" target="_blank">discussion going on</a> about creating a new HTML element to handle images for varying devices based on media query logic.

*   **More code, more to update  
    **I honestly don&#8217;t understand the reasoning behind this issue. To me, you either don&#8217;t do anything and stick with your desktop websites, blissfully ignorant to the changing market, or you adapt. Hybrid responsive web design with **Categorizr** is actually fairly simple. If you want to support multiple devices, there is going to be more code. Though I&#8217;ll explain how we can support a wide array of devices, while still maintaining a code-base that is easy to manage and update.

<div>
  <h2>
    Issues that still need to be solved.
  </h2>

  <p>
    <a href="http://www.brettjankord.com/wp-content/uploads/2011/12/puzzle3.jpg"><img class="aligncenter size-full wp-image-429" title="puzzle3" src="http://www.brettjankord.com/wp-content/uploads/2011/12/puzzle3.jpg" alt="" /></a>
  </p>

  <p>
    Hybrid Responsive Web Design does not solve all the issues. There are still many issues we will need to tackle as the web evolves on to more devices. We are all in this together, and for us to move forward, we need to review our processes, offer critique, and help push each other to find solutions. I&#8217;m hope you&#8217;ll offer your feedback and critique on this approach so we can continue to move the web forward.
  </p>

  <p>
    One of the biggest issues that still remains relates to content management systems. Our craft is evolving, we need the tools we use to evolve also. Though, this a topic I&#8217;ll save to tackle another day.
  </p>
</div>

## Mobile First HRWD Development

So, you&#8217;ve read this far. Take a break, relax, I know that was a lot to digest. I&#8217;m planning on writing up a more detailed walkthrough of mobile first HRWD development and was considering leaving this concept for another post, though while I have your attention, I figured I&#8217;d breifly cover some concepts of a mobile first hybrid responsive web design development. Try saying that ten times fast.

First, we&#8217;ll be starting our project with a mobile first mindset. As I&#8217;ve mentioned, this helps solve a lot of issues when creating a responsive site. There are 4 areas I want to quickly go over; the Sever-Side Component, how to handle HTML, how to handle  CSS, how to handle JavaSript, and how to handle images.

### Server-Side Component

In this example I&#8217;ll be explaining how to use **Categorizr** to handle our server side adaptation. **Catgorizr** is PHP based and fairly easy to use, even if you have no programming knowledge. To alter various parts of your site, be it your CSS, JavaScript, page components, or other markup, all you need is a simple PHP **if statement**.

{% highlight php %}
<?php if (mobile()) { ?>
<h1>This heading will only show up if the device is categorized as mobile device</h1>
<?php } ?>
<?php if (!desktop()) { ?>
<h1>This heading will only show up if the device is not categorized as desktop device</h1>
<?php } ?>
{% endhighlight %}

With this, we can keep all of our markup for each device category together in one file. This makes maintenance of a hybrid responsive website rather easy. This works great if your mobile site will be similar to your desktop site and you just want to re-prioritize your mobile site. However, if your mobile site is going to be quite a bit different than your desktop site, I would suggest using **Categorizr Redirect **and creating a separate mobile site.

### HTML

The HTML you craft will vary from project to project. Sketching and prototyping will be your best friends as you move back and forth between design and development. For tablets and smartTVs, I would suggest using the same HTML markup as your desktop site and letting media queries handle layout changes. If you need to add specific CSS, JavaScript, or other elements solely to your tablet or smartTV version of your page, you can simply write an if statement.

{% highlight php %}
<?php if (tablet()) { ?>
<h1>This heading will only show up if the device is categorized as tablet device</h1>
<?php } ?>
{% endhighlight %}

Be sure to be considerate of users who want to change what there device is categorized as. Add a link to your page so if users are on your mobile site, and want to view the desktop version, they can. To do this with **Categorizr**, all you need to do is create an anchor link and set the href value to a PHP GET variable with **view** set to what you want it to be. Below is an example of a link you would add to your mobile site to switch users to being categorized as a desktop.

<pre class="brush: html; gutter: true; first-line: 1"><a href="?view=desktop">View Desktop Site</a></pre>

When a user clicks on this link, it will reload the page, then **Categorizr** will pick up that the user now wants to be categorized as a desktop device. **Categorizr** stores this in a session so the user can move from page to page and still be recognized as a desktop device.

### CSS

With CSS, we&#8217;ll first create styles for basic devices such as feature phones, legacy phones, and other devices that do not understand media queries. In this file I usually add my HTML reset, basic formatting for typography, link styles, and any other basic styles needed for these devices. I&#8217;ll usually name this stylesheet **base.css** though you can name it however you please.

Next, we&#8217;ll create a stylesheet for mobile devices. I name this file **mobile-styles.css**. In this file, we&#8217;ll set up our media queries for mobile devices. These will cascade off of the styles set in the **base.css** file.

Lastly, we&#8217;ll create another stylesheet that will handle our layouts for tablets, desktops, and smartTVs. I typically name this file **main-styles.css**. Again, this stylesheet will cascade off **base.css**, as well as **mobile-styles.css**

In development, I like to keep the files separate, though on your production site, I would concatenate them into one file. Then conditionally load them based on what device category comes to your site.

**If mobile, load mobile.css.  
*mobile.css = base.css + mobile-styles.css ***  
Use this for feature phones / smartphones / and other mobile devices.

**If not mobile, load main.css  
*main.css = base.css + mobile-styles.css + main-styles.css***  
Use this for tablets / desktops / smartTVs

By concatenating the stylesheets, you&#8217;ll only serve 1 CSS file which will help keep your website fast.

### JavaScript

The JavaScript you use on your site will vary from site to site, however one file I would encourage you to include on your sites is <a href="http://www.modernizr.com/" target="_blank">Modernizr</a>. Categorizr is great at what it does, though it only gets us some of the information we typically want to know. By pairing Categorizr with Modernizr, you can accurately detect device types, and their capabilities.

Just as we did with the stylesheets, I would recommend concatenating your JavaScript where applicapable. The <a href="http://html5boilerplate.com/" target="_blank">HTML5 Boiler Plate</a> has a good example of file strutures for JS.

### Images

As I mentioned earlier, I would recommend using <a href="http://www.sencha.com/learn/how-to-use-src-sencha-io/" target="_blank">Sencha.io Src</a> or <a href="http://adaptive-images.com/" target="_blank">Adaptive Images</a> as a solution to providing images for varying devices.These are the best solutions I&#8217;ve seen so far for creating responsive images. Matt Wilcox, the developer behind Adaptive Images and Jason Grigsby are both members of the W3C Responsive Images Community Group. I&#8217;m excited to see what solution this community group comes up with as a native way to handle responsive images.

### Other Components

There are many other components one could add to a HRWD development, such as appropriately caching files, gzipping files, using HTML5 AppCache, minifying files along with many other techniques. This is a topic I&#8217;ll go into more detail another day.

## Is this the silver bullet we&#8217;ve been waiting for?

[<img class="aligncenter size-full wp-image-430" title="silver-bullet" src="http://www.brettjankord.com/wp-content/uploads/2011/12/silver-bullet.jpg" alt="" />][5]

Nope. It&#8217;s <a href="http://www.lukew.com/ff/entry.asp?1509" target="_blank">one possible technique</a> you can add to your toolbox. Hybrid responsive web design does not aim to create solutions for the mobile web, the desktop web, the tablet web, the smartTV web. It aims to create solutions for the responsive web. Each project should be evaluated to see which techniques will be the most benefical, not only to your clients, but also to their users.

 [1]: http://www.brettjankord.com/wp-content/uploads/2011/12/fools-gold.jpg
 [2]: http://www.brettjankord.com/wp-content/uploads/2011/12/merely-320.jpg
 [3]: http://www.brettjankord.com/wp-content/uploads/2011/12/puzzle2.jpg
 [4]: http://www.brettjankord.com/wp-content/uploads/2011/12/be-like-water.jpg
 [5]: http://www.brettjankord.com/wp-content/uploads/2011/12/silver-bullet.jpg
