class CreateDailyExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :daily_expenses do |t|
      t.string :name, null: false
      t.decimal :amount, default: 0.0
      t.timestamps
    end
  end
end
