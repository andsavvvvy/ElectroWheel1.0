package com.ElectroWheelBackEnd.Service;

import com.ElectroWheelBackEnd.Dao.CustomerDao;
import com.ElectroWheelBackEnd.Models.Customer;
import com.ElectroWheelBackEnd.Models.Rental;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service

public class CustomerService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerService.class);

    private final CustomerDao customerDao;
    @Autowired
    public CustomerService(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    public void createCustomer(Customer customer){
        customerDao.insertCustomer(customer);
    }

    public void deleteCustomer(int id){
        customerDao.deleteCustomer(id);
    }

    public void updateCustomerName(Customer customer){
        customerDao.updateCustomerName(customer.getIdCustomer(), customer.getFirstName(), customer.getLastName());
    }

    public int retrieveIdForNewCustomer() {
        LOGGER.info("Accessing service for rental retrieval");
        List<Customer> searchId = customerDao.retrieveCustomers();
        Customer lastcustomer = searchId.get(searchId.size() - 1);
        return lastcustomer.getIdCustomer() + 1;

    }

    public void updateCustomerData(Customer customer){
        customerDao.updateCustomerData(customer.getIdCustomer(), customer.getEmail(), customer.getPassword());
    }

    public void updateCustomerBillingAddress(Customer customer){
        customerDao.updateCustomerBillingAddress(customer.getIdCustomer(), customer.getBillingAddress());
    }

    public void updateCustomerWarningLevel(Customer customer){
        customerDao.updateCustomersWarninglevel(customer.getIdCustomer(), customer.getWarningLevel());
    }

    public Customer retrieveCustomerById(int id){
        return customerDao.retrieveCustomerById(id);
    }

    public Customer retrieveCustomerByEmail(String email){
        return customerDao.retrieveCustomerByEmail(email);
    }


    public String customerLogIn(String email, String password){
        Customer customer =  customerDao.customerLogIn(email, password);
        if(customer.getEmail().equals("NotFound")){
            return "NotFound";
        }

        if(customer.getWarningLevel() == 2){
            return "Banned";
        }
        return "Ok";

    }


    public List<Customer> retrieveCustomers() {
        LOGGER.info("Accessing service for customer retrieval");
        return customerDao.retrieveCustomers();
    }

    public List<Customer> retrieveBannedCustomers() {
        LOGGER.info("Accessing service for customer retrieval");
        return customerDao.retrieveBonnedCustomers();
    }
}
