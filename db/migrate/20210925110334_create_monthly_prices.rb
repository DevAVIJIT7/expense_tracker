class CreateMonthlyPrices < ActiveRecord::Migration[6.1]
  def change
    create_table :monthly_prices do |t|
      t.integer :available_quantity, null: false, default: 0
      t.integer :required_quantity, null: false, default: 0
      t.integer :quantity_bought, null: false, default: 0
      t.decimal :price, null: false, default: 0.0
      t.references :grocery_item, index: true, foreign_key: true
      t.timestamps
    end
  end
end
