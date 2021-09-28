module DailyExpenses
  class IndexPresenter
    def present
      current_time = Time.zone.now
      expenses = DailyExpense.where(created_at: current_time.beginning_of_month..current_time.end_of_month)
      checklists = MonthlyChecklist.where(month: current_time.month, year: current_time.year).pluck(:id, :name)

      { 
        daily_expenses: daily_expenses(expenses), 
        checklists: checklists,
        total_expense: expenses.sum(&:amount)
      }
    end

    private

    def daily_expenses(expenses)
      expenses.map do |expense|
        {
          id: expense.id,
          name: expense.name,
          amount: expense.amount,
          checklist: {
            id: expense&.monthly_checklist&.id,
            name: expense&.monthly_checklist&.name
          },
          created_at: expense.created_at
        }
      end
    end
  end
end