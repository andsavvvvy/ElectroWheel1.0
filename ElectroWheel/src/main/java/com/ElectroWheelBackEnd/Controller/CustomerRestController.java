package com.ElectroWheelBackEnd.Controller;

import com.ElectroWheelBackEnd.Models.Customer;

import com.ElectroWheelBackEnd.Models.Invoice;
import com.ElectroWheelBackEnd.Service.CustomerService;

import com.ElectroWheelBackEnd.Service.InvoiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/customers")

public class CustomerRestController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerRestController.class);
    private final CustomerService customerService;

    @Autowired
    public CustomerRestController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public Customer createCustomers(@RequestBody Customer customer){
        customerService.createCustomer(customer);
        return customer;
    }

    @PutMapping("/namechange")
    public void updateCustomerName(@RequestBody Customer customer){
        customerService.updateCustomerName(customer);
    }

    @PutMapping("/billingaddresschange")
    public void updateCustomerBillingAddress(@RequestBody Customer customer){
        customerService.updateCustomerBillingAddress(customer);
    }

    @GetMapping("/latestId")
    public int retrieveIdForNewRental() {
        return customerService.retrieveIdForNewCustomer();
    }

    @PutMapping("/login")
    public void updateCustomerData(@RequestBody Customer customer){
        customerService.updateCustomerData(customer);
    }

    @GetMapping("/login/{email}-{password}")
    public String customerLogIn(@PathVariable String email, @PathVariable String password) {
        System.out.println(email);
        return customerService.customerLogIn(email, password);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable int id){
        customerService.deleteCustomer(id);
    }
    @GetMapping
    public List<Customer> retrieveAllCustomers() {
        return customerService.retrieveCustomers();
    }

    @GetMapping("/{id}")
    public Customer retrieveCustomerById(@PathVariable int id) {
        return customerService.retrieveCustomerById(id);
    }

    @PutMapping("/{email}")
    public Customer retrieveCustomerByEmail(@PathVariable String email) {
        System.out.println(email);
        return customerService.retrieveCustomerByEmail(email);
    }

    @GetMapping("/banned")
    public List<Customer> retrieveBannedCustomers() {
        return customerService.retrieveBannedCustomers();
    }

    @PutMapping("/banned")
    public void updateCustomerWarningLevel(@RequestBody Customer customer){
        customerService.updateCustomerWarningLevel(customer);
    }

}
