---
title: Thoughts on Windows 8 device detection
author: Brett
layout: post
comments : true
permalink: /2012/02/22/thoughts-on-windows-8-device-detection/
dsq_thread_id:
  - 936332847
categories:
  - Categorizr
  - Device Detection
---
Back at the start of February, [news came][2] [out][3] that Windows Phone 8 will based on the same Windows NT core that Microsoft will use on their Windows 8 desktops. Without having any Windows 8 devices to test, I can only make some general assumptions, though I’m going to guess that Microsoft will now likely include Windows NT in the user agent string on their portfolio of Windows 8 devices be it, mobile phones, tablets, or desktops.

<h2 dir="ltr">
  What does this mean for user agent based device detection?
</h2>

**Categorizr** works more or less by detecting the OS of the device rather than the browser in most cases. One of the primary checks in **Categorizr** is to look for Windows NT in the user agent string. This has been a great way to detect Windows based desktop devices, though there are small handful of Windows Phone 6.5 devices that also include Windows NT in the user agent. In these few Windows Phone 6.5 user agents, the word **Mobile** is also included, so it’s easy to catch these and categorize them correctly as mobile phones.

Since Windows Phone 6.5, Microsoft has included “**Windows Phone**” in the user agent.

User agent from HTC Radar 4G:
**Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; HTC; Radar 4G)**

User agent from Samsung Omnia 7
**Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; SAMSUNG; GT-i8700)**

User agent from HTC HD2
**Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; HTC\_HD2\_T8585; Windows Phone 6.5)**

Based on this information, I’m going to guess that even if Microsoft includes a variation of Windows NT in the user agent on their new Windows 8 Phones, as long as they continue with the pattern of including “Windows Phone” in the string too, it should be possible to differentiate between Windows 8 mobile phones, and Windows 8 desktops. Differentiating between Windows 8 tablets and Windows 8 desktops get a bit more interesting.

<h2 dir="ltr">
  Where is the line between Windows 8 tablets and Windows 8 desktops?
</h2>

As Microsoft continues to move towards merging the traditional desktop experience and the tablet experience with Windows 8, I’m curious if they will offer a way to differentiate between the two types of devices via the user agent string, similar to what they&#8217;ve done with other Windows tablet PCs?

<p style="text-align: center;">
  <strong>Windows 8 Tablet</strong>
</p>

<p style="text-align: center;">
  <a href="http://www.brettjankord.com/wp-content/uploads/2012/02/windows-8-tablet.jpg"><img class=" wp-image-294 aligncenter responsive-img" title="windows-8-tablet" src="http://www.brettjankord.com/wp-content/uploads/2012/02/windows-8-tablet.jpg" alt="Windows 8 Tablet" /></a>
</p>

<p style="text-align: center;">
  <strong>Add a keyboard, dock, and the fact that the user will now be stationary and this device falls more inline with what we consider desktops.</strong>
</p>

<p style="text-align: center;">
  <a href="http://www.brettjankord.com/wp-content/uploads/2012/02/tablet-desktop.jpg"><img class=" wp-image-295   aligncenter  responsive-img" title="tablet-desktop" src="http://www.brettjankord.com/wp-content/uploads/2012/02/tablet-desktop.jpg" alt="Windows 8 tablet with keyboard and dock" /></a>
</p>

As you can see, the line between desktops and tablets is growing smaller, just as the line between mobile phones and tablets is growing smaller with the release of the the <a href="http://androidandme.com/2012/01/devices/hands-on-with-the-att-samsung-galaxy-note/" target="_blank">Samsung Galaxy Note</a>, the upcoming <a title="View details on LG Optimus Vu" href="http://www.androidcentral.com/lg-optimus-vu" target="_blank">LG Optimus Vu</a>. What this means is that the ability to determine what category a device falls into based solely in its size will be less accurate. Thus, it&#8217;s important to have manufactures add device category keywords to their user agent strings so we can continue to categorize devices correctly to handle various contexts.

Microsoft is no stranger to this concept and is aware that developers like to differentiate between the tablets and desktops. Here’s a small quote from an article on Microsoft&#8217;s Dev Center website regarding how to [Determing Wheter a PC is a Tablet PC.][4]

> In Windows Vista, the user-agent string reported by Internet Explorer includes &#8220;Tablet PC 2.0&#8243; if, according to GetSystemMetrics(SM_TABLETPC), the device is a Tablet PC.
> In Windows XP Tablet PC Edition 2005, the user-agent string includes Tablet PC 1.7. The user-agent string looks something like the following:
> **Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.0.3705; Tablet PC 2.0)**

<h2 dir="ltr">
  Metro in the wild
</h2>

I’ve come across some [user agents Paulo Morgado collected][5] from IE10, which runs on Windows 8.

User agent from Internet Explorer 10, running in the Metro UI:
**Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)**

User agent from Internet Explorer 10, running in the Classic Desktop UI:
**Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)**

I’m not sure if Paulo was on a desktop, or tablet when he got these, though one thing Paulo notes is that Metro Internet Explorer is always a 64bit application on 64bit Windows 8 based on the user agents he’s found so far. I’d much rather check for the words Tablet PC or even Metro in the user agent string when Windows 8 is in Metro mode than Win64 and x64.

It is important to note that the above IE10 user agents are from dev builds, so there is a chance that when Microsoft starts selling Windows 8 devices, that may make changes to the user agents above.

<h2 dir="ltr">
  Final Thoughts
</h2>

On my sites, the tablet version of the site is based on the desktop version and most of the adaptation for tablets happens on the client side. Though it is nice to be able to differentiate between the two device categories on the server if need be. My hopes is that Microsoft continues provide ways for web developers to differentiate between tablets and PCs through keywords in user agent. Though we will just have to wait until Windows 8 is released to know for sure.

All in all, I look forward to seeing what Microsoft does with Windows 8 and the Metro UI.

 [1]: http://www.windowsfordevices.com/c/a/News/Reports-Windows-Phone-8-will-switch-to-desktop-kernel/
 [2]: http://arstechnica.com/microsoft/news/2012/02/leaked-windows-phone-8-vid-windows-8-kernel-and-integration-multiple-cores.ars
 [3]: http://pocketnow.com/windows-phone/exclusive-windows-phone-8-detailed
 [4]: http://msdn.microsoft.com/en-us/library/windows/desktop/ms700675%28v=vs.85%29.aspx
 [5]: http://social.msdn.microsoft.com/Forums/en-US/windowsdeveloperpreviewgeneral/thread/6be392da-4d2f-41b4-8354-8dcee20c85cd
