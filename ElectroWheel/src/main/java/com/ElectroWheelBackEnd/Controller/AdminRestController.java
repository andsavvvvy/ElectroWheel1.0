package com.ElectroWheelBackEnd.Controller;

import com.ElectroWheelBackEnd.Models.Admin;

import com.ElectroWheelBackEnd.Service.AdminService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")


@RestController
@RequestMapping("/admins")

public class AdminRestController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminRestController.class);
    private final AdminService adminLogInService;

    @Autowired
    public AdminRestController(AdminService adminLogInService) {
        this.adminLogInService = adminLogInService;
    }

    @PostMapping
    public Admin createAdmin(@RequestBody Admin adminLogIn){
        adminLogInService.createAdmin(adminLogIn);
        return adminLogIn;
    }

    @PutMapping
    public void updateAdmin(@RequestBody Admin admin){
        adminLogInService.updateAdmin(admin);
    }

    @DeleteMapping
    public void deleteAdmin(@RequestBody Admin admin){
        adminLogInService.deleteAdmin(admin);
    }
    @GetMapping
    public List<Admin> retrieveAllAdmins() {
        return adminLogInService.retrieveAdmins();
    }

    @GetMapping("/{id}")
    public Admin retrieveAdminById(@PathVariable int id) {
        return adminLogInService.retrieveAdminById(id);
    }

    @GetMapping("/login/{email}-{password}")
    public Boolean adminLogIn(@PathVariable String email, @PathVariable String password) {
        return adminLogInService.adminLogIn(email, password);
    }

}
