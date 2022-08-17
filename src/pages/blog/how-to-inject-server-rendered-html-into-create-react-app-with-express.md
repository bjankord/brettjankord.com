---
layout: '$/layouts/BlogPost.astro'
title: 'How to inject server rendered HTML into create-react-app with Express'
description: "I recently ran into a limitation of using Express and Create React App, I needed the ability to inject server rendered HTML into..."
pubDate: '2020-09-21'
tags:
 - react
 - express
 - create-react-app
---

I recently ran into a limitation of [the established pattern for creating an app with Express and Create React App](https://dev.to/loujaybee/using-create-react-app-with-express) when I was developing a project at work. I needed the ability to inject server rendered HTML into the app generated with create-react-app. At work, we have a global header and footer that are generated on the server that we use to wrap around our client-side JavaScript apps. We have been using Vue + Vue CLI + Express to inject server rendered HTML into the client-side app, but I wanted to see if I could achieve the same thing with Create React App + Express.

While rendering server side generated HTML would be possible with something like Next.js or using an Express + Webpack boilerplate, I really wanted to see if I could stick to just using Express + Create React App without ejecting as my teammates and I don't want to futz around with maintaining all the webpack, babel, eslint, etc configs and we already have a large ecosystem of modules we've built up around Express. The [create-react-app docs describe the ability to render data into the index.html](https://create-react-app.dev/docs/title-and-meta-tags/#injecting-data-from-the-server-into-the-page) file but it is vague on how to actually implement this feature so I figured I'd share what I did to get it working for my use-case.

## Initialize with create-react-app

The first thing we need to do is run create-react-app. Run the following command to generate the app.

```
npx create-react-app my-app
```

Once all the dependencies are installed, open up the project in your favorite code editor.

## Installing additional dependencies

The next thing we need to do is add some additional dependencies we'll be using for the app.
Run the following command to add these dependencies:

```
yarn add cra-build-watch express express-es6-template-engine npm-run-all reload serialize-javascript
```

If you already have `nodemon` installed globally you can skip this, otherwise you will also want to install nodemon:

```
yarn add nodemon -D
```

Let's go over what each of these will be used for.

### cra-build-watch

Instead of running react-scripts start, we are going to use this package as a replacement for our start script. This will build the files, write them to disk, and set up a file watcher to rebuild if we make changes to the `./src` or `./public` directories.

### express

We're going to use express to serve our app both in production and in development. This is different compared to using create-react-app when running the start script as we wont be using webpack-dev-server to serve any files.

### express-es6-template-engine

We are going to use this to inject placeholders into the `public/index.html` file that create-react-app uses. When this file is converted to `build/index.html` we'll serve it from express and use express-es6-template-engine to replace the placeholders with whatever server rendered HTML we want to use.

### npm-run-all

We are going to use this to run cra-build-watch and the express server in parallel. We will use this in our npm start script so when we run that script, we can edit our app in `./src` and have it rebuild files while at the same time, express will be serving the files from `./build`.

### nodemon

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. We will use this to restart the server whenever changes are made to the `./server` directory or the `./build` directory. We will actually be ignoring changes to the `./src` directory as we want to watch for changes in the build directory which is generated from changes to the `./src` directory. This is to help ensure we don't reload the app before the `./build` directory is updated with the latest changes from the `./src` directory.

### reload

We'll use this in our express app and in our react app to reload the browser whenever changes are made to the express server or the react app.

### serialize-javascript

This is used to serialize any possible JSON data we may use to bootstrap our app by rendering the JSON data directly in a script tag from the server in the index.html file. More info on this can be found here:
https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0


## Updating npm scripts

Next, we are going to replace the npm scripts. Remove the current npm scripts:

```json
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"
```

Replace them with the following npm scripts:

```json
"start": "npm-run-all -p build:watch server:watch",
"server": "node server/app.js",
"server:watch": "nodemon --ignore './src/' server/app.js",
"build": "react-scripts build",
"build:watch": "cra-build-watch",
"test": "react-scripts test",
"eject": "react-scripts eject"
```

## Adding a homepage key to the package.json file

By default, Create React App produces a build assuming your app is hosted at the server root.

To override this, you can specify the homepage in your package.json. This will let Create React App correctly infer the root path to use in the generated HTML file. We'll also use this key in the Express app when serving static assets.

We will go ahead set the following in our package.json file:

```
"homepage": "/",
```

More info on the use of this homepage key can be found here:
https://create-react-app.dev/docs/deployment/#building-for-relative-paths

## Updating public/index.html

One thing we need to do is remove the HTML comments from `public/index.html`, the express-es6-template-engine seems to get tripped up on these. Then we'll add in placeholders that we'll use when serving the app from express to inject the server rendered HTML.

Inside the `<body>` of the index.html file, we are going to add the following:

```ejs
<%= '${header}' %>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<%= '${footer}' %>
<script>var bootstrap = <%= '${bootstrap}' %>;</script>
```

This creates placeholders for `${header}`, `${footer}`, and `${bootstrap}`;

The next part we are going to add is only needed when we are running the app in dev mode, or non-production mode.

We'll add the following lines to index.html before the closing `</body>` tag.

```ejs
<% if(process.env.NODE_ENV !== 'production'){ %>
<script src="/reload/reload.js"></script>
<% } %>
```

This wires up our code we'll be using on the client to enable the reloading the webpage the app is running in while building in dev mode.

## Express app setup
The next thing we are going to do is set up the Express app.

### server/app.js
First we are going to create a directory named `server` inside of our root directory. Next, we are going to create a file named `app.js` inside of the `server` directory and add the following code to it.

```js
const express = require('express');
const http = require('http');
const path = require('path');
const reload = require('reload');
const es6Renderer = require('express-es6-template-engine');
const serialize = require('serialize-javascript');

const packageJson = require('../package.json');
const router = require('./api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Api Routes
app.use(`${packageJson.homepage}api`, router);

// view engine setup
app.engine('html', es6Renderer);
app.set('views', path.resolve(__dirname, '../build/'));
app.set('view engine', 'html');

// Serve static files
app.use(packageJson.homepage, express.static(path.join(__dirname, '..', 'build'), {
  index: false
}));

const server = http.createServer(app);
server.listen(3000, () => console.log('App is running on localhost:3000'));
// Wire up reload behavior if app is not running in production mode
if (process.env.NODE_ENV !== 'production') {
  // Wires up handler for /reload/reload.js route
  reload(app);
}

// For all requests besides /api, serve the index template based on create-react-app's public/index.html file
app.get('*', (req, res) => {
  res.render('index', {
    locals: {
      header: '<header class="express-header">Custom Header from Express</header>',
      footer: '<footer class="express-footer">Custom Footer from Express</footer>',
      bootstrap: serialize({ bootstrap: 'data' }, { isJSON: true }),
    },
  });
});
```

At a high-level, what this file does is set up the express app to serve our app that is generated from create-react-app (which outputs to `./build`). We'll use `./build/index.html` with express-es6-template-engine to replace the header, footer, and bootstrap placeholders. We also setup a route for APIs that Express will provide.

## server/api/index.js
Next, we are going to set up a route handler that we will use for APIs. Create a directory named `api` inside of the `server` directory. Then create a file named `index.js` inside of the `api` directory. Inside of `index.js`, add the following code:

```js
const express = require('express');

const router = express.Router();

// Api routes
router.get('/ping', (req, res) => {
  return res.json({ text: 'pong' });
});

module.exports = router;
```

In here, you can build out whatever APIs your app might need.

## Starting the app

Before running the start npm script for the first time, you'll want to run `yarn build` to generate the `./build` directory.

With the above in place, we can start the app. Run the following command to start the app in dev mode.
```
yarn start
```

The app should open on http://localhost:3000

When we start the app and navigate to http://localhost:3000 in the browser, we can see the custom header and footer we injected from express into the index.html file.

We can also see the inline script we have that renders data provided from the express server in the index.html file. This can be used to bootstrap our client-side app with data from the server and save an API request to fetch initial data on page load.

If we make changes to files within `./src`, `./public`, or `./server`, the app will reload in the browser.

## Running in production

Once you are ready to run the app in production mode, remember to run `yarn build` to build the assets for production and then you can run `yarn server` to start up the app.

## GitHub Repo
You can find a sample app with the code from this post here:

https://github.com/bjankord/express-create-react-app-custom-template
