---
layout: '$/layouts/BlogPost.astro'
title: 'The :not() css-pseudo-class and specificity'
description: "The :not() pseudo-class is a powerful CSS negation matcher added in CSS3. It matches elements that are not represented by the argument…"
pubDate: '2015-06-07'
tags:
 - CSS
---

The :not() pseudo-class is a powerful CSS negation matcher added in CSS3. It matches elements that are not represented by the argument passed to it. For example, `li:not(.different)` would match all list items that don't have the HTML class: `.different`. There are [cases](https://twitter.com/wesbos/status/606144483562913792) where using the :not pseudo-class makes a lot of sense. There are also cases where the specificity :not() applies can work against you.

Recently I was working on a project where various form text inputs were styled with the following code.

```css
input[type='date'],
input[type='email'],
input[type='number'],
input[type='password'],
input[type='search'],
input[type='tel'],
input[type='text'],
input[type='url'] {
  /* Some default form field styles */

  &:focus {
    /* Focus state styles */
  }

  &[disabled] {
    /* Disabled state styles */
  }

  &[readonly],
  &[readonly]:focus {
    /* Readonly state styles */
  }
}
```

It is a good idea to check the output of your preprocessed CSS to make sure the generated code is as you would intend it to be. In this case, the amount of selectors this code generates for these styles is rather large.

```css
input[type='date'],
input[type='email'],
input[type='number'],
input[type='password'],
input[type='search'],
input[type='tel'],
input[type='text'],
input[type='url'] {
  /* Some default form field styles */
}

input[type='date']:focus,
input[type='email']:focus,
input[type='number']:focus,
input[type='password']:focus,
input[type='search']:focus,
input[type='tel']:focus,
input[type='text']:focus,
input[type='url']:focus {
  /* Focus state styles */
}

input[type='date'][disabled],
input[type='email'][disabled],
input[type='number'][disabled],
input[type='password'][disabled],
input[type='search'][disabled],
input[type='tel'][disabled],
input[type='text'][disabled],
input[type='url'][disabled] {
  /* Disabled state styles */
}

input[type='date'][readonly],
input[type='email'][readonly],
input[type='number'][readonly],
input[type='password'][readonly],
input[type='search'][readonly],
input[type='tel'][readonly],
input[type='text'][readonly],
input[type='url'][readonly],
input[type='date'][readonly]:focus,
input[type='email'][readonly]:focus,
input[type='number'][readonly]:focus,
input[type='password'][readonly]:focus,
input[type='search'][readonly]:focus,
input[type='tel'][readonly]:focus,
input[type='text'][readonly]:focus,
input[type='url'][readonly]:focus {
  /* Readonly state styles */
}
```

## Chaining :not()

By chaining up :not pseudo-classes to select input types we do not want to match, we can select the same elements as our previous input selectors. This reduces the amount of selectors as this long chain counts as only one selector.

```css
input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]):not([type="range"]):not([type="submit"]):not([type="reset"]):not([type="image"])
```

Using a selector like this _may_ seem like a good idea, **with this selector, we cut our output CSS selector count for these styles from 40 to 5**. Though, this introduces a side effect. When you chain the :not pseudo-classes, it increases specificity with each :not. While we cut the selector count down, we now have a selector with a **specificity score of 0.0.8.1**.

If you need to override styles applied by this selector, you'll need some way to trump their current styling specificity.

## An alternate approach

If you have control over the markup, you can apply the styles with a single class. This solves the problem of keeping selector count low while also keeping specificity low.

```css
.text-input {
  /* Some default form field styles */

  &:focus {
    /* Focus state styles */
  }

  &[disabled] {
    /* Disabled state styles */
  }

  &[readonly],
  &[readonly]:focus {
    /* Readonly state styles */
  }
}
```

With this `.text-input` class, we can apply form field styles only to the specific inputs we want. It also keeps things simple. The **specificity score of this `.text-input` selector is 0.0.1.0**, which is easy to override if the need arises. The total selector count for applying these styles with a class is 5, the same as the chained :not selector.

When using the :not pseudo-class, be careful of chaining them together. You may end up creating a specificity side effect that will cause issues down the road.
