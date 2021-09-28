module MonthlyPrices
  class IndexPresenter
    def present
      {
        grocery_items: grocery_items,
        monthly_prices: group_by_grocery_item,
        total_price_today: total_price_today
      }
    end

    private
    
    def grocery_items
      @items ||= GroceryItem
                  .all
                  .map {|x| {id: x.id, name: x.name } }
    end

    def monthly_prices
      current_time = Time.zone.now
      @monthly_prices ||= MonthlyPrice
                            .where(created_at: current_time.beginning_of_month..current_time.end_of_month)
    end

    def total_price_today
      current_time = Time.zone.now
      monthly_prices.where(created_at: current_time.beginning_of_month..current_time.end_of_month).sum(&:price).to_f
    end

    def group_by_grocery_item
      monthly_prices.inject({}) { |accum, elem|
        accum[elem.grocery_item_id] = {
          price_id: elem.id,
          available_quantity: elem.available_quantity,
          required_quantity: elem.required_quantity,
          quantity_bought: elem.quantity_bought,
          price: elem.price
        }
        accum
      }
    end
  end
end