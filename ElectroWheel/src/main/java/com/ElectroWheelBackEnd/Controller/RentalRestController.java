package com.ElectroWheelBackEnd.Controller;

import com.ElectroWheelBackEnd.Models.Invoice;
import com.ElectroWheelBackEnd.Models.Rental;

import com.ElectroWheelBackEnd.Service.RentalService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/rentals")


public class RentalRestController {

    private static final Logger LOGGER = LoggerFactory.getLogger(RentalRestController.class);
    private final RentalService rentalService;

    @Autowired
    public RentalRestController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping
    public Rental createRental(@RequestBody Rental rental){
        rentalService.createRental(rental);
        return rental;
    }

    @PutMapping
    public void updateRentalAfterEndOfTrip(@RequestBody Rental rental){
        rentalService.updateRentalAfterEndOfTrip(rental);
    }

    @DeleteMapping("/{id}")
    public void deleteRental(@PathVariable int id){
        rentalService.deleteRental(id);
    }
    @GetMapping
    public List<Rental> retrieveAllRentals() {
        return rentalService.retrieveRental();
    }
    @GetMapping("/{id}")
    public Rental retrieveRentalsById(@PathVariable int id) {
        return rentalService.retrieveRentalById(id);
    }

    @GetMapping("/on{date}")
    public List<Rental> retrieveRentalsByDate(@PathVariable String date) {
        return rentalService.retrieveRentalByDate(date);
    }

    @GetMapping("/latestId")
    public int retrieveIdForNewRental() {
        return rentalService.retrieveIdForNewRental();
    }
    @GetMapping("/ongoing")
    public List<Rental> retrieveOngoingRentals() {
        return rentalService.retrieveOngoingRental();
    }

    @GetMapping("/customer_{id}")
    public List<Rental> retrieveRentalsByCustomerId(@PathVariable int id) {
        System.out.println(id);
        return rentalService.retrieveRentalByCustomerId(id);
    }

    @GetMapping("/vehicle_{id}")
    public List<Rental> retrieveRentalsByVehicleId(@PathVariable int id) {
        return rentalService.retrieveRentalByVehicleId(id);
    }

    @GetMapping("/invoice_{id}")
    public Rental retrieveRentalsByInvoiceId(@PathVariable int id) {
        return rentalService.retrieveRentalByInvoiceId(id);
    }
}
