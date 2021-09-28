class AddMonthlyChecklistsToDailyExpenses < ActiveRecord::Migration[6.1]
  def change
    add_reference :daily_expenses, :monthly_checklist, index: true, foreign_key: true, null: true
  end
end
