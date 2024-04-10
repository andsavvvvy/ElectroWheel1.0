import React, { useState, useEffect } from 'react';
import VehicleTypesService from '../services/VehicleTypesService';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const ListVehicleType = () => {
  const [vehicleTypeData, setVehicleTypeData] = useState([]);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await VehicleTypesService.getAllVehicleTypes();
      setVehicleTypeData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const togglePricePerMinute = async (payload) => {
    try {
      const response = await VehicleTypesService.updateVehiclePricePerMinute(payload);
      console.log(payload);
      fetchData();
    } catch (error) {
      console.error('Error toggling price per minute:', error);
    }
  };

  const deleteType = async (typeId) => {
    try {
      const response = await VehicleTypesService.deleteVehicleType(typeId);
      setVehicleTypeData(prevData => prevData.filter(type => type.idVehicle_Type !== typeId));
    } catch (error) {
      console.error('Error deleting vehicle type:', error);
    }
  };

  const handleNewPriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleUpdatePrice = (typeId) => {
    const payload = { idVehicle_Type: typeId, price_Per_Minute: parseFloat(newPrice) };
    togglePricePerMinute(payload);
    setNewPrice(''); 
  };

  return (
    <div>
      <h2 className="text-center">Vehicle Type List</h2>
      <div>
        <Link to="/vehicletypes/add-types" className="btn btn-primary">Add Type</Link>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Type id</th>
              <th>Description</th>
              <th>Price per minute</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicleTypeData.map(type =>
              <tr key={type.idVehicle_Type}>
                <td>{type.idVehicle_Type}</td>
                <td>{type.description_Vehicle}</td>
                <td>{type.price_Per_Minute}</td>
                <td>
                  <div className="d-flex">
                    <div className="mr-2">
                      <input
                        
                        className="form-control"
                        placeholder="Update Price"
                        value={newPrice}
                        onChange={handleNewPriceChange}
                      />
                    </div>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdatePrice(type.idVehicle_Type)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => deleteType(type.idVehicle_Type)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListVehicleType;
