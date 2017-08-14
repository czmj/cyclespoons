
L.Control.Strava = L.Control.extend({
options: {
    position: 'topright'
  },
  initialize: function (options) {
    // constructor
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    // happens after added to map
    var container = L.DomUtil.create('div', 'leaflet-control-strava');
    var $strava = $('.map__control--strava');
    if ($strava.length){
      $strava.remove();
      $(container).append($strava);
    }
    else {
      L.DomUtil.create('a', 'btn btn--strava', container).setAttribute('href', 'https://www.strava.com/oauth/authorize?client_id=19372&response_type=code&redirect_uri=http://cyclespoons.herokuapp.com');
    }
    return container;
  },
  onRemove: function (map) {
    // when removed
  },
});

L.control.strava = function(id, options) {
  return new L.Control.Strava(id, options);
}