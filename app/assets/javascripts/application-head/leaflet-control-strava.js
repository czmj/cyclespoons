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
        var $routesToggle = $('.js-toggle-routes');
        this.routesLayer = new L.FeatureGroup();

        // strava button in markup
        if ($strava.length) {
            $strava.remove();
            $(container).append($strava);
            $routesToggle.on('click', $.proxy(this.toggleRoutesHandler, this));
        }

        return container;
    },
    toggleRoutesHandler: function(event) {
        var $target = $(event.target),
            encodedRoutes = $target.attr('data-routes');
        
        // data attribute exists 
        if (encodedRoutes) {
            event.preventDefault();
            encodedRoutes = JSON.parse(encodedRoutes);

            if (encodedRoutes.length){
                this.toggleRoutes(encodedRoutes);
                $target.toggleClass('active');
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
            var encoded;

            for (var i = 0; i < encodedRoutes.length; i++) {
                encoded = encodedRoutes[i];

                var coordinates = L.Polyline.fromEncoded(encoded).getLatLngs();

                var route = L.polyline(coordinates, {
                    color: 'purple',
                    weight: 5,
                    opacity: .7,
                    lineJoin: 'round'
                })

                this.routesLayer.addLayer(route);
            }
            map.addLayer(this.routesLayer);
            // map.fitBounds(this.routesLayer.getBounds());
        }
    }
});

L.control.strava = function(id, options) {
    return new L.Control.Strava(id, options);
}