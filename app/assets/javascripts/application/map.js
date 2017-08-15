new L.Control.GeoSearch({
  provider: new L.GeoSearch.Provider.OpenStreetMap(),
  showMarker: false,
  position: 'topright',
  retainZoomLevel: true
}).addTo(map);

L.control.strava().addTo(map);
L.control.github().addTo(map);