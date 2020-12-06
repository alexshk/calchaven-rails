Rails.application.routes.draw do
  get 'public/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/cold-calling', to: 'public#cold_calling'
  root 'public#index'
end
