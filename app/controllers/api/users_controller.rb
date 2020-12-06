class Api::UsersController < ApiController
  def create
    begin
      user = User.create!({
        name:params[:name],
        email:params[:email],
        password:params[:password],
        wants_email:!!params[:wants_email]
      })
    rescue ActiveRecord::RecordNotUnique
      raise "Looks like you already have an account."
    end
    session[:user_id] = user.id
    render json: user.as_json
  end

end