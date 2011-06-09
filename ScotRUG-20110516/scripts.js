$(function() {
  // ohh, well...
  setTimeout(function() {
    // open external links in a new window
    $('a[href^=http]').each(function(){
      if(this.href.indexOf(location.hostname) == -1) {
        $(this).attr({
          target: '_blank',
          title: 'Opens in a new window'
        });
      }
    });
  }, 400);

  $('div.content').live('showoff:show', function(evt) {
    var bg_img = $('img[alt=background]', evt.target);
    var old_bg = '';
    if (bg_img.size() > 0) {
      var src = bg_img.attr('src');
      bg_img.hide();
      // Set new background on body
      old_bg = $('body').css('background-image');
      $('body')
        .css('background-image', 'url(' + src + ')')
        .addClass('fullScreen');
    } else {
      $('body').css('background-image', old_bg).removeClass('fullScreen');
    }
  });
});
