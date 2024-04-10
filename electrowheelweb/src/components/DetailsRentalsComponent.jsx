import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';
import CustomerService from '../services/CustomerService';
import InvoiceService from '../services/InvoiceService';
import RentalsService from '../services/RentalsService';


import { Link } from 'react-router-dom';

const RentalDetailsComponent = () => {
  const [rentalDetails, setRentalDetails] = useState(null);

  const { rentalId } = useParams();
 
  useEffect(() => {
    fetchData(rentalId)
  }, [rentalId]);

   const fetchData = async (rentalId) => {
  try {
    console.log(rentalId);
        const response = await RentalsService.getRentalById(rentalId);

        const vehicleDataResponse = await VehiclesService.getVehicleById(response.data.idVehicle);
        const vehicle = vehicleDataResponse.data;

        const customerDataResponse = await CustomerService.getCustomerById(response.data.idCustomer);
        const customer = customerDataResponse.data;

        const invoiceDataResponse = await InvoiceService.getInvoiceById(response.data.idInvoice);
        const invoice = invoiceDataResponse.data;

        const typeDataResponse = await VehicleTypesService.getVehicleTypeById(vehicle.idVehicle_Type);
        const type = typeDataResponse.data;

        const rentalData = { ...response.data, vehicle, customer, invoice, type };
       console.log(rentalData);
      setRentalDetails(rentalData);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const getTripText = (time1, time2) => {
    return time1 === time2 ? 'Ongoing' : time2;
  };


 const getPaidText = (paid) => {
    return paid ? 'Yes' : 'No';
  };

  return (
    <div>
      <h2>Rental Details</h2>
      {rentalDetails ? (
              <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Rent Date</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Vehicle Register Date</th>
              <th>Vehicle Type</th>
              <th>Customer Email</th>
              <th>Customer Warning level</th>
              <th>Net Amount</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr key={rentalDetails.idRental}>
                <td>{rentalDetails.rent_Date}</td>
                <td>{rentalDetails.start_Ride}</td>
                <td>{getTripText(rentalDetails.start_Ride, rentalDetails.end_Ride)}</td>
                <td>{rentalDetails.vehicle.registerDate}</td>
                <td>{rentalDetails.type.description_Vehicle}</td>
                <td>{rentalDetails.customer.email}</td>
                <td>{rentalDetails.customer.warningLevel}</td>
                <td>{rentalDetails.invoice.net_Amount}</td>
                <td>{getPaidText(rentalDetails.invoice.paid)}</td>
                
              </tr>
            }
          </tbody>
        </table>

       <div style={{ display: 'flex', gap: '10px' }}>
        <Link to={`/customers/details/${rentalDetails.idCustomer}`} className="btn btn-info">Customer Info</Link>
        
        <Link to={`/vehicles/details/${rentalDetails.idVehicle}`} className="btn btn-success">Vehicle Info</Link>
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
       

    </div>
  );
};

export default RentalDetailsComponent;