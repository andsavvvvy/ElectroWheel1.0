package com.ElectroWheelBackEnd.Models;

public class Customer {

    private final int idCustomer;
    private final String firstName;
    private final String lastName;
    private final String email;

    private final String password;

    private final String billingAddress;
    private final short warningLevel;
    public Customer(int id, String firstName, String lastName, String email, String password, String billingAddress, short warningLvl) {
        this.idCustomer = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.billingAddress = billingAddress;
        this.warningLevel = warningLvl;
    }

    public Customer() {
        this.idCustomer = 0;
        this.firstName = "";
        this.lastName = "";
        this.email = "NotFound";
        this.password = "";
        this.billingAddress = "";
        this.warningLevel = 0;
    }

    public int getIdCustomer() {
        return idCustomer;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public short getWarningLevel() {
        return warningLevel;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }



}
