package com.ElectroWheelBackEnd.Controller;

import com.ElectroWheelBackEnd.Models.Invoice;

import com.ElectroWheelBackEnd.Service.InvoiceService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")

public class InvoiceRestController {
    private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceRestController.class);
    private final InvoiceService invoiceService;

    @Autowired
    public InvoiceRestController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping
    public Invoice createInvoice(@RequestBody Invoice invoice){
        invoiceService.createInvoice(invoice);
        return invoice;
    }

    @PutMapping
    public void updateInvoicePaidStatus(@RequestBody Invoice invoice){
        invoiceService.updateInvoicePaidStatus(invoice);
    }

    @GetMapping("/latestId")
    public int retrieveIdForNewInvoice() {
        return invoiceService.retrieveIdForNewInvoice();
    }

    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable int id){
        invoiceService.deleteInvoice(id);
    }
    @GetMapping
    public List<Invoice> retrieveAllInvoices() {
        return invoiceService.retrieveInvoices();
    }

    @GetMapping("/{id}")
    public Invoice retrieveInvoiceById(@PathVariable int id) {
        return invoiceService.retrieveInvoicebyId(id);
    }

    @GetMapping("/paid")
    public List<Invoice> retrievePaidInvoices() {
        return invoiceService.retrievePaidInvoices();
    }

    @GetMapping("/unpaid")
    public List<Invoice> retrieveUnpaidInvoices() {
        return invoiceService.retrieveUnpaidInvoices();
    }


}
