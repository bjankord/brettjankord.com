---
title: "Active development on Categorizr has come to an end"
date: "2013-01-10"
tags: ["Categorizr"]
permalink: /2013/01/10/active-development-on-categorizr-has-come-to-an-end/
---

It's time to officially bring active development of Categorizr to a close. It's always difficult to bring a personal project to a close. This was my first big personal project, so it is bittersweet to see this go.

It was fun to see the project take off, I remember getting a tweet from Paul Irish asking me to add a link to Categorizr in the Modernizr Wiki. It was fun to see Categorizr make it in to a list of 50 fantastic responsive web design tools on [.net Magazine][1], and see [Ethan Marcotte][2] mention my project as well other people I look up to like [Jeffery Zeldman][3], [Jeremy Keith][4], and [Brad Frost][5]. Jason Grigsby introduced me to Crystal Beasley and Lawrence Mandel to offer my thoughts on the user agent for Firefox's new OS to make sure it would be easily detectable. It was a great experience.

I learned a lot while working on the project. To name just a few of the things, I learned a better understanding of PHP, a better understanding of how CDNs work, how to license code and what licensing options there are. Nearly a year ago, I took the plunge and learned how to use github and set up a project specifically so I could put [Categorizr][6] on it.

I worked with a great developer and friend on this project, [Josh Eisma][7]. He helped a lot with code review and we had even built out an API to launch a month after Categorizr was released on github, though there was something that held me back from ever pushing that update live. My view of the web.

## Reasoning behind it all

As I was collecting user agents and testing data I came across the some [user agents from a Windows 8 dev device running Metro][8]. One interesting thing with Windows 8 is that Microsoft decided to base the OS off of its [desktop kernel][10]. What this meant was that the user agent for Windows 8 tablets, desktops, and possible phones would all show that they are based on the desktop kernel.

Red lights went off immediately in my mind, because detecting desktop operating systems was one of the methods I used in Categorizr. I assumed there wouldn't be any new desktop operating system that would go against the standards we had seen for the last ten years and that the `Windows NT` string would only show up in actual &#8220;desktop&#8221; user agents.

Before Windows 8, you could [determine the difference][11] between a Windows PC and and Windows tablet by looking for `Tablet PC` in the user agent string.

Though when I looked at they user agents Paulo Morgado collected from IE10, running on Windows 8 on his dev device, I noticed their was no **reliable** way to differentiate the user agent between Metro and Classic Desktop mode.

User agent from Internet Explorer 10, running in the Metro UI:

```sh
`Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)`
```

User agent from Internet Explorer 10, running in the Classic Desktop UI:

```sh
`Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)`
```

This was the first instance I started to see the lines between tablet and desktop blur, then I started seeing screen shots of the tablet paired with a keyboard and it really opened my eyes. I [blogged][12] about it back in February last year.

So I decided to hold off on promoting Categorizr any more as I wanted to see if Microsoft would change the UAs, possibly adding Tablet PC to their Windows 8 tablets when they actually released their device.

Here are the user agents from the new Microsoft Surface.

User agent from Internet Explorer 10, running in the Metro UI on Microsoft Surface:

```sh
`Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; ARM; Trident/6.0; Touch)`
```

User agent from Internet Explorer 10, running in the Classic Desktop UI on Microsoft Surface:

```sh
`Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; ARM; Trident/6.0; Touch)`
```

Microsoft actually uses the same user agent when for the Surface when it is in Metro UI mode as when it is in Desktop UI mode.

**They want the device to be recognized as a &#8220;desktop&#8221;**

I don't think this is necessarily bad either. This matches up with [Google's tips for optimizing websites for tablets][13]

## Other concerns

As I mentioned, Categorizr/device detection in general no longer lines up with my view of the web.

