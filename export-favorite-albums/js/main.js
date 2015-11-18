(function() {

  window.Main = {
    // ----------
    init: function() {
      var self = this;
      
      if (!rdioUtils.startupChecks()) {
        return;
      }

      rdioUtils.authWidget($('.auth'));

      R.on('change:authenticated', function(authenticated) {
        if (authenticated) {
          $('.working').show();
          $('.authed').show();
        }
      });

      this.collection = rdioUtils.collectionAlbums({
        localStorage: true,
        onAlbumsLoaded: function() {
          $('.working').text($('.working').text() + '.');
        },
        onLoadComplete: function() {
          var data = [];

          self.collection.each(function(v, i) {
            data.push({
              name: v.name,
              artist: v.artist
            });
          });

          var now = new Date();
          var name = 'rdio-collection-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '.json';

          var json = JSON.stringify(data, null, 2);
          $('.save')
            .attr({
              href: 'data:application/json,' + encodeURIComponent(json),
              download: name
            })
            .show();

          $('.working').hide();
        }
      });
    }
  };
  
  // ----------
  $(document).ready(function() {
    Main.init();
  });
  
})();  
