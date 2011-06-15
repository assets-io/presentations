!SLIDE assetsio_1 light-on-dark
# Enter Assets.io
![background](assetsio_1.jpg "Assets.io")

!SLIDE incremental
# The birth of Assets.io
## Idea for a service that would...
* minify and package automatically
* provide easy cache busting
* send long expires headers
* offer gzip compression
* deliver through Content Delivery Network

!SLIDE smaller light-on-dark dr-evil
# What if we could make this just work?<br>As in EASY!
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
      "r": "b6",               // API release
      "a": "your-account-id",  // CF distribution
      "s": [                   // FQDN sources
        "http://example.org/css/base.css",
        "http://example.org/css/navigation.css"
      ]
    }
* note: CloudFront ignores any URL query strings
* thus this information had be encoded into the path!
* it is the operating instruction for the backend

<p class="notes">
JSON offers very good flexibility and future extensibility
</p>

!SLIDE
# What about cache busting?
## assign a version globally (think: Git SHA)
    assets.version('6091d765');

## or per asset package
    assets.js('/js/whatever.js', {version: 1});

* changing the version immediately busts the cache

!SLIDE incremental
# Next challenge: Fallback
    As a user of Assets.io
    When anything goes wrong on their end
    I still want to have a working website

* the JS API needs to check if the assets arrived
  - timeout!
* if not, issue individual requests for each part
  - slower, but no broken site

!SLIDE subsection
# In da Cloud
<!-- TODO: maybe we can describe the hosting setup here... -->

!SLIDE subsection
# Teh Backend: Ruby time

!SLIDE request-flow
# Request Flow & Timing
![Request Flow](request-flow.png)
<!-- TODO: while an image is nice, it does not add much value here -->

!SLIDE
# Two sides for maximizing throughput
* Take on new requests while waiting for the assets
* Parallelize fetching from customer's server

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
