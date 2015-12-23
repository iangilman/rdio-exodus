(function() {

  // curl https://api.github.com/repos/rdio/api/issues?labels=project+ideas > rdio-project-ideas.json
  // note that we got all but this one: https://github.com/rdio/api/issues/6
  // but that's probably fine since it's pretty Rdio specific

  // TODO: Grab the comments as well

  window.App = {
    init: function() {
      var self = this;

      $.ajax({
        url: 'rdio-project-ideas.json',
        success: function(data) {
          // console.log(data);
          // console.log('count', data.length);
          $('.ideas').empty();
          _.each(data, function(issue) {
            App.template('issue', issue)
              .appendTo('.ideas');
          });
        }
      });
    },

    // ----------
    template: function(name, config) {
      var rawTemplate = $.trim($('#' + name + '-template').text());
      var template = _.template(rawTemplate);
      var html = template(config);
      return $(html);
    }
  };

  $(document).ready(function() {
    App.init();
  });

})();
