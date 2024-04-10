package com.ElectroWheelBackEnd.Service;

import com.ElectroWheelBackEnd.Dao.VehicleDao;
import com.ElectroWheelBackEnd.Models.Vehicle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;


@Service

public class VehicleService {

    private static final Logger LOGGER = LoggerFactory.getLogger(VehicleService.class);

    private final VehicleDao vehicleDao;
    @Autowired
    public VehicleService(VehicleDao vehicleDao) {
        this.vehicleDao = vehicleDao;
    }

    public void createVehicle(Vehicle vehicle){
        vehicleDao.insertVehicle(vehicle);
    }

    public void deleteVehicle(int id){vehicleDao.deleteVehicle(id);}

    public void updateVehicleCoordonates(Vehicle vehicle){vehicleDao.updateVehicleCoordonates(vehicle.getIdVehicle(), vehicle.getXcoord(), vehicle.getYcoord());}

    public void updateVehicleAvailability(Vehicle vehicle){vehicleDao.updateVehicleAvailability(vehicle.getIdVehicle(), vehicle.getAvailable());}

    public Vehicle retrieveVehicleById(int id){return vehicleDao.retrieveVehicleById(id);}

    public List<Vehicle> retrieveVehicles() {
        LOGGER.info("Accessing service for vehicle retrieval");
        return vehicleDao.retrieveVehicles();
    }

    public List<Vehicle> retrieveAvailableVehicles() {
        LOGGER.info("Accessing service for vehicle retrieval");
        return vehicleDao.retrieveAvailableVehicles();
    }

    public List<Vehicle> retrieveVehiclesByType(int id) {
        LOGGER.info("Accessing service for vehicle retrieval");
        return vehicleDao.retrieveVehiclesByType(id);
    }

    public List<Vehicle> retrieveVehiclesByDate(String date) {
        LOGGER.info("Accessing service for vehicle retrieval");
        return vehicleDao.retrieveVehiclesByDate(Date.valueOf(date));
    }
}
