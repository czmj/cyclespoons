module PubHelper
    require 'net/https'

    def get_pubs
        pubs = Array.new
        regions = get_raw_data[:regions]

        regions.each do |region|
            region[:subRegions].each do |subregion|
                subregion[:items].each do |pub|
                    unless pub[:PubIsTemporaryClosed] || pub[:PubIsClosed]
                        pubs.push(pub)
                    end
                end
            end
        end
        
        return pubs;
    end

    def get_markers(pubs = get_pubs)
        markers = Array.new

        pubs.each do |pub|
            markers.push({
                :latlng => [pub[:lat], pub[:lng]],
                :popup => "<p><a href='//www.jdwetherspoon.com#{pub[:url]}'>#{pub[:name]}</a></p><p>#{pub[:address1]}<br>#{pub[:city]}<br>#{pub[:postcode]}</p>"
            })
        end
        return markers
    end

    private 

    def get_raw_data
        
        url = URI("https://www.jdwetherspoon.com/api/advancedsearch")

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE

        request = Net::HTTP::Post.new(url)
        request["content-type"] = 'application/json'
        request.body = "{\"region\":null,\"paging\":{\"UsePagination\":false},\"facilities\":[],\"searchType\":0}"

        response = http.request(request)
        return JSON.parse(response.read_body, symbolize_names: true)
    end
end
