import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';
import CustomerService from '../services/CustomerService';
import InvoiceService from '../services/InvoiceService';
import RentalsService from '../services/RentalsService';


import { Link } from 'react-router-dom';

const CustomerDetailsComponent = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [rentalDetails, setRentalDetails] = useState([]);

  const { customerId } = useParams();
 
  useEffect(() => {
    fetchData(customerId)
  }, [customerId]);

   const toggleWarningLvl = async (payload) => {
    try {
        console.log(payload);
      const response = await CustomerService.updateCustomerWarningLevel(payload);
     fetchData(customerId);
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

   const fetchData = async (customerId) => {
  try {
    const response = await CustomerService.getCustomerById(customerId);
   
    setCustomerDetails(response.data);


    const responseRental = await RentalsService.getRentalByCustomerId(customerId);
      const rentalData = await Promise.all(responseRental.data.map(async item => {
        const vehicleDataResponse = await VehiclesService.getVehicleById(item.idVehicle);
        const vehicle = vehicleDataResponse.data;
        console.log(vehicle);

        const invoiceDataResponse = await InvoiceService.getInvoiceById(item.idInvoice);
        const invoice = invoiceDataResponse.data;

        const typeDataResponse = await VehicleTypesService.getVehicleTypeById(vehicle.idVehicle_Type);
        const type = typeDataResponse.data;
        return { ...item, vehicle, invoice, type };
      }));
      setRentalDetails(rentalData);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getTripText = (time1, time2) => {
    return time1 === time2 ? 'Ongoing' : 'Finished';
  };


 const getPaidText = (paid) => {
    return paid ? 'Yes' : 'No';
  };

  return (
    <div>
      <h2>Customer Details</h2>
      {customerDetails ? (
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
            {
              <tr key={customerDetails.idCustomer}>
                <td>{customerDetails.firstName}</td>
                <td>{customerDetails.lastName}</td>
                <td>{customerDetails.email}</td>
                <td>{customerDetails.billingAddress}</td>
                <td>{customerDetails.warningLevel}</td>
               <td>
                 <div className="btn-group">
           <select
              className="custom-select"
                onChange={(event) => {
                  const selectedLevel = parseInt(event.target.value);
                    toggleWarningLvl({ idCustomer: customerDetails.idCustomer, warningLevel: selectedLevel });
      }}
    >
      <option disabled selected>Change Warning Level</option>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
       </div>

          </td>
              </tr>
            }
          </tbody>
        </table>

        <h2>This Customer's Rentals</h2>
  
       <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
               <th>Rental Id</th>
              <th>Rental Date</th>
              <th>Status</th>
              <th>Vehicle Id</th>
              <th>Vehicle Type</th>
              <th>Invoice Id</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           {rentalDetails.map(rental =>
              <tr key={rental.idRental}>
                <td>{rental.idRental}</td>
                <td>{rental.rent_Date}</td>
                <td>{getTripText(rental.start_Ride, rental.end_Ride)}</td>
                <td>{rental.vehicle.idVehicle}</td>
                <td>{rental.type.description_Vehicle}</td>
                <td>{rental.invoice.idInvoice}</td>
                <td>{getPaidText(rental.invoice.paid)}</td>
                <td>
                  <Link to={`/rentals/details/${rental.idRental}`} className="btn btn-info mr-2">Rental Info</Link>
                  <Link to={`/vehicles/details/${rental.idVehicle}`} className="btn btn-success mr-2">Vehicle Info</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      

      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerDetailsComponent;