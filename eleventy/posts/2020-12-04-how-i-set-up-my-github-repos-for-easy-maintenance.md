---
title: 'How I set up my GitHub repos for easy maintenance'
date: '2020-12-04'
permalink: /2020/12/04/how-i-set-up-my-github-repos-for-easy-maintenance/
summary: 'I wanted to share some of the configuration I set up to make maintaining my open source projects a bit easier...'
tags:
 - github
 - open-source
layout: layouts/post.njk
type: article
---

I wanted to share some of the configuration I set up to make maintaining my open source projects a bit easier. As you work on a project, big or small, you will realize keeping a project up to date is an ongoing task.

These are things that I've found helpful in reducing the amount of time I need to spend on maintaining and keeping my open source projects up to date.

* Setting up tests
* Setting up automated testing
* Setting up branch checks
* Automating dependency updates
* Auto-merging dependency updates
* Cleaning up merged branches

## Setting up tests

Testing is a fundamental part of open source code to me. I want the code I write to include tests to help ensure correctness and prevent bugs. Similarly, I expect the same in the open source libraries I use. Tests add confidence that the code is doing what you intended for it to do. For tests, I usually go with [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/).
I've found both testing frameworks easy to setup and use and provide a lot of value when added to a project. Once we have tests in place, we can add the next step, automated testing.

## Setting up automated testing

For automated tests, you'll want to have commands that can be executed to run your tests. For the type of projects I usually work on, these are npm scripts that run my tests. Once you have these, you can set up a tool that will run your tests whenever you open a pull request. I've used [Travis CI](https://travis-ci.org/) for this for some time but have more recently moved to using [GitHub Actions](https://github.com/features/actions) as it offers the functionality I need for automated tests and is built directly into GitHub.

So for setting up GitHub actions for automated testing I create a directory named `.github` and inside of that, I create a directory named `workflows`. This is where my GitHub actions will live. I create a `main` action by creating a file named `main.yml` within the `.github/workflows` directory.

In the `main.yml` file I set up the following:

```yml
name: CI
on: [push]
jobs:
  build:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '12'
      - run: npm install -g yarn@1.x
      - run: yarn install
      - run: yarn lint
      - run: yarn stylelint
      - run: yarn test
```

This sets up the action to run whenever a branch has commits pushed to it. It will install the latest 1.x version of yarn and then use yarn to install the project dependencies. Then in runs the lint, stlyelint, and test npm scripts.

Once I have this GitHub action set up, I can add a branch check to ensure it passes successfully before a pull request is merged.

## Setting up branch checks

GitHub branch checks are a great way to ensure certain criteria are met on pull requests before they can be merged down. For my personal repos, I usually just set up checks to ensure the branch is up to date with master before it can be merged and similarly, ensure the branch passes the automated tests that are set up for the repo.

{% Image "img/github-branch-checks.png", "GitHub branch" %}

On projects where there are various maintainers I've also set up checks to ensure that pull requests receive a certain number of approved reviews or a certain group of reviewers/maintainers review the pull request before it can be merged.

Now that we have these checks in place, we can better ensure the quality of incoming contributions to our project and we can move onto automating dependency updates.

## Automating dependency updates

There are various tools for automating dependency updates in your open source project from [depdendabot](https://dependabot.com/), to [renovate bot](https://github.com/renovatebot/renovate), to [snyk.io](https://snyk.io/) to name a few. I've had the opportunity to use these 3 tools on various projects. For my personal projects I've been using renovate as it is easy to set up and does what I need it to.

## Auto-merging dependency updates

With are dependency updates now coming in as automated pull requests, it would be nice to have the PRs merged into our main branch if our tests pass. Since we are automated tests set up we can ensure these automated dependency pull requests pass our test suite before they are auto-merged. To set up auto-merge with renovate, we need to add this line to our config file.

```js
"packageRules": [
    {
      "updateTypes": ["minor", "patch", "pin", "digest"],
      "automerge": true
    },
    {
      "depTypeList": ["devDependencies"],
      "automerge": true
    }
  ]
```

With this in place, your project can easily be kept up to date automatically with little time needed from you as a maintainer. With our tests in place, we can feel confident about the functionality of our project as new versions of dependencies are added. The last step I added is a check to ensure once a pull request is merged, the related branch from the PR is deleted.

## Cleaning up merged branches
GitHub has a feature for deleting branches that have been merged into your main branch. Once you turn this on it becomes a lot easier to clean up the branches from various pull requests.

{% Image "img/auto-delete-branch.png", "Auto-delete branch" %}

## Wrapping up

It is amazing that all of these features are offered for free for open source projects and are one of the reasons I enjoy working on open source. With this set up, I have a high level of confidence with newer versions of dependencies being added to my project that the project will continue to work as expectedg. Hopefully this write-up can help you with your open source projects as well.
