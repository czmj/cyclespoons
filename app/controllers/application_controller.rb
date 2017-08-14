class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :strava_auth

  def strava_auth
    code = strava_code

    if code
      access_information = Strava::Api::V3::Auth.retrieve_access(ENV['STRAVA_CLIENT_ID'], ENV['STRAVA_CLIENT_SECRET'], code)
      access_token = access_information['access_token']
      athlete_information = access_information['athlete']
      @strava_client = Strava::Api::V3::Client.new(:access_token => access_token)
    end
  end

  private

  def strava_code
    if params[:code]
      code = params[:code]
      cookies.permanent[:strava_code] = code
    else
      code = cookies[:strava_code]
    end

    return code
  end
end
