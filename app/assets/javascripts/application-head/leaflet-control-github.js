
L.Control.GitHub = L.Control.extend({
options: {
    position: 'topright'
  },
  initialize: function (options) {
    // constructor
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    // happens after added to map
    var container = L.DomUtil.create('div', 'leaflet-control-github');
    var button = L.DomUtil.create('a', 'btn btn--github', container).setAttribute('href', 'https://github.com/czmj/cyclespoons');
    return container;
  },
  onRemove: function (map) {
    // when removed
  },
});

L.control.github = function(id, options) {
  return new L.Control.GitHub(id, options);
}