class DailyExpensesController < ApplicationController
  def index
    @presenter = ::DailyExpenses::IndexPresenter.new.present
  end

  def create
    expense = DailyExpense.create!(daily_expenses_params)
    if expense
      render json: expense
    else
      render json: expense.errors
    end
  end

  def update
    expense = DailyExpense.find(params[:id])
    if expense.update(daily_expenses_params)
      render json: expense
    else
      render json: expense.errors
    end
  end

  def destroy
    expense = DailyExpense.find(params[:id])
    expense.destroy
  end

  private

  def daily_expenses_params
    params.require(:daily_expenses).permit(:name, :amount, :monthly_checklist_id)
  end
end