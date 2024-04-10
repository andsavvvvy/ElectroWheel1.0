package com.ElectroWheelBackEnd.Models;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

public class Rental {

    private final int idRental;
    private final int idVehicle;
    private final int idCustomer;
    private final Date rent_Date;
    private final Time start_Ride;
    private final Time end_Ride;
    private final int idInvoice;

    public Rental(int idRental, int idVehicle, int idCustomer, Date rentDate, Time start_Ride, Time end_Ride, int idInvoice) {
        this.idRental = idRental;
        this.idVehicle = idVehicle;
        this.idCustomer = idCustomer;
        rent_Date = rentDate;
        this.start_Ride = start_Ride;
        this.end_Ride = end_Ride;
        this.idInvoice = idInvoice;
    }

    public Rental(){
        this.idRental = 0;
        this.idVehicle = 0;
        this.idCustomer = 0;
        rent_Date = Date.valueOf("1900-01-01");
        this.start_Ride = Time.valueOf("00:00:00");
        this.end_Ride = Time.valueOf("00:00:00");
        this.idInvoice = 0;
    }


    public int getIdRental() {
        return idRental;
    }

    public int getIdVehicle() {
        return idVehicle;
    }

    public int getIdCustomer() {
        return idCustomer;
    }



    public int getIdInvoice() {
        return idInvoice;
    }

    public Date getRent_Date() {
        return rent_Date;
    }

    public Time getStart_Ride() {
        return start_Ride;
    }

    public Time getEnd_Ride() {
        return end_Ride;
    }
}
