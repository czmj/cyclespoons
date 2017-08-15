class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :strava_auth

  def strava_auth
    access_token = strava_token

    if access_token
      @strava_client = Strava::Api::V3::Client.new(:access_token => access_token)
    end
  end

  private

  def strava_token
    if params[:code]
      code = params[:code]
      access_information = Strava::Api::V3::Auth.retrieve_access(ENV['STRAVA_CLIENT_ID'], ENV['STRAVA_CLIENT_SECRET'], code)
      access_token = access_information['access_token']
      cookies.permanent[:strava_token] = access_token
    else
      access_token = cookies[:strava_token]
    end

    return access_token
  end
end
