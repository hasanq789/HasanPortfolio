Rails.application.routes.draw do

  get 'user/username'

  get 'user/password_digest'

  root to: "todo_lists#index"
  resources :todo_lists do
    resources :todo_items
  end
  resources :sessions, only: [:new, :create, :destroy]

get "/login" => "sessions#new", as: "login"
delete "/logout" => "sessions#destroy", as: "logout"
end
