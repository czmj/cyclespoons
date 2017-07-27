class MapController < ApplicationController
    def index
        @pubs = get_pubs
    end

    private

    def get_raw_data
        require 'net/https'
        
        url = URI("https://www.jdwetherspoon.com/api/advancedsearch")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        request = Net::HTTP::Post.new(url)
        request["content-type"] = 'application/json'
        request.body = "{\"region\":null,\"paging\":{\"UsePagination\":false},\"facilities\":[],\"searchType\":0}"

        response = http.request(request)
        return JSON.parse(response.read_body)
    end

    def get_pubs
        pubs = Array.new
        regions = get_raw_data['regions']

        regions.each do |region|
            region['subRegions'].each do |subregion|
                subregion['items'].each do |pub|
                    unless pub['PubIsTemporaryClosed'] || pub['PubIsClosed']
                        pubs.push(pub)
                    end
                end
            end
        end
        
        return pubs;
    end
end
