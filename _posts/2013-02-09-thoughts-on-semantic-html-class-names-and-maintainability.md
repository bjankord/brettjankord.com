---
title: Thoughts on semantic HTML class names and maintainability
author: Brett
layout: post
comments : true
code_demo: true
permalink: /2013/02/09/thoughts-on-semantic-html-class-names-and-maintainability/
dsq_thread_id:
  - 1074504426
categories:
  - CSS
  - Front-End-Development
---
The discussion of semantic HTML class names is one that goes back quite a while. While many great front-end developers have discussed back and forth on the topic, I wanted to document my own thoughts on the topic. To me, semantic HTML class names is somewhat of a misnomer. Aside from microformats, HTML classes add no semantic meaning to machines such as search engines or assistive technology like screen readers. Yet semantic class names is one of the main tenants of CSS best practices. I believe choosing class names is one of the most difficult part of CSS, largely do to our understanding of semantics. I&#8217;ve recently read and re-read a lot of articles/books on semantic HTML, specifically concerning document outlines, as well as techniques for writing maintainable and scalable CSS.

I want to reiterate this one point, HTML class names offer no semantic value to search engines or screen readers, aside from microformats. If you are concerned with semantic value, understanding HTML document outlines is very important. It&#8217;s also important to understand that class names have no effect on the document outline. So the way we view semantic value of HTML class names must be different than the way we view semantic value of our HTML markup.

Rather than concerning ourselves with creating semantic class names, I think we should be thinking about creating *sensible* class names. I believe sensible class names offer semantics, but they also offer flexibility and reusability. Sensible class names gives meaning to an element to make it easier to understand and maintain *for developers*. In my mind, there are two ways I see naming classes, based on their function(role) or based on their form(visual).

## W3C recommendation of naming classes

> Often people use class names like bluetext, or redborder. A much better way to name your classes is with the role a certain HTML element of that class has.

