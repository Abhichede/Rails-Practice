Rails.application.routes.draw do
  resources :customers, only: [:show, :edit, :update, :destroy, :index, :new, :create] do
    collection { get :autocomplete }
  end
  resources :stocks, only: [:show, :edit, :update, :destroy, :index, :new, :create] do
    collection { get :autocomplete }
  end
  root 'medipest#index'

  resources :medipest

  get 'search_stock', to: 'stocks#search_stock'
  get 'outwards', to: 'outwords#index'
  get 'search_customer', to: 'customers#search_customer'


  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
