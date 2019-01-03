---
title: 'How to lint SCSS with stylelint'
date: '2019-01-03'
permalink: /2019/01/03/how-to-lint-scss-with-stylelint/
tags: []
---

Stylelint is a mighty, modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets. If you are reading this, I’m guessing you are already familiar with stylelint. If not, I’d highly recommend reading Aleks Hudochenkov’s Smashing Magazine post, Stylelint: The Style Sheet Linter We’ve Always Wanted

## Installing stylelint
First, you’ll want to ensure you have stylelint installed. Stylelint is an npm package which can be installed by running the following command:

```
npm install -g stylelint
```

Be sure to check out the CLI documentation for more info about the CLI options.

## Usage
After you have stylelint installed, you’ll want to create a .stylelintrc.json file. This is where you will configure all the lint rules you want stylelint to check for. Take a look at the rules documentation page for a detailed overview of all the available rules.

Once you have a .stylelintrc.json file set up with some lint rules, you can run stylelint on your SCSS files with the following command. This assumes you are in the directory where your .scss files are located. You can update the path accordingly.

```
stylelint "**/*.scss"
```

Stylelint will look for a .stylelintrc.json file in the current working directory. If your config file is not in the current working directory, you can pass it along when you run stylelint with the config option.

```
stylelint "**/*.scss" --config foo/bar/.stylelintrc.json
```

__Note, if you are using stylelint < 7.0.0, you will need to specify the syntax as scss__

```
stylelint "**/*.scss" --syntax scss
```

If you want to use stylelint with npm-scripts, install stylelint into your project as a dev dependency.

```
npm install stylelint -D
```

Then, in your package.json file you can add this command:

```
"scripts": {
  "stylelint": "stylelint '**/*.scss'"
}
```

Then you can run npm run stylelint to lint your SCSS files. When you run this command, if there are any lint errors, you’ll see all these npm ERR! messages after the lint errors.

This is expected. You can update your stylelint script to always exit with a zero and it won’t output all the npm ERR! messages.

```
"scripts": {
  "stylelint": "stylelint '**/*.scss'; exit 0"
}
```

Now when you run npm run stylelint, the npm ERR! messages will not display.

You’ll want to leave off the exit 0 though if your are running this script as part of a build process or continuous integration process where you want the process to fail if there is any lint.

Another option is to set the default severity level in your stylelint config to warning.

```
{
  "defaultSeverity": "warning",
  "rules": {
    ...
  }
}
```

When you run npm run stylelint, it will treat lint issues as warnings and exit with a zero.

Now you should be set up with how to lint .scss files with stylelint, though there are additional stylelint plugins which have been developed specifically for SCSS which are helpful when linting SCSS.

## stylelint-scss
Krister Kari has developed a great plugin for linting SCSS with stylelint called stylelint-scss. While stylelint was developed to focus on standard CSS, stylelint-scss is focused on SCSS. It offers a collection of lint rules for conventions and syntax specific to SCSS.

I’ve found that the core stylelint rules cover a lot of the conventions and patterns I want to lint for in my .scss files, and stylelint-scss covers a nice set of additional patterns and syntax specific to SCSS.

For example, I use stylelint’s at-rule-blacklist rule to ensure I don’t leave any debug commands in my .scss.

```
"rules": {
  "at-rule-blacklist": ["debug"]
}
```

I use stylelint-scss’s at-extend-no-missing-placeholder to ensure the @extend directive is only used with placeholder selectors.

```
"plugins": [
  "stylelint-scss"
],
"rules": {
  "scss/at-extend-no-missing-placeholder": true
}
```

Be sure to check out all the available stylelint-scss rules to see which ones would work well for you.

## Stylelint configs
One of the other great features of stylelint is that it includes the ability to create shareable stylelint config files. The pre-configured stylelint config files can be extended into your project’s .stylelintrc.json config, allowing you to quickly get up and running with a set of configured lint rules.

The stylelint team maintains a standard stylelint config called stylelint-config-standard. GitHub also shared their config they use, stylelint-config-primer. When I started using stylelint for SCSS, I did not find a lot stylelint-configs that specifically focused on SCSS.

## stylelint-config-sass-guidelines
I’m a big fan of Hugo Giraudel’s Sass Guidelines. In my opinion, it is one of the best resources for writing sane, maintainable and scalable Sass/SCSS. In Sass Guidelines, there is a section for tools, which provides a scss-lint config based on the recommendations in Sass Guidelines.

I set out to put together stylelint-config-sass-guidelines, a config based on the scss-lint rules Sass Guidelines recommends.

What I found in doing so, was that stylelint + stylelint-scss offer a very equivalent rule set compared to the scss-lint rules which Hugo Giraudel recommends in Sass Guidelines. It is not exactly 1:1 with the scss-lint rules, but the stylelint rules used in stylelint-config-sass-guidelines are very close to the scss-lint recommended in Sass Guidelines. To help ensure that stylelint was going to catch the same issues that the Sass Guideline scss-lint rules were catching, I created a set of tests based on SCSS code which would generate lint in scss-lint. Here is a comparison of the lint report generated by both tools.

I’ve been surprised with how well stylelint does with linting SCSS. If you are looking for a place to start linting you SCSS with stylelint, I’d recommend extending stylelint-config-sass-guidelines into your own stylelint config.

```
{
  "extends": "stylelint-config-sass-guidelines"
}
```

Hopefully, this post has shed some light on how easy it is to use stylelint for linting SCSS. With companies like Facebook, GitHub, and 18F using stylelint, the project looks to have a bright future.