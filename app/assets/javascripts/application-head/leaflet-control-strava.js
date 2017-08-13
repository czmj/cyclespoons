
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
    var button = L.DomUtil.create('button', 'btn btn--strava', container);
    return container;
  },
  onRemove: function (map) {
    // when removed
  },
});

L.control.strava = function(id, options) {
  return new L.Control.Strava(id, options);
}