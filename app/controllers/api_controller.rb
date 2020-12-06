class ApiController < ActionController::API
  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end

  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: {error: e.errors.title}, status: 422
  end

  rescue_from StandardError do |e|
    render json: {error: e.message}, status: 422
  end
end