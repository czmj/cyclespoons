class MapController < ApplicationController
    include PubHelper

    def index
        @pubs = get_pubs
        @markers = get_markers(@pubs)

        if (@strava_client)
            @encodedRoutes = [];
            routes = @strava_client.list_athlete_routes
            routes.each do |route|
                @encodedRoutes.push(route['map']['summary_polyline'])
            end            
        end
    end
end
