import React, { useState, useEffect } from 'react';
import InvoiceService from '../services/InvoiceService';
import RentalsService from '../services/RentalsService';

import { Link } from 'react-router-dom';

const ListInvoicesComponent = () => {
  const [invoiceData, setinvoiceData] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await InvoiceService.getAllInvoices();
       const invoiceData = await Promise.all(response.data.map(async item => {
        const rentalDataResponse = await RentalsService.getRentalByInvoiceId(item.idInvoice);
        const rentalinfo = rentalDataResponse.data;
        console.log(rentalinfo.rent_Date);
         return { ...item, rentalinfo};
       }));
      setinvoiceData(invoiceData);
      console.log(invoiceData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const deleteInvoice = async (x) => {
    try {
      console.log(x);
      const response = await InvoiceService.deleteInvoice(x);
      setinvoiceData(prevData => prevData.filter(invoice => invoice.idInvoice !== x));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  
  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const applyFilters = async () => {
  try {
    switch (filterType) {
      case 'paid':
        const responsePaid = await InvoiceService.getPaidInvoices();
       
      setinvoiceData(responsePaid.data);
        
        break;
      case 'unpaid':
        const responseUnpaid = await InvoiceService.getUnPaidInvoices();
         
      setinvoiceData(responseUnpaid.data);
        
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

const getPaidStatus = (paid) => {
    return paid ? 'Yes' : 'No';
  };


  return (
    <div>
      <h2 className="text-center">Invoice List</h2>
      <div>
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value="">Select Filter</option>
          <option value="paid">Select Paid Invoices</option>
          <option value="unpaid">Select Unpaid Invoices</option>
          <option value="all">Show All Invoices</option>
        </select>
        <button className = 'btn btn-success ml-2' onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Invoice id</th>
              <th>Rent date</th>
              <th>Initial price</th>
              <th>VAT</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map(invoice =>
              <tr key={invoice.idInvoice}>
                <td>{invoice.idInvoice}</td>
                <td>{invoice.rentalinfo.rent_Date}</td>
                <td>{invoice.gross_Amount}</td>
                <td>{invoice.vat}</td>
                <td>{invoice.net_Amount}</td>
                <td>{getPaidStatus(invoice.paid)}</td>
                <td>

                   <button className="btn btn-danger mr-2" onClick={() => deleteInvoice(invoice.idInvoice)}>
                    Delete
                  </button>

                  <Link to={`/rentals/details/${invoice.rentalinfo.idRental}`} className="btn btn-info">Rental Info</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     
    </div>
  );
}

export default ListInvoicesComponent;
