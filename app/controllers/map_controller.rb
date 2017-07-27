class MapController < ApplicationController
    include PubHelper

    def index
        @pubs = get_pubs
        @markers = get_markers(@pubs)
    end
end
