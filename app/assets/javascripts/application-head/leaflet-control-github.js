L.Control.GitHub = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    initialize: function(options) {
        // constructor
        L.Util.setOptions(this, options);
    },
    onAdd: function(map) {
        // happens after added to map
        var container = L.DomUtil.create('div', 'leaflet-control-github');
        var $github = $('.map__control--github');

        // github button already in markup
        if ($github.length) {
            $github.remove();
            $(container).append($github);
        // create new button
        } else {
            L.DomUtil.create('a', 'btn btn--github', container).setAttribute('href', 'https://github.com/czmj/cyclespoons');
        }
        return container;
    }
});

L.control.github = function(id, options) {
    return new L.Control.GitHub(id, options);
}