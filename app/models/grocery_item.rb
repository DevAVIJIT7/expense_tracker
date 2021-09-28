class GroceryItem < ApplicationRecord
  validates :name, :unit, presence: true
  validates :name, uniqueness: true

  has_many :monthly_prices, dependent: :destroy
end