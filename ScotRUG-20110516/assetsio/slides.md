!SLIDE assetsio_1
![background](assetsio_1.jpg "Assets.io")

!SLIDE incremental
# The birth of Assets.io
## Idea for a service that would...
* minify and package automatically
* provide easy cache busting
* send long expires headers
* offer gzip compression

!SLIDE smaller light-on-dark dr-evil
# What if we could do this so it just works?
![background](dr-evil.jpg "Dr. Evil")

!SLIDE
# Right, but what would that look like?
![Assets.io :: How it works](howitworks.png)

!SLIDE subsection
# Let's start in the browser

!SLIDE
# How to integrate
## a typical website head
    @@@ html
    <head>
      <title>My website</title>

      <!-- Stylesheets -->
      <link rel="stylesheet" href="/css/base.css">
      <link rel="stylesheet" href="/css/navigation.css">

      <!-- Javascript -->
      <script src="/js/jquery.js"></script>
      <script src="/js/plugin.js"></script>
      <script src="/js/site.js"></script>

    </head>

!SLIDE incremental
# How to integrate
## rewritten to use Assets.io
    @@@ html
    <head>
      <title>My website</title>

      <script src="http://api.assets.io/b6/"></script>

      <script>
        assets.account('your-account-id');

        <!-- Stylesheets -->
        assets.css('/css/base.css /css/navigation.css');

        <!-- Javascript -->
        assets.js('/js/jquery.js /js/plugin.js /js/site.js');
      </script>

    </head>
* dynamic insertion of tags via loader API
* packages defined *within* source code

!SLIDE incremental
# Here's what gets loaded
    http://your-account-id.cloudfront.net/eyJyIjoiYjYiLCJhIjoieW91 \
          ci1hY2NvdW50LWlkIiwiaCI6IiIsInMiOlsiaHR0cDovL2V4YW1wbGUu \
          b3JnL2Nzcy9iYXNlLmNzcyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jc3Mv \
          bmF2aWdhdGlvbi5jc3MiXX0=.css

    http://your-account-id.cloudfront.net/eyJyIjoiYjYiLCJhIjoieW91 \
          ci1hY2NvdW50LWlkIiwiaCI6IiIsInMiOlsiaHR0cDovL2V4YW1wbGUu \
          b3JnL2pzL2pxdWVyeS5qcyIsImh0dHA6Ly9leGFtcGxlLm9yZy9qcy9w \
          bHVnaW4uanMiLCJodHRwOi8vZXhhbXBsZS5vcmcvanMvc2l0ZS5qcyJd \
          fQ==.js
* request to Amazon's CloudFront CDN
* the gibberish is Base64 encoded JSON

!SLIDE center
# JSON asset request
    @@@ javascript
    {
      "r": "b6",
      "a": "your-account-id",
      "s": [
        "http://example.org/css/base.css",
        "http://example.org/css/navigation.css"
      ]
    }
* note: CloudFront ignores any URL query strings
* thus this information had be encoded into the path!
* it is the operating instruction for the backend

!SLIDE
# What about cache busting?
## assign a version globally (think: Git SHA)
    assets.version('6091d765');

## or per asset package
    assets.js('/js/whatever.js', {version: 1});

* changing the version will immediate bust the cache


<!-- TODO: structure the rest of the content into slides and transform into
           problem/solution style-->
!SLIDE
# JS API

## Hurdle#4: Request error results in unstyled w/o JS
* Solution: Fallback mechanism that tests for asset availability

## Hurdle#5: API Loading / Versioning
* Solution. Disting versioning so we can use long expires headers

!SLIDE
# In da Cloud
## Hurdle#2: Passing parameters through CF not possible
* Solution: Base64 encoded JSON object as asset identifier

## Hurdle#3: Cache invalidation takes too long
* Solution: Cache busting with iterating (numerical) ID or date

!SLIDE
# Teh Backend -- Ruby time
* How to maximize throughput?
  - Parallelize fetching from customer's server (em-http-request)
  - Take on new requests while waiting for the assets (async response)
<!-- could use an image, huh? -->

!SLIDE
# Evented Web App servers
* Looked at various alternatives
  - Goliath
  - Rainbows
  - Good old Thin
* Settled for Thin (then with Heroku as possible hosting environment in mind)
<!-- show code, how does it look in Goliath/em-synchrony vs. Thin -->

!SLIDE
# Parallel asset fetching
* em-synchrony
* em-http-request (contributed em-synchrony like interface)

!SLIDE
# Processing
* Minification (JS: Uglifier, CSS: Rainpress)
* Wrapping
* Url rewriting (-> Addressable!!!)

## Hurdle#6: Images in CSS -- path is broken
* Solution: Rewrite CSS url paths

!SLIDE
# Async Response
* throw vs. dummy response
* research: AsyncResponse class (seen in @methodmissings's talk @ Euruko)
<!-- show code -->

!SLIDE
# Hosting
* Amazon
  - Cloudfront
  - EC2
  - ELB
  - Auto-Scaling

!SLIDE
# What's next?
* Integration into Rails 3.1 asset pipeline
* Images (Image optimization)
* CSS sprites
