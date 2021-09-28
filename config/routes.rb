Rails.application.routes.draw do
  root 'dashboard#index'

  resources :daily_expenses, only: [:index, :create, :update, :destroy]
  resources :monthly_checklists, only: [:index, :create, :update, :destroy]
  resources :grocery_items, only: [:index, :create, :update, :destroy]
  resources :monthly_prices, only: [:index, :create, :update, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
