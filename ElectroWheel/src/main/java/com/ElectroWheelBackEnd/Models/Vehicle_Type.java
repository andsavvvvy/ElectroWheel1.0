package com.ElectroWheelBackEnd.Models;

public class Vehicle_Type {

    private final int idVehicle_Type;

    private final String description_Vehicle;
    private final float price_Per_Minute;

    public Vehicle_Type(int idVehicleType, String descriptionVehicle, float pricePerMinute) {
        idVehicle_Type = idVehicleType;
        description_Vehicle = descriptionVehicle;
        price_Per_Minute = pricePerMinute;
    }

    public Vehicle_Type(){
        idVehicle_Type = 0;
        description_Vehicle = "NotFound";
        price_Per_Minute = 0;
    }

    public int getIdVehicle_Type() {
        return idVehicle_Type;
    }

    public String getDescription_Vehicle() {
        return description_Vehicle;
    }

    public float getPrice_Per_Minute() {
        return price_Per_Minute;
    }
}
