package com.ElectroWheelBackEnd.Service;

import com.ElectroWheelBackEnd.Dao.Vehicle_TypeDao;
import com.ElectroWheelBackEnd.Models.Vehicle_Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service

public class Vehicle_TypeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(Vehicle_TypeService.class);

    private final Vehicle_TypeDao typeDao;
    @Autowired
    public Vehicle_TypeService(Vehicle_TypeDao vehicleTypeDao) {
        this.typeDao = vehicleTypeDao;
    }

    public void createVehicleType(Vehicle_Type type){
        typeDao.insertVehicleType(type);
    }

    public void deleteVehicleType(int id){typeDao.deleteVehicleType(id);}

    public void updateVehicleTypePricePerMinute(Vehicle_Type type){
        typeDao.updateVehicleTypePricePerMinute(type.getIdVehicle_Type(), type.getPrice_Per_Minute());
    }

    public Vehicle_Type retrieveTypeById(int id){
        return typeDao.retrieveTypeById(id);
    }

    public List<Vehicle_Type> retrieveVehicleTypes() {
        LOGGER.info("Accessing service for vehicle type retrieval");
        return typeDao.retrieveVehicleTypes();
    }
}
