Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:create]
    resource :session, only: [:create,:destroy]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/cold-calling', to: 'public#cold_calling'
  root 'public#index'
end
