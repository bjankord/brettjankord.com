---
title: "Style Guide Boilerplate"
date: "2013-03-07"
tags: ["Style Guide Boilerplate"]
permalink: /2013/03/07/style-guide-boilerplate/
---

Recently, I've had a renewed interest in web style guides. As I've been building responsive websites, I've found style guides to be a crucial part of the build process. Style guides help promote consistency and modular thinking when building websites and also help add a greater clarity to the parts and pieces that make up your website.

I've always been interested in standardizing the front-end code that I work on. Having a set reference any developer can look to adds efficiency to your team when editing a site.

I decided I would standardize the style guide I had been using into a boilerplate of sorts for me and others to use. I started looking around to see what other developers were including in there style guides. One that really stood out to me was [HTML KickStart][1]. It probably falls more in line with a pattern library. I really liked how [Joshua Gatcke][2] had markup examples in tabs right next to the live code.

I started working on a style guide that used tabs that had markup next to the live code examples for myself. One thing that was always a pain when I had written style guides/standards before was that you have to duplicate your markup from your live code to the example code box. If you ever update your live code, you also have to update your code example. This isn't very DRY. I decided I'd write some JavaScript that would pull the markup from the live example and populate the tabs with the sample code.

This is similar to what Mat Marquis does with [X-RayHTML][3] and how code examples work on the [jQuery mobile docs site][4] currently. One thing I didn't like about this was how I had to format the live markup to get it look formatted correctly in the example code. Any code I wanted to populate in a code example, I had to remove all of the spaces to the left of the open and closing tags of my code sample. Looking at the markup it looked odd. It wasn't a big issue, though I could see people not wanting to format their markup so particularly to get the sample code to look right in `pre`.

I kept looking around and came to Jeremy Keith's [Pattern Primer][5]. I liked how code snippets were all html pages that were pulled in with PHP. It meant I didn't have to worry about odd formatting to get my live code formatting to look correct in the code examples.

I spoke with Jeremy to see if I could use Pattern Primer for the core of my style guide boilerplate and build on top of it and he gave me the green light.

## Of Styles and Patterns

To me, what I typically think of when I hear the word style guide in relation to websites, is a document will all elements and styling applied to the base elements. A style guide shows how H1-H6s are styled, how blockquotes, tables, forms, etc. are styled.

Then there are patterns. To me, patterns are modular like pieces of markup. These are things like pagination, breadcrumbs, buttons. They can also be unique styles on top of the base styles for things like blockquotes, tables, forms.

I wanted to combine the two into one document and so this was a driving factor behind the boilerplate. Bringing the two types of styles into one style guide.

## Goals for Style Guide Boilerplate

As mentioned earlier, I think there are a lot of benefits to having your own style guide for your websites.

**Style guides:**

*   Promote consistency
*   Promote modular thinking
*   Add a greater clarity to the parts and pieces that make up your website
*   Increase efficiency when editing a website.

I hope people find this boilerplate useful and add it to their own projects.

I'd love to be able to go to www.anysite.com/styleguide/ and view that site's style guide.

## Download/Demo

* [Download/Fork][6] the Style Guide Boilerplate from GitHub.
* [View the demo][7] for Style Guide Boilerplate.

 [1]: http://www.99lime.com/elements/
 [2]: https://twitter.com/htmlkickstart
 [3]: https://github.com/filamentgroup/X-rayHTML
 [4]: http://view.jquerymobile.com/master/demos/
 [5]: https://github.com/adactio/Pattern-Primer
 [6]: https://github.com/bjankord/Style-Guide-Boilerplate
 [7]: http://bjankord.github.io/Style-Guide-Boilerplate/demo.html
