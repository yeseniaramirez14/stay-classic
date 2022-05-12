import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="dropdown">
                <a className="btn btn-success btn-lg dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Inventory
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <NavLink className="dropdown-item" to="/manufacturers">List of Manufacturers</NavLink> 
                  <NavLink className="dropdown-item" to="/manufacturers/new/">Create a Manufacturer</NavLink> 
                  <NavLink className="dropdown-item" to="/models">List of Models</NavLink> 
                  <NavLink className="dropdown-item" to="/models/new">Create a Model</NavLink> 
                  <NavLink className="dropdown-item" to="automobiles/">List of Automobiles</NavLink> 
                  <NavLink className="dropdown-item" to="automobiles/new/">Create an Automobile</NavLink> 
                </div>
          </div>
          <div className="dropdown">
                <a className="btn btn-success btn-lg dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Services
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <NavLink className="dropdown-item" to="technicians">List of Technicians</NavLink> 
                  <NavLink className="dropdown-item" to="technicians/new">Create a Technician</NavLink> 
                  <NavLink className="dropdown-item" to="services">List of Services</NavLink> 
                  <NavLink className="dropdown-item" to="services/new">Create a New Service</NavLink> 
                  <NavLink className="dropdown-item" to="servicehistory">Service History</NavLink> 
                </div>
          </div>
          <div className="dropdown">
                <a className="btn btn-success btn-lg dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sales
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <NavLink className="dropdown-item" to="salesreps/new">Create a New Sales Rep</NavLink> 
                  <NavLink className="dropdown-item" to="customers/new">Create a New Customer</NavLink> 
                  <NavLink className="dropdown-item" to="salesrecords/">List of Sales Records</NavLink> 
                  <NavLink className="dropdown-item" to="salesrecords/new">Create a Sales Record</NavLink> 
                  <NavLink className="dropdown-item" to="targetedrecords/">Targeted Sales Records</NavLink> 
                </div>
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Nav;
