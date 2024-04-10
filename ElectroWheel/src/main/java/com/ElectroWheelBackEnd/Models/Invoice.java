package com.ElectroWheelBackEnd.Models;

public class Invoice {

    private final int idInvoice;
    private final float gross_Amount;
    private final float vat;
    private final float net_Amount;
    private final short paid;


    public Invoice(int idInvoice, float grossAmount, float vat, float netAmount, short paid) {
        this.idInvoice = idInvoice;
        gross_Amount = grossAmount;
        this.vat = vat;
        net_Amount = netAmount;
        this.paid = paid;
    }

    public Invoice(){
        this.idInvoice = 0;
        gross_Amount = 0;
        this.vat = 0;
        net_Amount = 0;
        this.paid = 0;
    }

    public int getIdInvoice() {
        return idInvoice;
    }

    public float getGross_Amount() {
        return gross_Amount;
    }

    public float getVat() {
        return vat;
    }

    public float getNet_Amount() {
        return net_Amount;
    }

    public short getPaid() {
        return paid;
    }
}
