module GroceryItems
  class IndexPresenter
    def present
      {
        grocery_items: GroceryItem.all.map do |item|
          { 
            id: item.id,
            name: item.name, 
            unit: item.unit,
            created_at: item.created_at
          }
        end
      }
    end
  end
end