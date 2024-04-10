package com.ElectroWheelBackEnd.Models;

public class Admin {

    private final int idAdmin;
    private final String email;
    private final String password;

    public Admin(int idAdmin, String email, String password) {
        this.idAdmin = idAdmin;
        this.email = email;
        this.password = password;
    }

    public Admin() {
        this.idAdmin = 0;
        this.email = "NotFound";
        this.password = "";
    }

    public int getIdAdmin() {
        return idAdmin;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
