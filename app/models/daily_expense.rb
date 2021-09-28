class DailyExpense < ApplicationRecord
  validates :name, :amount, presence: true

  belongs_to :monthly_checklist, optional: true
end