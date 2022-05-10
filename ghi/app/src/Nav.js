import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/manufacturers">List of Manufacturers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/manufacturers/new/">Create a Manufacturer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/models">List of Models</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/models/new">Create a vehicle model</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="automobiles/">List of Automobiles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="automobiles/new/">Create an Automobile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="services">List of Services</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="services/new">Create a new Services</NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
