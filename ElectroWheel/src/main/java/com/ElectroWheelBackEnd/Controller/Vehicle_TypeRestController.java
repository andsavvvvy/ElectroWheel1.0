package com.ElectroWheelBackEnd.Controller;

import com.ElectroWheelBackEnd.Models.Vehicle_Type;

import com.ElectroWheelBackEnd.Service.Vehicle_TypeService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/vehicletypes")

public class Vehicle_TypeRestController {

    private static final Logger LOGGER = LoggerFactory.getLogger(Vehicle_TypeService.class);
    private final Vehicle_TypeService vehicleTypeService;

    @Autowired
    public Vehicle_TypeRestController(Vehicle_TypeService vehicleTypeService) {
        this.vehicleTypeService = vehicleTypeService;
    }

    @PostMapping
    public Vehicle_Type createVehicleType(@RequestBody Vehicle_Type vehicleType){
        vehicleTypeService.createVehicleType(vehicleType);
        return vehicleType;
    }

    @PutMapping
    public void updateVehicleTypePricePerMinute(@RequestBody Vehicle_Type vehicleType){
        System.out.println(vehicleType.getPrice_Per_Minute());
        vehicleTypeService.updateVehicleTypePricePerMinute(vehicleType);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicleType(@PathVariable int id){
        System.out.println(id);
        vehicleTypeService.deleteVehicleType(id);
    }
    @GetMapping
    public List<Vehicle_Type> retrieveAllVehicleTypes() {
        return vehicleTypeService.retrieveVehicleTypes();
    }

    @GetMapping("/{id}")
    public Vehicle_Type retrieveTypeById(@PathVariable int id) {
        return vehicleTypeService.retrieveTypeById(id);
    }


}
