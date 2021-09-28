# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_25_110334) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "daily_expenses", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "amount", default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "monthly_checklist_id"
    t.index ["monthly_checklist_id"], name: "index_daily_expenses_on_monthly_checklist_id"
  end

  create_table "grocery_items", force: :cascade do |t|
    t.string "name", null: false
    t.string "unit"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_grocery_items_on_name", unique: true
  end

  create_table "monthly_checklists", force: :cascade do |t|
    t.string "name"
    t.integer "month", null: false
    t.integer "year", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "monthly_prices", force: :cascade do |t|
    t.integer "available_quantity", default: 0, null: false
    t.integer "required_quantity", default: 0, null: false
    t.integer "quantity_bought", default: 0, null: false
    t.decimal "price", default: "0.0", null: false
    t.bigint "grocery_item_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["grocery_item_id"], name: "index_monthly_prices_on_grocery_item_id"
  end

  add_foreign_key "daily_expenses", "monthly_checklists"
  add_foreign_key "monthly_prices", "grocery_items"
end
