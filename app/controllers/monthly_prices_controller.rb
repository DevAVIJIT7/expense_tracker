class MonthlyPricesController < ApplicationController
  def index
    @presenter = ::MonthlyPrices::IndexPresenter.new.present
  end

  def create
    price = MonthlyPrice.create!(monthly_prices_params)
    if price
      render json: price
    else
      render json: price.errors
    end
  end

  def update
    price = MonthlyPrice.find(params[:id])
    if price.update(monthly_prices_params)
      render json: price
    else
      render json: price.errors
    end
  end

  def destroy
    price = MonthlyPrice.find(params[:id])
    price.destroy
  end

  private

  def monthly_prices_params
    params.require(:monthly_prices).permit(:available_quantity, :required_quantity, :quantity_bought, :price, :grocery_item_id)
  end
end