What I mean by this is that I longer see using user agent sniffing to group devices into set categories as a viable solution for creating web experiences across the wide array of web capable devices. There is a consensual hallucination in the market, that we can silo devices into set categories like mobile, tablet, and desktop, yet the reality is drawing these lines in the sand is not an easy task.

Sure, I can pick up a phone and tell the difference from a tablet. Likewise, I know the difference between my desktop computer at work and a tablet, though those lines we use to differentiate device groups are quickly fading away. Luke Wroblewski has an excellent graphic that shows how capabilities we saw associate with certain sets of devices is crossing over into all devices.

<!--
![Unified device design][14]
-->

Thinking back to what originally motivated me to develop Categorizr, I wanted a [RESS solution][15] to help conditionally load resources/assets/content. A nice side effect of Categorizr was that it also worked great as redirect solution.

Yet as more time went on, I begin to realize that user agents offer very little of the actual information we would want to know to conditionally load resources. There are device databases that collect this data, though being reliant on services like WURFL or DeviceAtlas is blessing and a curse. It takes the onus off of you to test devices and make sure the device detection is accurate, though at the same time, you are at the mercy of those who own the database/service. You have to hope they **have** tested the new devices and have the features of those new devices in the database when they are released.

I would much rather rely on client-side feature detection. I feel it is more accurate and easier to correct false positives, and works better with new devices with easier testing. The standards for browser features are stronger than the standards for user agents. We know that all future versions of browsers **should** support the same features the previous version supported. This is not always the case with user agents. User agent strings that had set strings in them that we could rely on to detect the device are not always in future versions, a la Windows 8.

## Moving on

While I see little reason to use device detection in my workflow, I know there are intances where a separate mobile site is preferred. I've decided to take the knowledge I've learned from working on Categorizr and create a simpler, smaller device detection script called [isMobile][16].

It will come in two flavors: a mobile first detection of mobile devices, and a desktop first detection of mobile devices.

And so, its sad, for me, to see the project go, but I'm also glad to move on from this, into a more [future friendly][17] workflow and mindset. About a year ago I had this crazy idea to apply mobile first thinking to device detection. Yet I've awakened from the consensual hallucination that the web can be divided and grouped into simple categories like mobile, tablet, and desktop since then. Thanks to everyone that supported this project, it was truly a great learning experience for me.

In my next post I plan to talk more about this consensual hallucination and my new workflow.

 [1]: http://www.netmagazine.com/features/50-fantastic-tools-responsive-web-design
 [2]: http://www.netmagazine.com/interviews/ethan-marcotte-answers-your-responsive-web-design-questions
 [3]: https://twitter.com/zeldman/status/166660028055556096
 [4]: http://adactio.com/journal/5194/
 [5]: https://twitter.com/brad_frost/status/192289889939767296
 [6]: https://github.com/bjankord/Categorizr
 [7]: https://twitter.com/jaeisma
 [8]: http://social.msdn.microsoft.com/Forums/en-US/6be392da-4d2f-41b4-8354-8dcee20c85cd/internet-explorer-10-user-agent-strings-on-windows-8-64bit?forum=windowsdeveloperpreviewgeneral
 [9]: http://www.windowsfordevices.com/c/a/News/Reports-Windows-Phone-8-will-switch-to-desktop-kernel/
 [10]: http://arstechnica.com/information-technology/2012/02/leaked-windows-phone-8-vid-windows-8-kernel-and-integration-multiple-cores/
 [11]: http://msdn.microsoft.com/en-us/library/windows/desktop/ms700675%28v=vs.85%29.aspx
 [12]: http://www.brettjankord.com/2012/02/22/thoughts-on-windows-8-device-detection/
 [13]: http://googlewebmastercentral.blogspot.com/2012/11/giving-tablet-users-full-sized-web.html
 [14]: http://static.lukew.com/unified_device_design.png
 [15]: http://www.lukew.com/ff/entry.asp?1392
 [16]: https://github.com/bjankord/isMobile
 [17]: http://futurefriend.ly/
