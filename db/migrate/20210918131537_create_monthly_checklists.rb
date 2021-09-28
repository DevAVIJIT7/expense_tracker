class CreateMonthlyChecklists < ActiveRecord::Migration[6.1]
  def change
    create_table :monthly_checklists do |t|
      t.string :name
      t.integer :month, null: false
      t.integer :year, null: false
      t.timestamps
    end
  end
end
