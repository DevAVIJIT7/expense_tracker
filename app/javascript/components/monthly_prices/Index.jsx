import React, { useState } from "react";
import PropTypes from 'prop-types'

const MonthlyPrice = ({ grocery_items, monthly_prices, total_price_today }) => {
  const [requiredQuantity, setRequiredQuantity] = useState(0)
  const [availableQuantity, setAvailableQuantity] = useState(0)
  const [quantityBought, setQuantityBought] = useState(0)
  const [price, setPrice] = useState(0)

  const onUpdate = (item_id, monthly_prices) => {
    const url = monthly_prices && monthly_prices.price_id > 0 ? `monthly_prices/${monthly_prices.price_id}` : "monthly_prices";
    const method = monthly_prices && monthly_prices.price_id > 0 ? 'PUT' : 'POST'
    const requiredQuantity = monthly_prices && monthly_prices.required_quantity > 0 ? monthly_prices.required_quantity : requiredQuantity;

    const body = {
      monthly_prices: {
        price,
        available_quantity: availableQuantity,
        required_quantity: requiredQuantity,
        quantity_bought: quantityBought,
        grocery_item_id: item_id
      }
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;
    

    fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          window.location = '/monthly_prices'
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  const onDelete = (monthly_price) => {
    if (!monthly_price)
      return;

    const url = `monthly_prices/${monthly_price.price_id}`;

    const token = document.querySelector('meta[name="csrf-token"]').content;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          window.location = '/monthly_prices'
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  return ( 
    <>
      <h3>Total Spent: <span>{total_price_today}</span></h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Required Quantity</th>
            <th scope="col">Available Quantity</th>
            <th scope="col">Quantity Bought</th>
            <th scope="col">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {grocery_items.map(({id, name}) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>
                {monthly_prices[id] && monthly_prices[id].required_quantity > 0 ? <>{monthly_prices[id].required_quantity}</> : 
                  (<input 
                    type="number" 
                    className="form-control" 
                    name="required_quantity" 
                    aria-label="Required Quantity" 
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(e.target.value)}
                  />
                )}
              </td>
              <td>
                {monthly_prices[id] && monthly_prices[id].available_quantity > 0 ? <>{monthly_prices[id].available_quantity}</> : 
                  (<input 
                    type="number" 
                    className="form-control" 
                    name="available_quantity" 
                    aria-label="Available Quantity" 
                    value={availableQuantity}
                    onChange={(e) => setAvailableQuantity(e.target.value)}
                  />
                )}
              </td>
              <td>
                {monthly_prices[id] && monthly_prices[id].quantity_bought > 0 ? <>{monthly_prices[id].quantity_bought}</> : 
                  (<input 
                    type="number" 
                    className="form-control" 
                    name="quantity_bought" 
                    aria-label="Quantity Bought" 
                    value={quantityBought}
                    onChange={(e) => setQuantityBought(e.target.value)}
                  />
                )}
              </td>
              <td>
                {monthly_prices[id] && monthly_prices[id].price > 0 ? <>{monthly_prices[id].price}</> :
                  (<input 
                    type="number" 
                    className="form-control" 
                    name="price" 
                    aria-label="Price" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                )}
              </td>
              <td>
                <button 
                  type="submit"
                  className="btn btn-primary mx-1"
                  onClick={(e) => onUpdate(id, monthly_prices[id])}
                >Update</button>
                <button 
                  type="submit"
                  className="btn btn-danger mx-1"
                  onClick={(e) => onDelete(monthly_prices[id])}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

MonthlyPrice.propTypes = {
  grocery_items: PropTypes.array,
  monthly_prices: PropTypes.object,
  total_price_today: PropTypes.number
}
export default MonthlyPrice;