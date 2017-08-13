class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  @client = Strava::Api::V3::Client.new(:access_token => ENV['STRAVA_ACCESS_TOKEN'])
end
