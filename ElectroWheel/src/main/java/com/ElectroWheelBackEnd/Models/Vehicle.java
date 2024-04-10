package com.ElectroWheelBackEnd.Models;

import java.sql.Date;

public class Vehicle {

    private final int idVehicle;
    private final int idVehicle_Type;
    private final Date registerDate;
    private final float xcoord;
    private final float ycoord;
    private final short available;


    public Vehicle(int idVehicle, int idVehicleType, Date registerDate, float xcoord, float ycoord, short available) {
        this.idVehicle = idVehicle;
        idVehicle_Type = idVehicleType;
        this.registerDate = registerDate;
        this.xcoord = xcoord;
        this.ycoord = ycoord;
        this.available = available;
    }

    public Vehicle(){
        this.idVehicle = 0;
        idVehicle_Type = 0;
        this.registerDate = Date.valueOf("1900-01-01");
        this.xcoord = 0;
        this.ycoord = 0;
        this.available = 0;
    }

    public int getIdVehicle() {
        return idVehicle;
    }

    public int getIdVehicle_Type() {
        return idVehicle_Type;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public float getXcoord() {
        return xcoord;
    }

    public float getYcoord() {
        return ycoord;
    }

    public short getAvailable() {
        return available;
    }

}
