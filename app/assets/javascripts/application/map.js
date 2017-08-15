new L.Control.GeoSearch({
  provider: new L.GeoSearch.Provider.OpenStreetMap(),
  showMarker: false,
  position: 'topright',
  retainZoomLevel: true
}).addTo(map);

new L.Control.GitHub({}).addTo(map);
new L.Control.Strava({}).addTo(map);