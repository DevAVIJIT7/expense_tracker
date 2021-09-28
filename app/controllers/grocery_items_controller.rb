class GroceryItemsController < ApplicationController
  def index
    @presenter = ::GroceryItems::IndexPresenter.new.present
  end

  def create
    item = GroceryItem.create!(grocery_items_params)
    if item
      render json: item
    else
      render json: item.errors
    end
  end

  def update
    item = GroceryItem.find(params[:id])
    if item.update(grocery_items_params)
      render json: item
    else
      render json: item.errors
    end
  end

  def destroy
    item = GroceryItem.find(params[:id])
    item.destroy
  end

  private

  def grocery_items_params
    params.require(:grocery_items).permit(:name, :unit)
  end
end