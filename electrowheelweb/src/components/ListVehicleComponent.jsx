import React, { useState, useEffect } from 'react';
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';
import { Link } from 'react-router-dom';

const ListVehicle = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await VehiclesService.getAllVehicles();
      const typeData = await Promise.all(response.data.map(async item => {
        const typeDataResponse = await VehicleTypesService.getVehicleTypeById(item.idVehicle_Type);
        const type = typeDataResponse.data;
        return { ...item, type };
      }));
      setVehicleData(typeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleAvailability = async (payload) => {
    try {
      const response = await VehiclesService.updateVehicleAvailability(payload);
     fetchData();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const deleteVehicle = async (x) => {
    try {
      console.log(x);
      const response = await VehiclesService.deleteVehicle(x);
      setVehicleData(prevData => prevData.filter(vehicle => vehicle.idVehicle !== x));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const getStatusText = (available) => {
    return available ? 'Available' : 'Busy';
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    if (event.target.value === 'availability' || event.target.value === 'all') {

      setFilterValue('');
    }
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const applyFilters = async () => {
  try {
    switch (filterType) {
      case 'typeId':
        const responseById = await VehiclesService.getVehicleByTypeId(filterValue);
        const typeData1 = await Promise.all(responseById.data.map(async item => {
         const typeDataResponse = await VehicleTypesService.getVehicleTypeById(item.idVehicle_Type);
         const type = typeDataResponse.data;
         return { ...item, type };
      }));
      setVehicleData(typeData1);
        
        break;
      case 'registerDate':
        const responseByDate = await VehiclesService.getVehicleByDate(filterValue);
         const typeData2 = await Promise.all(responseByDate.data.map(async item => {
         const typeDataResponse = await VehicleTypesService.getVehicleTypeById(item.idVehicle_Type);
         const type = typeDataResponse.data;
         return { ...item, type };
      }));
      setVehicleData(typeData2);
        
        break;
      case 'availability':
         const responseByAv = await VehiclesService.getAvailableVehicles();
         const typeData3 = await Promise.all(responseByAv.data.map(async item => {
         const typeDataResponse = await VehicleTypesService.getVehicleTypeById(item.idVehicle_Type);
         const type = typeDataResponse.data;
         return { ...item, type };
      }));
      setVehicleData(typeData3);
        
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
        <Link to="/vehicles/add-vehicles" className="btn btn-primary mr-2">Add Vehicle</Link>
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value="">Select Filter</option>
          <option value="typeId">Select by Vehicle type Id</option>
          <option value="registerDate">Select by Register Date</option>
          <option value="availability">Select available vehicles</option>
          <option value="all">Show All Vehicles</option>
        </select>
        {filterType !== 'availability' && filterType !== 'all' && filterType && (
          <input type="text" value={filterValue} onChange={handleFilterValueChange} />
        )}
        <button className = 'btn btn-success ml-2' onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Vehicle id</th>
              <th>Vehicle Register Date</th>
              <th>Vehicle Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map(vehicle =>
              <tr key={vehicle.idVehicle}>
                <td>{vehicle.idVehicle}</td>
                <td>{vehicle.registerDate}</td>
                <td>{vehicle.type.description_Vehicle}</td>
                <td>{getStatusText(vehicle.available)}</td>
                <td>
                  <button className="btn btn-warning mr-2" onClick={() => toggleAvailability({idVehicle: vehicle.idVehicle,  available: vehicle.available ? 0 : 1 })}>
                    Change Status
                  </button>

                   <button className="btn btn-danger mr-2" onClick={() => deleteVehicle(vehicle.idVehicle)}>
                    Delete
                  </button>

                  <Link to={`/vehicles/details/${vehicle.idVehicle}`} className="btn btn-info">Details</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListVehicle;
