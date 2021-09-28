import React, { useState } from "react";
import PropTypes from 'prop-types'
import Select from 'react-select'
import moment from "moment";

const DailyExpenses = ({ daily_expenses, checklists, total_expense }) => {
  const [expenseId, setExpenseId] = useState(0)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0.0)
  const [checklist, setChecklist] = useState({})

  const onSubmit = (event) => {
    event.preventDefault();
    if (name.length == 0 || amount == 0)
      return;

    const url = expenseId == 0 ? "daily_expenses" : `daily_expenses/${expenseId}`;

    const body = {
      daily_expenses: {
        name,
        amount,
        monthly_checklist_id: checklist.value
      }
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;
    
    const method = expenseId == 0 ? 'POST' : 'PUT'

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
          window.location = '/daily_expenses'
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  const onEdit = (id, name, amount, checklist) => {
    setName(name)
    setAmount(amount)
    setChecklist({value: checklist.id, label: checklist.name})
    setExpenseId(id)
  }

  const onDelete = (id) => {
    const url = `daily_expenses/${id}`;

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
          window.location = '/daily_expenses'
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }
  
  const checklistOptions = checklists.map(l => ({value: l[0], label: l[1]}))

  return ( 
    <>
      <div className="row">
        <h2>Total Expense: <span>{total_expense}</span></h2>
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
          <input 
            type="number" 
            className="form-control" 
            placeholder="Amount" 
            name="amount" 
            aria-label="Amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="col-lg-3 col-sm-4">
          <Select 
            value={checklist}
            options={checklistOptions}
            onChange={(h) => setChecklist({value: h.value, label: h.label})}
          />
        </div>
        <div className="col-lg-2 col-sm-4">
          <button 
            type="submit" 
            className="btn btn-success"
            onClick={onSubmit}
          >{expenseId == 0 ? 'Add' : 'Update'}</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Checklist</th>
            <th scope="col">Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {daily_expenses.map(({id, name, amount, checklist, created_at}) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>{amount}</td>
              <td>{checklist.name}</td>
              <td>{moment(created_at).format('LL')}</td>
              <td>
                <button 
                  type="submit"
                  className="btn btn-primary mx-1"
                  onClick={(e) => onEdit(id, name, amount, checklist)}
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

DailyExpenses.propTypes = {
  daily_expenses: PropTypes.array,
  checklists: PropTypes.array
}
export default DailyExpenses;