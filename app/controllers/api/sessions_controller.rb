class Api::SessionsController < ApiController
  def create
    user = User.find_by(email: params[:email]).try(:authenticate, params[:password]) 
    raise "Account not found" if user.nil?
    raise "Wrong password" if !user
    session[:user_id] = user.id
    render json: user.as_json
  end
  def destroy
    session[:user_id] = nil
    render json: {ok: true}
  end
end