package com.ElectroWheelBackEnd.Service;

import com.ElectroWheelBackEnd.Dao.InvoiceDao;
import com.ElectroWheelBackEnd.Models.Invoice;
import com.ElectroWheelBackEnd.Models.Rental;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class InvoiceService {

    private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceService.class);

    private final InvoiceDao invoiceDao;
    @Autowired
    public InvoiceService(InvoiceDao invoiceDao) {
        this.invoiceDao = invoiceDao;
    }

    public void createInvoice(Invoice invoice){
        invoiceDao.insertInvoice(invoice);
    }

    public void deleteInvoice(int id){
        invoiceDao.deleteInvoice(id);
    }

    public void updateInvoicePaidStatus(Invoice invoice){
        invoiceDao.updateInvoicePaidStatus(invoice.getIdInvoice(), invoice.getPaid());
    }

    public Invoice retrieveInvoicebyId(int id){return invoiceDao.retrieveInvoiceById(id);}

    public List<Invoice> retrieveInvoices() {
        LOGGER.info("Accessing service for invoice retrieval");
        return invoiceDao.retrieveInvoices();
    }

    public int retrieveIdForNewInvoice() {
        LOGGER.info("Accessing service for rental retrieval");
        List<Invoice> searchId = invoiceDao.retrieveInvoices();
        Invoice lastInvoice = searchId.get(searchId.size() - 1);
        return lastInvoice.getIdInvoice() + 1;

    }

    public List<Invoice> retrieveUnpaidInvoices() {
        LOGGER.info("Accessing service for invoice retrieval");
        return invoiceDao.retrieveUnpaidInvoices();
    }

    public List<Invoice> retrievePaidInvoices() {
        LOGGER.info("Accessing service for invoice retrieval");
        return invoiceDao.retrievePaidInvoices();
    }
}
