import React, { useState } from "react";
import PropTypes from 'prop-types'
import Select from 'react-select'
import moment from "moment";

const MonthlyChecklists = ({ monthly_checklists }) => {
  const [name, setName] = useState('')
  const [month, setMonth] = useState()
  const year = moment().year()

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "monthly_checklists";

    if (name.length == 0)
      return;

    const body = {
      monthly_checklists: {
        name,
        month,
        year
      }
    }
    console.log(body)
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response)
        if (response.ok) {
          window.location = '/monthly_checklists'
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

  const monthOptions = moment.months().map((m, i) => ({'value': i+1, 'label': m}))
  
  return ( 
    <>
      <div className="row">
        <div className="col-lg-3 col-sm-3">
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
        <div className="col-lg-3 col-sm-3">
          <Select 
            options={monthOptions}
            onChange={(h) => setMonth(h.value)}
          />
        </div>
        <div className="col-lg-3 col-sm-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder={year} 
            aria-label="Disabled"
            disabled readOnly
          />
        </div>
        <div className="col-lg-3 col-sm-3">
          <button 
            type="submit" 
            className="btn btn-success"
            onClick={onSubmit}
          >Add</button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Month</th>
            <th scope="col">Year</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {monthly_checklists.map(({id, name, month, year, created_at}) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>{moment().month(month-1).format('MMMM')}</td>
              <td>{year}</td>
              <td>{moment(created_at).format('LL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

MonthlyChecklists.propTypes = {
  monthly_checklists: PropTypes.array
}
export default MonthlyChecklists;