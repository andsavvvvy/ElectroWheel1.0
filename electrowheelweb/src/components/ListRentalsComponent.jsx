import React, { useState, useEffect } from 'react';
import VehiclesService from '../services/VehiclesService';
import RentalsService from '../services/RentalsService';
import CustomerService from '../services/CustomerService';
import InvoiceService from '../services/InvoiceService';


import { Link } from 'react-router-dom';

const ListRentalsComponent = () => {
  const [rentalData, setrentalData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await RentalsService.getAllRentals();
      const rentalData = await Promise.all(response.data.map(async item => {
        const vehicleDataResponse = await VehiclesService.getVehicleById(item.idVehicle);
        const vehicle = vehicleDataResponse.data;
        console.log(vehicle);

        const customerDataResponse = await CustomerService.getCustomerById(item.idCustomer);
        const customer = customerDataResponse.data;

        const invoiceDataResponse = await InvoiceService.getInvoiceById(item.idInvoice);
        const invoice = invoiceDataResponse.data;
        return { ...item, vehicle, customer, invoice };
      }));
      setrentalData(rentalData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteRental = async (x) => {
    try {
      console.log(x);
      const response = await RentalsService.deleteRental(x);
      setrentalData(prevData => prevData.filter(rental => rental.idRental !== x));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const getTripText = (time1, time2) => {
    return time1 === time2 ? 'Ongoing' : 'Finished';
  };

   const getPaidText = (paid) => {
    return paid ? 'Yes' : 'No';
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    if (event.target.value === 'ongoing' || event.target.value === 'all') {

      setFilterValue('');
    }
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const applyFilters = async () => {
  try {
    switch (filterType) {
      case 'ongoing':
        const responseOngoing = await RentalsService.getOngoingRentals();
        const rentalData1 = await Promise.all(responseOngoing.data.map(async item => {
          const vehicleDataResponse = await VehiclesService.getVehicleById(item.idVehicle);
        const vehicle = vehicleDataResponse.data;
      
        const customerDataResponse = await CustomerService.getCustomerById(item.idCustomer);
        const customer = customerDataResponse.data;

        const invoiceDataResponse = await InvoiceService.getInvoiceById(item.idInvoice);
        const invoice = invoiceDataResponse.data;
        return { ...item, vehicle, customer, invoice };
      }));
      setrentalData(rentalData1);
        
        break;
      case 'rentDate':
        const responseByDate = await RentalsService.getRentalByDate(filterValue);
         const rentalData2 = await Promise.all(responseByDate.data.map(async item => {
          const vehicleDataResponse = await VehiclesService.getVehicleById(item.idVehicle);
        const vehicle = vehicleDataResponse.data;

        const customerDataResponse = await CustomerService.getCustomerById(item.idCustomer);
        const customer = customerDataResponse.data;

        const invoiceDataResponse = await InvoiceService.getInvoiceById(item.idInvoice);
        const invoice = invoiceDataResponse.data;
        return { ...item, vehicle, customer, invoice };
      }));
      setrentalData(rentalData2);
        
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
      <h2 className="text-center">Rental History</h2>
      <div>
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value="">Select Filter</option>
          <option value="ongoing">Select ongoing Rentals</option>
          <option value="rentDate">Select by Rent Date</option>
          <option value="all">Show All Rentals</option>
        </select>
        {filterType !== 'ongoing' && filterType !== 'all' && filterType && (
          <input type="text" value={filterValue} onChange={handleFilterValueChange} />
        )}
        <button className = 'btn btn-success ml-2' onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Rental Id</th>
              <th>Rental Date</th>
              <th>Status</th>
              <th>Vehicle Id</th>
              <th>Customer Email</th>
              <th>Invoice Id</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentalData.map(rental =>
              <tr key={rental.idRental}>
                <td>{rental.idRental}</td>
                <td>{rental.rent_Date}</td>
                <td>{getTripText(rental.start_Ride, rental.end_Ride)}</td>
                <td>{rental.vehicle.idVehicle}</td>
                <td>{rental.customer.email}</td>
                <td>{rental.invoice.idInvoice}</td>
                <td>{getPaidText(rental.invoice.paid)}</td>
                <td>

                   <button className="btn btn-danger mr-2" onClick={() => deleteRental(rental.idRental)}>
                    Delete
                  </button>

                  <Link to={`/rentals/details/${rental.idRental}`} className="btn btn-info">Details</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListRentalsComponent;
