import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import { Link } from 'react-router-dom';

const ListCustomersComponent = () => {
  const [customerData, setcustomerData] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await CustomerService.getAllCustomers();
      
      setcustomerData(response.data);
      console.log(customerData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleWarningLvl = async (payload) => {
    try {
        console.log(payload);
      const response = await CustomerService.updateCustomerWarningLevel(payload);
     fetchData();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };


  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
 
  };

  const applyFilters = async () => {
  try {
    switch (filterType) {
      
      case 'banned':
        const responseBan = await CustomerService.getBannedCustomers();
        
      setcustomerData(responseBan.data);
        
        break;

         case 'all':
        fetchData(); 
        break;
      default:
       console.log("No filter selected");
        break;
    }
  } catch (error) {
    console.error('Error applying filters:', error);
  }
};


  return (
    <div>
      <h2 className="text-center">Vehicle List</h2>
      <div>
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value="">Select Filter</option>
          <option value="banned">Show banned Customers</option>
          <option value="all">Show All Customers</option>
        </select>
        <button className = 'btn btn-success ml-2' onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Billing Address</th>
              <th>Warning Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map(customer =>
              <tr key={customer.idCustomer}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.billingAddress}</td>
                <td>{customer.warningLevel}</td>
               <td>
  <div className="btn-group">
    <select
      className="custom-select"
      onChange={(event) => {
        const selectedLevel = parseInt(event.target.value);
        toggleWarningLvl({ idCustomer: customer.idCustomer, warningLevel: selectedLevel });
      }}
    >
      <option disabled selected>Change Warning Level</option>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
       </div>

           <Link to={`/customers/details/${customer.idCustomer}`} className="btn btn-info ml-2">Details</Link>
          </td>


              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListCustomersComponent;
