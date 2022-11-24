class DashboardController < ApplicationController
  def index
    @presenter = ::Dashboard::IndexPresenter.new.present
  end
end
