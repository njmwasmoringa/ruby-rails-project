Rails.application.routes.draw do
  resources :contributions, only:[:index, :show, :create]
  resources :members
  get "/members/:member_id/contributions", to:"members#contributions"
  # get "/member/:id/contribute", to: "members#contribute"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