From [W3C&#8217;s Tips for Webmasters][1]

The reasoning behind W3C&#8217;s recommendation is clear, using a class like bluetext is not future friendly. If down the road, you change that color, `.bluetext` has lost its meaning.

On the flip side, frameworks like Twitter Bootstrap which use visual(presentational) class names are widely popular. Back-end developers that I&#8217;ve talked to that have used Twitter Bootstrap seem to really like it. They love the plugin-in-play ability with adding visual class names to elements. They don&#8217;t have to get in and mess around with the CSS, they can just add and remove classes as needed.

With individual role based classes, this flexibility is tricky. If we class the sections of the page individually, based on their role, with little thought to reusability, the CSS and the corresponding HTML classes offer little ease of maintenance and extensibility. If new sections are added, we need to add new role based classes along with additional CSS that corresponds to these new classes.

There are ways to reduce this concern when using role based classes, and take steps towards flexibility and modularity we see used with presentational classes.

## Flexible and Reusable CSS

Coming up with HTML class names, I think, is one of the hardest parts of CSS. We want our styles to flexible and reusable, it keeps our file-sizes small and makes maintenance easier. While presentational classes like .left, .right, .hide, .show, invisible do help with flexibility and are highly reusable, I believe tend to muddy up our HTML. I believe [presentational classes have a place][2], but it is not in our HTML. This a topic I&#8217;d like to write more about as well.

I want to share some ideas on approaches I think help reduce the amount of classes we have in our HTML, while still giving us the flexibility and reusability we want. I&#8217;ve recently reread [SMACSS][3] by Johnathon Snook and enjoyed it so much I decided to finally buy it so I could read the last few chapters. So a lot of my thinking is formed around the SMACSS concept. If you havn&#8217;t read [SMACSS][3] yet, I highly suggest you check it out.

## Keeping it simple

With role based class naming, its easy to get specific, in some cases, too specific. Specific class names can make it difficult to make CSS reusable, if we aren&#8217;t smart about it.

I prefer role based classes names but I think it is very important to keep them as general as possible at first. We should be looking for patterns in the layouts and create modules from those patterns. I tend to try and base my patterns on structural elements.

I&#8217;ve put together a screenshot of sidebar to help go over some of these concepts.

<img src="http://www.brettjankord.com/wp-content/uploads/2013/02/reviews.jpg" style="width:282px !important;" alt="Three review sections. One for movies, one for albums, and one for books" class="aligncenter size-full wp-image-588" />

*EDIT: I should have changed the titles of the items in each review section in this graphic above, but they aren&#8217;t really the focus of this post, so yeah&#8230;*

Upon getting this sidebar to code out, I would go about classing each review section as `.reviews` and not worry about getting too specific for now with the class names.

{% highlight html %}
<div class="reviews">
  <h2>Movie Reviews</h2>
  ...
</div>

<div class="reviews">
  <h2>Album Reviews</h2>
  ...
</div>

<div class="reviews">
  <h2>Book Reviews</h2>
  ...
</div>
{% endhighlight %}

{% highlight css %}
.reviews {...}
{% endhighlight %}

The `.reviews` class will act as our main module for all reviews we have here.

## Sub-Classing

Snook talks a lot about sub-classing in SMACSS and it&#8217;s key to making our modules flexible. Sub-classing is the process of creating sub-modules based off of our main module.

For instance, a sub-class, or sub-module of `.reviews` would be `.reviews-movies`. There are a few tricks to naming sub-modules which I&#8217;ll touch on later, but the main thing I want to share is that by keeping our class names simple at first and creating basic modules, it makes them more reusable and allows use to use sub-modules to create flexibility.

So now we have our updated HTML and CSS with our module class, and sub-module classes.

{% highlight html %}
<div class="reviews reviews-movies">
  <h2>Movie Reviews</h2>
  ...
</div>

<div class="reviews reviews-albums">
  <h2>Album Reviews</h2>
  ...
</div>

<div class="reviews reviews-books">
  <h2>Book Reviews</h2>
  ...
</div>
{% endhighlight %}

{% highlight css %}
.reviews {...}

.reviews-movies {...}
.reviews-albums {...}
.reviews-books {...}
{% endhighlight %}

## DRYing up modules and sub-modules

These are a few tricks I&#8217;ve found that try and help make sure you Don&#8217;t Repeat Yourself. They help clean up our HTML classes as well as our CSS for modules and sub-modules.

### Extending selectors

One approach is based on the @extend concept in Sass. You don&#8217;t need Sass to do this, though it does help. The idea is simple enough, instead of keeping our module styles in a separate class of `.reviews`, we chain all our sub-modules together and are styles for the module are then stored here.

For example:

Instead of writing our CSS like below:

{% highlight css %}
.reviews {/* Module Styles */}

.reviews-movies {/* Sub-Module Styles */}
.reviews-albums {/* Sub-Module Styles */}
.reviews-books {/* Sub-Module Styles */}
{% endhighlight %}

We can write it as:

{% highlight css %}
.movie-reviews,
.album-reviews,
.book-reviews,
.magazine-reviews {/* Module Styles */}

.reviews-movies {/* Sub-Module Styles */}
.reviews-albums {/* Sub-Module Styles */}
.reviews-books {/* Sub-Module Styles */}
{% endhighlight %}

This approach is similar in thinking to talks Jeremy Clarke has been giving on [DRY CSS][4].

One of the benefits of this approach is that we can remove the `.reviews` class from out HTML.

{% highlight html %}
<div class="reviews-movies">
  <h2>Movie Reviews</h2>
  ...
</div>

<div class="reviews-albums">
  <h2>Album Reviews</h2>
  ...
</div>

<div class="reviews-books">
  <h2>Book Reviews</h2>
  ...
</div>
{% endhighlight %}

The main drawback I see with this approach though is that if we decide to add a new review section, we have to update our styles. This is a small issue admittedly, though I think we can alleviate it with intelligently thinking about how we go about naming our classes and writing our CSS. Nicolas Gallagher touches on some of the other issues associated with a single class approach in the component modifiers section of his post, [About HTML semantics and front-end architecture][5].

### Class-Attribute Selectors

The method I prefer the most when writing modules and sub-modules is to use class-attribute selectors. I&#8217;ve found that they reduce the amount of classes in my HTML as well as reduce the amount of CSS I have to write.

[Nathan Ford wrote][6] recently about using class-attribute selectors and how they can be used to help make our CSS more object-oriented, more scalable and modular. It really opened my eyes to the power of this technique. It&#8217;s actually used in Twitter Bootstrap as well and is one of the techniques that allows it to be so flexible.

Below is an example of the HTML we would write with this approach. You&#8217;ll notice we don&#8217;t need the additional .reviews class we once had as well with this technique. The class-attribute selector takes the role of the .reviews class we once had.

{% highlight html %}
<div class="reviews-movies">
  <h2>Movie Reviews</h2>
  ...
</div>

<div class="reviews-albums">
  <h2>Album Reviews</h2>
  ...
</div>

<div class="reviews-books">
  <h2>Book Reviews</h2>
  ...
</div>
{% endhighlight %}

{% highlight css %}
[class*="reviews-"] {/* Module Styles */}

.reviews-movies {/* Sub-Module Styles */}
.reviews-albums {/* Sub-Module Styles */}
.reviews-books {/* Sub-Module Styles */}
{% endhighlight %}

With this technique it&#8217;s important to be consistent with naming schemes so they match our class-attribute selector.

Of note, class-attribute selector are not supported in IE6. If you need to support IE6, I recommend using additional classes instead.

## With great power

The class-attribute selector offers a lot of power to how we can write our CSS and HTML classes, though this power does not come without responsibility. There are certain things to be aware of when using class-attribute selectors.

[Cobey Potter][7] brought up a good concept to be aware of when using class-attribute selectors in Nathan&#8217;s, [A Harder-Working Class article][6] that I thought was worth sharing. It highlights one reason why we must be smarter in how we name our classes.

> One thing people should be aware of is when you write:
>
> [class*=“pod”] it will choose both .pod-heading as well as .podium. Basically, you need to be pretty sharp on your naming conventions. To combat this, I&#8217;ve started namespacing using something like: [class*=“pod—”] (two dashes) to ensure it only picks up the right namespace.

This is the reasoning behind why I used `[class*="reviews-"]` in the example above instead of just `[class*="reviews"]`. There may not be any conflicts with using `[class*="reviews"]` but adding the extra dash helps, usually.

In the comments section of Nicolas Gallagher&#8217;s About HTML semantics and front-end architecture post, Gallagher talks about a concern he has with the &#8220;moduleName-&#8221; pattern.

Below are Gallagher&#8217;s concerns on using `[class*="btn-"]`

> My concern with it is that you have to make sure that the substring you choose to match will never unintentionally appear in another class, e.g., btn-group.

I&#8217;ve put together an example below to demonstrate the issue:

{% highlight html %}
<div class="btn-group">
  <a href="order.php" class="btn-order">Order</a>
  <a href="shopping-cart.php" class="btn-shopping-cart">Cart</a>
</div>
{% endhighlight %}


Gallagher has a valid point. In the example above, if we use the following CSS, our `.btn` module will be used on `.btn-group` as well.

{% highlight css %}
[class*="btn-"] {
  background: #CCC;
  padding: .5em;
  text-decoration: none;
}
{% endhighlight %}


A few ways come to mind to avoid this concern.

I&#8217;ve started to use a BEM like syntax, the same that [Harry Roberts][8] uses, for my modules, sub-modules, and sub-components

With this approach the code looks like:

{% highlight html %}
<div class="btn-group">
  <a href="order.php" class="btn--order">Order</a>
  <a href="shopping-cart.php" class="btn--shopping-cart">Cart</a>
</div>
{% endhighlight %}

{% highlight css %}
[class*="btn--"] {
  background: #CCC;
  padding: .5em;
  text-decoration: none;
}
{% endhighlight %}


I prefer this approach when using class-attribute selectors, I haven&#8217;t run into naming conflicts with this approach yet, that&#8217;s not to say there aren&#8217;t any. It seems easier for me to glance at it and know immediately what its for. A minor detail, but just something I prefer.

Another solution would be to simply change the name of `.btn-group` so it doesn&#8217;t conflict with our module class-attribute selector.

{% highlight html %}
<div class="button-group">
  <a href="order.php" class="btn-order">Order</a>
  <a href="shopping-cart.php" class="btn-shopping-cart-">Cart</a>
</div>
{% endhighlight %}

{% highlight css %}
[class*="btn-"] {
  background: #CCC;
  padding: .5em;
  text-decoration: none;
}
{% endhighlight %}

All in all, using class-attribute selectors does require an involved and thoughtful effort to make sure the strings for modules match up correctly and do not conflict with other class names. Though I find the benefit class-attributes bring, from ease of authorship to ease of flexiblity and maintainability are worth the thought involvement needed in using them.

## Conclusion

I feel the discussion of how we name our classes and make sure our styles are flexible and resuable could go on and on. These are some techniques that I&#8217;ve found useful and am planning on sharing some more ideas on structuring and naming CSS and decoupling CSS from HTML. While I don&#8217;t think there is **one true way** to craft CSS, I really wanted to document the techniques I use today to see if/how they change over time. So far these techniques have been very useful for me.

Kinda off-topic from semantic HTML class names and maintainability, I often think back to my days working for my Dad when I think of the ways I work today. He runs a construction company and I would say most of what I learned while working for him easily translates to web design. For instance, thinking of painters that come paint your house. Every painter paints differently. Some use a paint sprayer and some use rollers and brushes. Both are effective. There times when I think of sharing techniques and think what I&#8217;m sharing may be as interesting as a painter sharing how they use a paint sprayer. At the end of the day who cares right? As long as the job gets done. But I think there is a level of passion for the craft I work in that my Dad instilled in me that pushes me to share, analyze, critique and process the techniques I use and continue to strive to improve.

I believe sharing our ideas and approaches can help us better understand our craft and how we approach it. I look forward to feedback, critique, and general comments on this topic.

 [1]: http://www.w3.org/QA/Tips/goodclassnames
 [2]: http://ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css/
 [3]: http://smacss.com/
 [4]: http://www.slideshare.net/jeremyclarke/dry-css-a-dontrepeatyourself-methodology-for-creating-efficient-unified-and-scalable-stylesheets
 [5]: http://nicolasgallagher.com/about-html-semantics-front-end-architecture/
 [6]: http://24ways.org/2012/a-harder-working-class/
 [7]: http://wellfireinteractive.com/
 [8]: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
