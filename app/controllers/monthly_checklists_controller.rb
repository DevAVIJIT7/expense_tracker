class MonthlyChecklistsController < ApplicationController
  def index
    current_time = Time.zone.now
    @checklists = MonthlyChecklist.where(month: current_time.month, year: current_time.year)
  end

  def create
    checklist = MonthlyChecklist.create!(monthly_checklist_params)
    if checklist
      render json: checklist
    else
      render json: checklist.errors
    end
  end

  def update
    checklist = MonthlyChecklist.create!(monthly_checklist_params)
    if checklist
      render json: checklist
    else
      render json: checklist.errors
    end
  end

  def destroy
  end

  private

  def monthly_checklist_params
    params.require(:monthly_checklists).permit(:name, :month, :year)
  end
end