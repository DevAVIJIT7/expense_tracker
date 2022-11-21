import React from 'react'
import PropTypes from 'prop-types'
import BarChart from './dashboard/BarChart'

const data = [
  {month: 1, expenditure: 80000},
  {month: 2, expenditure: 70000},
  {month: 3, expenditure: 52000},
  {month: 4, expenditure: 43345},
  {month: 5, expenditure: 87000},
  {month: 6, expenditure: 32000},
  {month: 7, expenditure: 12009},
  {month: 8, expenditure: 12750},
  {month: 9, expenditure: 62890},
  {month: 10, expenditure: 54300},
  {month: 11, expenditure: 91890},
  {month: 12, expenditure: 76540},
]

const Dashboard = ({ greeting }) => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="container secondary-color">
      <BarChart data={data} />
    </div>
  </div>
)

Dashboard.propTypes = {
  greeting: PropTypes.string
}

export default Dashboard