new L.Control.GeoSearch({
  provider: new L.GeoSearch.Provider.OpenStreetMap(),
  showMarker: false,
  position: 'topleft',
  retainZoomLevel: true
}).addTo(map);