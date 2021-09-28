class MonthlyChecklist < ApplicationRecord
  validates :name, :month, :year, presence: true

  has_many :daily_expenses
end