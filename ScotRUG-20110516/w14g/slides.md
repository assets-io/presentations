!SLIDE incremental
# So what is W14g?
* Webapp built on top of the Twitter API
* Data visualization experiment
* Learning project
* 100% Buzzword compliant

!SLIDE incremental
# JavaScript *App*
* Based on *Backbone.js* (Single page JS App)
* Written entirely in *Coffeescript*
* *HTML5* / *CSS3* Animations

!SLIDE
# DEMO

<p class="notes">
Do a fun demo. Show a few nice selections. Tweet along.
</p>

!SLIDE w14g_2
# Figured: This could go viral!
![background](screaming-beatles-fans.jpg)

!SLIDE incremental
# ZOMG PERFORMANCE MATTERS
## What if we built it and they come?
* Need a hosting solution that scales
* Content Delivery network for a global audience (CF)
* Origin server to serve w14g assets (EC2)

<p class="notes">
TODO: insert screenshot of resource view or similar to show the number of JS
files involved.

Been my first actual JS app, not just some behavior sprinkled on top of views.
Had to think about structuring the code.
</p>

!SLIDE bullets incremental
# Aside: Web Performance 101
* Fewer requests through packaging (concatenation)
* Save whole requests by proper caching with correct headers
* Smaller assets save bandwidth with minification and gzip compression
* Fast delivery via CDN

!SLIDE bullets incremental
# Solving the asset problem, take one
* Jammit
* Middleman
* Development and build environments
* Manual asset management + cache invalidation

<p class="notes">
* How many of you have used asset packaging solutions with their Rails
  projects?
</p>

!SLIDE light-on-dark effort
![background](effort.jpg "Lot's of effort")
### <http://www.flickr.com/photos/unices/4022007384/>

<p class="notes">
Works nice, but was a lot of effort to get to this point.

Asset management is still hard, so hard that you usually don't do it unless
you absolutely have to. Rails' asset pipeline will be a game changer, though
</p>
