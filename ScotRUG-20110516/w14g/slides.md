!SLIDE subsection
# W14g

<p class="notes">
Do a fun demo. Show a few nice selections. Tweet along.
</p>

!SLIDE
# Figured: This could go viral

!SLIDE
# ZOMG PERFORMANCE MATTERS
* need a hosting solution that scales (global audience)
* some CDN experience with Cloudfront
* origin server would serve w14g assets (EC2)
  - manual asset management + cache invalidation

!SLIDE
# JavaScript *App*

<p class="notes">
TODO: insert screenshot of resource view or similar to show the number of JS
files involved.

Been my first actual JS app, not just some behavior sprinkled on top of views.
Had to think about structuring the code.
</p>

!SLIDE bullets incremental
# Aside: Web Performance 101
* less requests -> packaging
* no requests are better than few requests -> caching (get the headers right)
* small assets -> minification + gzip compression
* fast delivery -> CDN

!SLIDE bullets incremental
# Solving the asset problem, take one
* Jammit
* Middleman
* Development and build environments

<p class="notes">
* How many of you have used asset packaging solutions with their Rails
  projects?
</p>

!SLIDE center
# TODO: insert picture showing "lots of effort"

<p class="notes">
Works nice, but was a lot of effort to get to this point.

Asset management is still hard, so hard that you usually don't do it unless
you absolutely have to. Rails' asset pipeline will be a game changer, though
</p>
