import React, { useState } from "react";
import PropTypes from 'prop-types'
import Select from 'react-select'
import moment from "moment";

const GroceryItems = ({ grocery_items }) => {
  const [itemId, setItemId] = useState(0)
  const [name, setName] = useState('')
  const [unit, setUnit] = useState({})

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.length == 0 || unit == {})
      return;

    const url = itemId == 0 ? "grocery_items" : `grocery_items/${itemId}`;

    const body = {
      grocery_items: {
        name,
        unit: unit.value
      }
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;
    
    const method = itemId == 0 ? 'POST' : 'PUT'

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
          window.location = '/grocery_items'
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  const onEdit = (id, name, unit) => {
    setName(name)
    setUnit({value: unit, label: unit})
    setItemId(id)
  }

  const onDelete = (id) => {
    const url = `grocery_items/${id}`;

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
          window.location = '/grocery_items'
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }
  
  const unitListOptions = [{value: 'nos', label: 'nos'}, {value: 'liter', label: 'liter'}, {value: 'kg', label: 'kg'}]

  return ( 
    <>
      <div className="row">
        <div className="col-lg-4 col-sm-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Name" 
            name="name" 
            aria-label="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-lg-3 col-sm-4">
          <Select 
            value={unit}
            options={unitListOptions}
            onChange={(h) => setUnit({value: h.value, label: h.label})}
          />
        </div>
        <div className="col-lg-2 col-sm-4">
          <button 
            type="submit" 
            className="btn btn-success"
            onClick={onSubmit}
          >{itemId == 0 ? 'Add' : 'Update'}</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Unit</th>
            <th scope="col">Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {grocery_items.map(({id, name, unit, created_at}) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>{unit}</td>
              <td>{moment(created_at).format('LL')}</td>
              <td>
                <button 
                  type="submit"
                  className="btn btn-primary mx-1"
                  onClick={(e) => onEdit(id, name, unit)}
                >Edit</button>
                <button 
                  type="submit"
                  className="btn btn-danger mx-1"
                  onClick={(e) => onDelete(id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

GroceryItems.propTypes = {
  grocery_items: PropTypes.array
}
export default GroceryItems;