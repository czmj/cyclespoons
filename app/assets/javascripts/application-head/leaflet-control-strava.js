L.Control.Strava = L.Control.extend({
    options: {
        position: 'topright'
    },
    initialize: function(options) {
        // constructor
        L.Util.setOptions(this, options);
    },
    onAdd: function(map) {
        // happens after added to map
        var container = L.DomUtil.create('div', 'leaflet-control-strava');
        var $strava = $('.map__control--strava');
        this.routesLayer = new L.FeatureGroup();

        // strava button in markup
        if ($strava.length) {
            $strava.remove();
            $(container).append($strava);
            L.DomEvent.addListener($strava[0], 'click', this.onClick, this)
        }

        return container;
    },
    onClick: function(event) {
        var $target = $(event.target),
            $link = $target.is('.map__control--strava a') ? $target : $target.closest('.map__control--strava a'),
            encodedRoutes = $link.attr('data-routes');
        
        // data attribute exists 
        if (encodedRoutes) {
            L.DomEvent.preventDefault(event);
            encodedRoutes = JSON.parse(encodedRoutes);

            if (encodedRoutes.length){
                this.toggleRoutes(encodedRoutes);
            }
            // user has no routes to show
            else {
                alert('You must add at least one route to Strava to show your routes');
            }
        }
    },
    toggleRoutes: function(encodedRoutes) {
        if (!encodedRoutes) {
            return;
        }

        // routes are currently shown
        if (map.hasLayer(this.routesLayer)) {
            map.removeLayer(this.routesLayer);
        }
        // routes are currently hidden
        else {
            this.routesLayer.clearLayers();
            for (let encoded of encodedRoutes) {

                var coordinates = L.Polyline.fromEncoded(encoded).getLatLngs();

                var route = L.polyline(coordinates, {
                    color: 'blue',
                    weight: 5,
                    opacity: .7,
                    lineJoin: 'round'
                })

                this.routesLayer.addLayer(route);
            }
            map.addLayer(this.routesLayer);
            map.fitBounds(this.routesLayer.getBounds());
        }
    }
});

L.control.strava = function(id, options) {
    return new L.Control.Strava(id, options);
}