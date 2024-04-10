package com.ElectroWheelBackEnd.Dao;

import com.ElectroWheelBackEnd.Models.Admin;
import com.ElectroWheelBackEnd.Models.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository

public class AdminDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(AdminDao.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/electrowheeldb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "Bobita2@1";

    public void deleteAdmin(Admin adminLogIn) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("DELETE FROM ADMIN WHERE IDADMIN=?");
            statement.setInt(1, adminLogIn.getIdAdmin());

            statement.execute();
            LOGGER.info("Delete executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public void insertAdmin(Admin adminLogIn) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO ADMIN VALUES(?,?,?)");
            statement.setInt(1, adminLogIn.getIdAdmin());
            statement.setString(2, adminLogIn.getEmail());
            statement.setString(3, adminLogIn.getPassword());

            statement.execute();
            LOGGER.info("Insert executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public List<Admin> retrieveAdmin() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM admin");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM ADMIN");

            List<Admin> adminList = new ArrayList<>();
            while (resultSet.next()) {
                adminList.add(
                        new Admin(
                                resultSet.getInt("idadmin"),
                                resultSet.getString("email"),
                                resultSet.getString("password"))

                );
            }
            return adminList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public Admin retrieveAdminById(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM admin");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM ADMIN WHERE IDADMIN = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {
                Admin admin = new Admin();
                return admin;
            }
            else {

                Admin admin = new Admin(
                        resultSet.getInt("idadmin"),
                        resultSet.getString("email"),
                        resultSet.getString("password")
                );
                return admin;
            }

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }


    public void updateAdmin(int id, String email, String password) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement1 = connection.prepareStatement("UPDATE ADMIN SET EMAIL=? WHERE IDADMIN=?");
            statement1.setString(1, email);
            statement1.setInt(2, id);

            PreparedStatement statement2 = connection.prepareStatement("UPDATE ADMIN SET PASSWORD=? WHERE IDADMIN=?");
            statement2.setString(1, password);
            statement2.setInt(2, id);

            statement1.execute();
            statement2.execute();
            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }


    public Boolean adminLogIn(String email, String password) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM admin");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM ADMIN WHERE EMAIL = ? AND PASSWORD = ?");
            statement1.setString(1, email);
            statement1.setString(2, password);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {
                return false;
            }
            return true;


        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }
}
