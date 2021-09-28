import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Dashboard = ({ greeting }) => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Hello, ...</h1>
        <p className="lead">
          {greeting}
        </p>
        <hr className="my-4" />
      </div>
    </div>
  </div>
)

Dashboard.propTypes = {
  greeting: PropTypes.string
}

export default Dashboard