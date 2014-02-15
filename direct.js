$route = null;

(function() {
  $route = this;

  var
    routes,
    config,
    load = function(template, target, callback) {
      $.get(template, function(data) { $(target).html(data); if (callback) callback(); });
    };

  this.init = function(configParam, routesParam) {
    config = configParam;
    routes = routesParam;

    var url = window.location.hash.substring(1);

    for (var i=0; i<routes.length; i++) {
      var route = routes[i];
      if (new RegExp(route.url).test(url)) {
        load(route.template, config.target, route.controller);
        return;
      }
    }

    load(routes[routes.length-1].template, config.target, route.controller);
  };

  window.onhashchange = function() {
    this.init(config, routes);
  };
})();