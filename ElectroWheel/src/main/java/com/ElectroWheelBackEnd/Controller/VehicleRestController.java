package com.ElectroWheelBackEnd.Controller;

import com.ElectroWheelBackEnd.Models.Vehicle;

import com.ElectroWheelBackEnd.Service.VehicleService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@CrossOrigin(origins = "*")


@RestController
@RequestMapping("/vehicles")

public class VehicleRestController {

    private static final Logger LOGGER = LoggerFactory.getLogger(VehicleRestController.class);
    private final VehicleService vehicleService;

    @Autowired
    public VehicleRestController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle){
        vehicleService.createVehicle(vehicle);
        return vehicle;
    }

    @DeleteMapping("/{id}")
    public String deleteVehicle(@PathVariable int id){
        vehicleService.deleteVehicle(id);
        return "Deleted";
    }
    @GetMapping
    public List<Vehicle> retrieveAllVehicles() {
        return vehicleService.retrieveVehicles();
    }

    @GetMapping("/available")
    public List<Vehicle> retrieveAvailableVehicles() {
        return vehicleService.retrieveAvailableVehicles();
    }

    @GetMapping("/{id}")
    public Vehicle retrieveVehicleById(@PathVariable int id) {
        return vehicleService.retrieveVehicleById(id);
    }

    @GetMapping("/type_{id}")
    public List<Vehicle> retrieveVehicleByType(@PathVariable int id) {
        return vehicleService.retrieveVehiclesByType(id);
    }

    @GetMapping("/on{date}")
    public List<Vehicle> retrieveVehicleByDate(@PathVariable String date) {
        return vehicleService.retrieveVehiclesByDate(date);
    }

    @PutMapping("/available")
    public void updateVehicleAvailability(@RequestBody Vehicle vehicle){
        vehicleService.updateVehicleAvailability(vehicle);
    }

    @PutMapping
    public void updateVehicleCoordonates(@RequestBody Vehicle vehicle){
        vehicleService.updateVehicleCoordonates(vehicle);
    }






}
