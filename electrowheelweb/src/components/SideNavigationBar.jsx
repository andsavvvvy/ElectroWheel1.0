import React from 'react';
import { Link } from 'react-router-dom';

const SideNavigationBar = () => {
  return (
    <div>
      <h2>ElectroWheel</h2>
      <div className="sidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/vehicles" className="nav-link button">Vehicles Roster</Link>
          </li>
        
          <li className="nav-item">
            <Link to="/customers" className="nav-link button">Customers</Link>
          </li>
           <li className="nav-item">
            <Link to="/rentals" className="nav-link button">Rentals History</Link>
          </li>
           <li className="nav-item">
            <Link to="/invoices" className="nav-link button">Invoices</Link>
          </li>
           <li className="nav-item">
            <Link to="/map" className="nav-link button">Map</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="btn btn-danger">Disconnect</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideNavigationBar;
