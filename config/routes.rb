Rails.application.routes.draw do
  resources :positions
  resources :positons
  root 'home#index'

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
