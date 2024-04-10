package com.ElectroWheelBackEnd.Service;

import com.ElectroWheelBackEnd.Dao.RentalDao;
import com.ElectroWheelBackEnd.Dao.Vehicle_TypeDao;
import com.ElectroWheelBackEnd.Models.Invoice;
import com.ElectroWheelBackEnd.Models.Rental;
import com.ElectroWheelBackEnd.Models.Vehicle_Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;


@Service
public class RentalService {

    private static final Logger LOGGER = LoggerFactory.getLogger(RentalService.class);

    private final RentalDao rentalDao;
    @Autowired
    public RentalService(RentalDao rentalDao) {
        this.rentalDao = rentalDao;
    }

    public void createRental(Rental rental){
        rentalDao.insertRental(rental);
    }

    public void deleteRental(int id){rentalDao.deleteRental(id);}

    public Rental retrieveRentalById(int id){return rentalDao.retrieveRentalById(id);}

    public void updateRentalAfterEndOfTrip(Rental rental){
        rentalDao.updateRentalAfterEndOfTrip(rental.getIdRental(), rental.getEnd_Ride(), rental.getIdInvoice());
    }

    public List<Rental> retrieveRental() {
        LOGGER.info("Accessing service for rental retrieval");
        return rentalDao.retrieveRentals();
    }

    public int retrieveIdForNewRental() {
        LOGGER.info("Accessing service for rental retrieval");
        List<Rental> searchId = rentalDao.retrieveRentals();
        Rental lastRental = searchId.get(searchId.size() - 1);
        return lastRental.getIdRental() + 1;

    }



    public List<Rental> retrieveRentalByCustomerId(int id) {
        LOGGER.info("Accessing service for rental retrieval");
        return rentalDao.retrieveRentalsByCustomerId(id);
    }

    public Rental retrieveRentalByInvoiceId(int id) {
        LOGGER.info("Accessing service for rental retrieval");
        return rentalDao.retrieveRentalsByInvoiceId(id);
    }



    public List<Rental> retrieveRentalByVehicleId(int id) {
        LOGGER.info("Accessing service for rental retrieval");
        return rentalDao.retrieveRentalsByVehicleId(id);
    }

    public List<Rental> retrieveRentalByDate(String date) {
        LOGGER.info("Accessing service for rental retrieval");
        return rentalDao.retrieveRentalsByDate(Date.valueOf(date));
    }

    public List<Rental> retrieveOngoingRental() {
        LOGGER.info("Accessing service for rental retrieval");
        return rentalDao.retrieveOngoingRentals();
    }

}
