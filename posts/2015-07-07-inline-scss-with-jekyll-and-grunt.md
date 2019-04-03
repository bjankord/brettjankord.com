---
title: 'Inline SCSS with Jekyll and Grunt'
date: '2015-07-07'
permalink: /2015/07/07/inline-scss-with-jekyll-and-grunt/
summary: Inlining critical CSS as great way to improve the performance of your site, it reduces blocking CSS requests needed for the initial render…
tags:
 - CSS
layout: layouts/post.njk
type: article
---

Inlining critical CSS as great way to improve the performance of your site, it reduces blocking CSS requests needed for the initial render. I recently added this functionality to my site and with the help of grunt, inlining CSS in Jekyll is fairly straight forward.

## Grunt setup

To inline CSS in Jekyll, we will be compiling SCSS with grunt. This is mainly because we want to compile CSS into Jekyll's `include` directory so that it can be included inside of a style tag in our layout template.

To get set up with grunt, check out their [Getting Started guide](https://gruntjs.com/getting-started). Once you have grunt set up for your Jekyll project, install grunt-contrib-sass:

`npm install grunt-contrib-sass --save-dev`

Below is a sample grunt file you can use to compile you SCSS into CSS.

```js
module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    // SCSS compilation
    // Let grunt handle this so we can get a .css file and copy it into the _includes dir.
    // This allows us to include the .css file inline when jekyll builds out
    sass: {
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          '_includes/critical.css': '_scss/critical.scss',
        },
      },
    },
  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Registered grunt tasks
  grunt.registerTask('default', ['sass']);
};
```

## Jekyll Setup

Now that we are compiling a CSS file into Jekyll's `include` directory, we can call that include in our templates.
In the head of you document, add the following code to include you critical CSS inline.

```html
<!-- Inline critical css -->
<style type="text/css">{% raw %}{% include critical.css %}{% endraw %}</style>
```

## Taking it a step further

One could take this a step further by using [Filament Group's loadCSS utility](https://github.com/filamentgroup/loadCSS) to asynchronously load the remaining CSS for your site. By inlining critical CSS and asynchronously loading the rest of your CSS, you'll see a nice performance boost in the overall loading time of your site.

## Additional resources

- [Inline SCSS with Jekyll and GitHub Pages](http://www.kevinsweet.com/inline-scss-jekyll-github-pages)
- [Inline your critical CSS using Jekyll and Gulp](https://www.drewbolles.com/blog/2015/04/23/inline-critical-css-using-jekyll-and-gulp/)
- [Critical CSS using Sass and Jekyll](https://gist.github.com/benedfit/46da533805566141c42f)
