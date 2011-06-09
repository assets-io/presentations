!SLIDE subsection
# Assets.io

!SLIDE
# The birth of Assets.io
That was about the time when my pal Thomas came to me with the idea of building
asset packaging and delivery as a service. Having felt the pain myself,
I was immediately excited about it.

!SLIDE smaller light-on-dark dr-evil
# What if we could to do this so it just works?
![background](dr-evil.jpg "Dr. Evil")

!SLIDE center
# How would that work?
![Assets.io :: How it works](howitworks.png)

<!-- TODO: structure the rest of the content into slides and transform into
           problem/solution style-->
!SLIDE
### Designing the backend (origin server)

* How to maximize throughput?
  - Parallelize fetching from customer's server (em-http-request)
  - Take on new requests while waiting for the assets (async response)

#### Evented Web App servers

* Looked at various alternatives
  - Goliath
  - Rainbows
  - Good old Thin

* Settled for Thin (then with Heroku as possible hosting environment in mind)

#### Parallel asset fetching

* em-synchrony
* em-http-request (contributed em-synchrony like interface)

#### Processing

* Minification (JS: Uglifier, CSS: Rainpress)
* Wrapping
* Url rewriting (-> Addressable!!!)

#### Async Response

* throw vs. dummy response
* research: AsyncResponse class (seen in @methodmissings's talk @ Euruko)

#### Hosting
* Amazon
  - Cloudfront
  - EC2
  - ELB
  - Auto-Scaling

<!-- notes from Thomas that need to be incorporated into additional or existing slides/notes -->
!SLIDE
### Notes from Thomas

#### Hurdle#1: Javascript parsing when document loaded too late
Solution: Script tags have to be written into the document

#### Hurdle#2: Passing parameters through CF not possible
Solution: Base64 encoded JSON object as asset identifier

#### Hurdle#3: Cache invalidation takes too long
Solution: Cache busting with iterating (numerical) ID or date

#### Hurdle#4: Request error results in unstyled w/o JS
Solution: Fallback mechanism that tests for asset availability

#### Hurdle#5: API Loading / Versioning
Solution. Disting versioning so we can use long expires headers

#### Hurdle#6: Images in CSS -- path is broken
Solution: Rewrite CSS url paths

#### The future (crystal ball)
* Images (Image optimization)
* CSS sprites
