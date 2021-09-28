class CreateGroceryItems < ActiveRecord::Migration[6.1]
  def change
    create_table :grocery_items do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :unit
      t.timestamps
    end
  end
end
