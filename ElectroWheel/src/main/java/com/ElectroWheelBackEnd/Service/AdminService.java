package com.ElectroWheelBackEnd.Service;

import com.ElectroWheelBackEnd.Dao.AdminDao;
import com.ElectroWheelBackEnd.Models.Admin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class AdminService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);

    private final AdminDao adminLogInDao;
    @Autowired
    public AdminService(AdminDao adminLogInDao) {
        this.adminLogInDao = adminLogInDao;
    }

    public void createAdmin(Admin admin){
        adminLogInDao.insertAdmin(admin);
    }

    public void deleteAdmin(Admin admin){
        adminLogInDao.deleteAdmin(admin);
    }

    public void updateAdmin(Admin admin){
        adminLogInDao.updateAdmin(admin.getIdAdmin(), admin.getEmail(), admin.getPassword());
    }

    public Admin retrieveAdminById(int id){
        return adminLogInDao.retrieveAdminById(id);
    }

    public Boolean adminLogIn(String email, String password){
        return adminLogInDao.adminLogIn(email, password);
    }


    public List<Admin> retrieveAdmins() {
        LOGGER.info("Accessing service for admin retrieval");
        return adminLogInDao.retrieveAdmin();
    }

}
