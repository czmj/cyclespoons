var provider = new L.GeoSearch.Provider.OpenStreetMap();

var searchControl = new L.Control.GeoSearch({
  provider: provider
});

map.addControl(searchControl);