!SLIDE assetsio_1
![background](assetsio_1.jpg "Assets.io")

!SLIDE smaller light-on-dark dr-evil
# What if we could do this so it just works?
![background](dr-evil.jpg "Dr. Evil")

!SLIDE incremental
# The birth of Assets.io
## The origin server could...
* minify and package automatically
* provide easy cache busting
* send long expires headers
* offer gzip compression
* be reusable component / intermediate server

!SLIDE
# How again would that work?
![Assets.io :: How it works](howitworks.png)

!SLIDE commandline code incremental
# How to integrate
    <head>
      <title>My website</title>

      <!-- Stylesheets //-->
      <link rel="stylesheet" href="/css/base.css" />
      <link rel="stylesheet" href="/css/navigation.css" />

      <!-- Javascript //-->
      <script src="/js/jquery.js"></script>
      <script src="/js/plugin.js"></script>
      <script src="/js/site.js"></script>

    </head>

<!-- TODO: structure the rest of the content into slides and transform into
           problem/solution style-->
!SLIDE
# JS API
## Hurdle#1: Javascript parsing when document loaded too late
* Solution: Script tags have to be written into the document

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
