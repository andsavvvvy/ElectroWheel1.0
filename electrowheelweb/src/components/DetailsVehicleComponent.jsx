import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';
import CustomerService from '../services/CustomerService';
import InvoiceService from '../services/InvoiceService';
import RentalsService from '../services/RentalsService';


import { Link } from 'react-router-dom';

const VehicleDetailsComponent = () => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [rentalDetails, setRentalDetails] = useState([]);

  const { vehicleId } = useParams();
 
  useEffect(() => {
    fetchData(vehicleId)
  }, [vehicleId]);

  const getStatusText = (available) => {
    return available ? 'Available' : 'Busy';
  };

   const fetchData = async (vehicleId) => {
  try {
    const response = await VehiclesService.getVehicleById(vehicleId);
    const typeDataResponse = await VehicleTypesService.getVehicleTypeById(response.data.idVehicle_Type);
    const type = typeDataResponse.data;
    const vehicleWithDetails = { ...response.data, type };
    setVehicleDetails(vehicleWithDetails);


    const responseRental = await RentalsService.getRentalByVehicleId(vehicleId);
      const rentalData = await Promise.all(responseRental.data.map(async item => {
       

        const customerDataResponse = await CustomerService.getCustomerById(item.idCustomer);
        const customer = customerDataResponse.data;

        const invoiceDataResponse = await InvoiceService.getInvoiceById(item.idInvoice);
        const invoice = invoiceDataResponse.data;
        return { ...item, customer, invoice };
      }));
      setRentalDetails(rentalData);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const toggleAvailability = async (payload) => {
    try {
      const response = await VehiclesService.updateVehicleAvailability(payload);
     fetchData(vehicleId);
    } catch (error) {
      console.error('Error toggling availability:', error);
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
      <h2>Vehicle Details</h2>
      {vehicleDetails ? (
              <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Vehicle Register Date</th>
              <th>Vehicle Type</th>
              <th>Vehicle Price per Minute</th>
              <th>Status</th>
              <th>Coordonates: Latitude</th>
              <th>Coordonates: Longitude</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr key={vehicleDetails.idVehicle}>
                <td>{vehicleDetails.registerDate}</td>
                <td>{vehicleDetails.type.description_Vehicle}</td>
                <td>{vehicleDetails.type.price_Per_Minute}</td>
                <td>{getStatusText(vehicleDetails.available)}</td>
                <td>{vehicleDetails.xcoord}</td>
                <td>{vehicleDetails.ycoord}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => toggleAvailability({idVehicle: vehicleDetails.idVehicle,  available: vehicleDetails.available ? 0 : 1 })}>
                    Change Status
                  </button>

                </td>
              </tr>
            }
          </tbody>
        </table>

        <h2>Rentals of this Vehicle</h2>
  
       <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
               <th>Rental Id</th>
              <th>Rental Date</th>
              <th>Status</th>
              <th>Customer Email</th>
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
                <td>{rental.customer.email}</td>
                <td>{rental.invoice.idInvoice}</td>
                <td>{getPaidText(rental.invoice.paid)}</td>
                <td>
                  <Link to={`/rentals/details/${rental.idRental}`} className="btn btn-info mr-2">Rental Info</Link>
                  <Link to={`/customers/details/${rental.idCustomer}`} className="btn btn-success">Customer Info</Link>
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

export default VehicleDetailsComponent;