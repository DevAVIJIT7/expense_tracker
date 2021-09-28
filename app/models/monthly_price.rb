class MonthlyPrice < ApplicationRecord
  validates :available_quantity, :required_quantity, :quantity_bought, :price, presence: true

  belongs_to :grocery_item
end