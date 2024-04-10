import React, { useState, useEffect, Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';

const InteractiveMap = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await VehiclesService.getAllVehicles();
      const vehiclesWithTypes = await Promise.all(response.data.map(async vehicle => {
        const typeDataResponse = await VehicleTypesService.getVehicleTypeById(vehicle.idVehicle_Type);
        const type = typeDataResponse.data;
        return { ...vehicle, type };
      }));
      setVehicles(vehiclesWithTypes.filter(vehicle => vehicle.available !== 0));
      console.log(vehicles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleAvailability = async (payload) => {
    try {
      await VehiclesService.updateVehicleAvailability(payload);
      fetchData();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  return (
    <div style={{ width: '1270px', height: '550px' }}>
      <MapContainer center={[44.4268, 26.1025]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.idVehicle}
            position={[vehicle.xcoord, vehicle.ycoord]}
            eventHandlers={{
              click: () => setSelectedVehicle(vehicle)
            }}
          />
        ))}
        {selectedVehicle && (
          <Popup position={[selectedVehicle.xcoord, selectedVehicle.ycoord]}>
            <div>
              <p>Vehicle ID: {selectedVehicle.idVehicle}</p>
              <p>Vehicle Type: {selectedVehicle.type.description_Vehicle}</p>
              <Link to={`/vehicles/details/${selectedVehicle.idVehicle}`} className="btn btn-info mr-2">Details</Link>
              <button className="btn btn-danger" onClick={() => toggleAvailability({ idVehicle: selectedVehicle.idVehicle, available: 0 })}>Remove Marker</button>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );

};

export default InteractiveMap;