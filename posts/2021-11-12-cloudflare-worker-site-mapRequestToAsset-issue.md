---
title: 'Cloudflare Worker Site mapRequestToAsset issue'
date: '2021-11-12'
permalink: /2021/11/12/cloudflare-worker-site-mapRequestToAsset-issue/
summary: 'Recently I was working on setting up an internal performance dashboard based on...'
tags:
 - cloudflare
 - workers
layout: layouts/post.njk
type: article
---

Recently I was working on setting up an internal performance dashboard based on [speedlify](https://www.speedlify.dev/). I cloned the [speedlify repo](https://github.com/zachleat/speedlify/), updated the config to test the sites I wanted to measure performance on, and ran the build scripts to get generate the static assets for the site. Speedlify is based on [Eleventy](https://github.com/11ty/eleventy), a static site generator. Speedlify uses lighthouse-cli to grab lighthouse metrics and then stores those in JSON and renders that data in a static site with some nice graphs and visuals.

This was fairly easy to setup and customize, the next step I went for was deploying it to an internal custom domain with Cloudflare Workers. I followed the guide on how to set up a worker site for an exsiting static site: https://developers.cloudflare.com/workers/platform/sites/start-from-existing

I got it set up, ran `wrangler preview` and everthing looked good. I ran `wrangler publish` with a custom route in my wrangler.toml file, setting up the worker on an internal domain and noticed the site didnt work. Confused, I reached out the to the Cloudflare discord and started Googling for what the error could be. 

From digging through [Github issues](https://github.com/cloudflare/wrangler/issues/1208#issuecomment-615378771), I learned about the asset manifest, which uses content hashing to update the names of these assets wherever they are referenced in the site as part of the build step and store the static assets in a generated KV store with the keys for the assets being the asset name + the generated content hash + file extension. This seems to be a part of wrangler publish.

For the Eleventy site, my index.html referenced a style.css and scripts.js file and did not run through webpack for any file hashing. I think Cloudflare Worker Sites may expect static assets to run through webpack so that they use the typical content hash finger-printing approach to avoid caching issues, but for this project, I was fine with the simple output of Eleventy which just generated style.css and scripts.js. 

At this point I was starting to understand why my static site worked in `wrangler preview` but not with `wrangler publish` to my custom domain. Essentially, as a request comes into the worker, the request is then mapped to the KV store to figure out what static asset to return. However, since the requests were for index.html, style.css, and scripts.js, but the KV store had stored those assets under keys that included a content hash, the KV store never mapped the incoming requests to the static assets. 

To get around this, I added the following to my worker:

```diff
+ // Bypass cache since these files may change but dont include any hashing to help with cache busting if they do
+ options.cacheControl = {
+   bypassCache: true,
+ }

+ // Map incoming request to correct static asset
+ options.mapRequestToAsset = req => {
+   req = mapRequestToAsset(req)

+   const asset = req.url.replace('https://sub.custom-domain.com/speedlify-dashboard/', '');
+   return new Request(`${new URL(req.url).origin}/${asset}`, req);
+ }

const page = await getAssetFromKV(event, options)
```
This defientely feels like a hack to work around something I'd expect to just work. For my project, I'm planning to use it as an internal performance dashboard and so I'm not concerned about caching the static assets. 

Interestingly, I found that if I deployed my worker site to the workers.dev domain, it worked as I'd expect, without the code neeed to customize the mapRequestToAsset. It was only when I deployed to my custom domain that mapRequestToAsset handler no longer seemed to be able to map the incoming request to the keys in the static asset KV store and needed to be customized.

Not sure if anyone will find this useful but it took me a bit to make sense of this and wanted to note it down for futurue reference. 
