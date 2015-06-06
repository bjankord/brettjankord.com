---
title: More thoughts on HTML class naming conventions.
author: Brett
layout: post
comments : true
code_demo: true
permalink: /2013/03/06/more-thoughts-on-html-class-naming-conventions/
dsq_thread_id:
  - 1121011682
categories:
  - CSS
  - Front-End-Development
---
I recently came across a [gist][1] Nicolas Gallagher had posted on HTML class naming conventions. I had seen how he named classes before in from his post, [About HTML semantics and front end architecture][2], though I wanted to jot down some more thoughts on this topic.

## Common naming conventions

Below are a few common naming conventions I&#8217;ve seen other developers using.

Harry Roberts ([@csswizardy][3]) uses a [BEM like syntax which was honed by Gallagher][4].

{% highlight css %}
.module {...}
.module--modifier {...}
.module__subcomponent {...}
.module__subcomponent--modifier {...}
{% endhighlight %}

I&#8217;ve seen Jonathan Snook ([@snookca][5]) [write][6] about using a syntax like:

{% highlight css %}
.module {...}
.module-submodule {...} /* Module Modifier uses single dash */
.module--subcomponent{...} /* Subcomponent uses double dash */
{% endhighlight %}

Another naming convention I&#8217;ve thought about similar to the one above looks like:

{% highlight css %}
.module {...}
.module--modifier {...} /* Double dash for modifier */
.module-subcomponent {...} /* Single dash for subcomponent */
.module-subcomponent--modifier {...}
{% endhighlight %}

The issue I see with the last two naming conventions is that it can be hard see spot the difference where a module ends and a modifier or subcomponent starts when module names are made up of multiple words like product rating.

{% highlight css %}
.product-rating {...}
.product-rating--featured {...} /* Modifer (Submodule) with double dashes is easy to spot and understand */
.product-rating__label {...} /* Subcomponent with double underscore is easy to spot and understand */

.product-rating {...}
.product-rating-featured {...} /* Modifier (Submodule) with single dash may be harder to understand that feature is a modifier of product-rating and not necessarily its own module */
.product-rating--label {...}

.product-rating {...} /* Module */
.product-rating--featured {...}
.product-rating-label /* Subcomponent with single dash. Harder to understand label is component of product rating. */
{% endhighlight %}

One way to get around this would be to use camelCase for module names and only use dashes to separate modules from modifiers and subcomponents.

{% highlight css %}
.productRating {...}
.productRating-featured {...}
.productRating--label {...}
{% endhighlight %}

All of the naming conventions look a little odd at first glance. I think it is important to remind others the overall goal of a HTML class naming convention would be to add clarity for developers, though it can take a while for other developers to understand the thinking behind it and grow accustom to it.

I&#8217;ve created a [Github repo][7] to help document modular class naming patterns I&#8217;ve come across.

Do you have a naming convention you use when you&#8217;re writing modular CSS? Let me know in the comments below.

 [1]: https://gist.github.com/necolas/1309546
 [2]: http://nicolasgallagher.com/about-html-semantics-front-end-architecture/
 [3]: https://twitter.com/csswizardry
 [4]: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
 [5]: https://twitter.com/snookca
 [6]: http://us2.campaign-archive1.com/?u=2de298319eb1c284bd66e8b42&id=966ba5b4d3
 [7]: https://github.com/bjankord/CSS-Modules-Subcomponents-And-Modifiers-Collection
