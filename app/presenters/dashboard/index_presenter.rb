module Dashboard
  class IndexPresenter
    def present
      {
        daily_expenses: daily_expenses.map do |key, value|
          { 
            month: I18n.t('date.month_names')[key.to_i],
            expenditure: value.sum(&:amount).to_i,
          }
        end
      }
    end

    private

      def daily_expenses
        @_daily_expenses ||= DailyExpense
          .where("created_at >= ? AND created_at <= ?",  Time.now.beginning_of_year, Time.now.end_of_year)
          .group_by {|d| d.created_at.strftime("%m") }
      end
  end
end