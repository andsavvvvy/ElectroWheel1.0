package com.ElectroWheelBackEnd.Dao;


import com.ElectroWheelBackEnd.Models.Customer;
import com.mysql.cj.conf.ConnectionUrlParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomerDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerDao.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/electrowheeldb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "Bobita2@1";

    public void deleteCustomer(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("DELETE FROM CUSTOMER WHERE IDCUSTOMER=?");
            statement.setInt(1, id);

            statement.execute();
            LOGGER.info("Delete executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public void insertCustomer(Customer customer) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO CUSTOMER VALUES(?,?,?,?,?,?,?)");
            statement.setInt(1, customer.getIdCustomer());
            statement.setString(2, customer.getFirstName());
            statement.setString(3, customer.getLastName());
            statement.setString(4, customer.getEmail());
            statement.setString(5, customer.getPassword());
            statement.setString(6, customer.getBillingAddress());
            statement.setShort(7, customer.getWarningLevel());


            statement.execute();
            LOGGER.info("Insert executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public List<Customer> retrieveCustomers() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM customer");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM CUSTOMER");

            List<Customer> customerList = new ArrayList<>();
            while (resultSet.next()) {
                customerList.add(
                        new Customer(
                                resultSet.getInt("idcustomer"),
                                resultSet.getString("first_name"),
                                resultSet.getString("last_name"),
                                resultSet.getString("email"),
                                resultSet.getString("password"),
                                resultSet.getString("billing_address"),
                                resultSet.getShort("warning_lvl"))
                );
            }
            return customerList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Customer> retrieveBonnedCustomers() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            LOGGER.info("Executing query: SELECT * FROM customer");

            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM CUSTOMER WHERE WARNING_LVL = 2");
            //statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            List<Customer> customerList = new ArrayList<>();
            while (resultSet.next()) {
                    customerList.add(
                            new Customer(
                                    resultSet.getInt("idcustomer"),
                                    resultSet.getString("first_name"),
                                    resultSet.getString("last_name"),
                                    resultSet.getString("email"),
                                    resultSet.getString("password"),
                                    resultSet.getString("billing_address"),
                                    resultSet.getShort("warning_lvl")
                            )
                    );

            }
            return customerList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }


    public Customer retrieveCustomerById(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            LOGGER.info("Executing query: SELECT * FROM customer");

            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM CUSTOMER WHERE IDCUSTOMER = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {
                Customer customer = new Customer();
                return customer;
            }
            else{
                    Customer customer = new Customer(
                            resultSet.getInt("idcustomer"),
                            resultSet.getString("first_name"),
                            resultSet.getString("last_name"),
                            resultSet.getString("email"),
                            resultSet.getString("password"),
                            resultSet.getString("billing_address"),
                            resultSet.getShort("warning_lvl")
                    );
                    return customer;

            }


        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public Customer retrieveCustomerByEmail(String email) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            LOGGER.info("Executing query: SELECT * FROM customer WHERE EMAIL = email");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM CUSTOMER WHERE EMAIL = ?");
            statement1.setString(1, email);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {
                Customer customer = new Customer();
                return customer;
            }
            else{
                Customer customer = new Customer(
                        resultSet.getInt("idcustomer"),
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("email"),
                        resultSet.getString("password"),
                        resultSet.getString("billing_address"),
                        resultSet.getShort("warning_lvl")
                );
                return customer;
            }



        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public Customer customerLogIn(String email, String password) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM customer");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM CUSTOMER WHERE EMAIL = ? AND PASSWORD = ?");
            statement1.setString(1, email);
            statement1.setString(2, password);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {
                Customer customer = new Customer();
                return customer;
            }
            else{
                Customer customer = new Customer(
                        resultSet.getInt("idcustomer"),
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("email"),
                        resultSet.getString("password"),
                        resultSet.getString("billing_address"),
                        resultSet.getShort("warning_lvl")
                );
                return customer;
            }


        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public void updateCustomerName(int id, String firstname, String lastname) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement1 = connection.prepareStatement("UPDATE CUSTOMER SET FIRST_NAME=? WHERE IDCUSTOMER=?");
            statement1.setString(1, firstname);
            statement1.setInt(2, id);

            PreparedStatement statement2 = connection.prepareStatement("UPDATE CUSTOMER SET LAST_NAME=? WHERE IDCUSTOMER=?");
            statement2.setString(1, lastname);
            statement2.setInt(2, id);

            statement1.execute();
            statement2.execute();
            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }

    public void updateCustomerData(int id, String email, String password) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement1 = connection.prepareStatement("UPDATE CUSTOMER SET EMAIL=? WHERE IDCUSTOMER=?");
            statement1.setString(1, email);
            statement1.setInt(2, id);

            PreparedStatement statement2 = connection.prepareStatement("UPDATE CUSTOMER SET PASSWORD=? WHERE IDCUSTOMER=?");
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

    public void updateCustomerBillingAddress(int id, String billing_Address) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("UPDATE CUSTOMER SET BILLING_ADDRESS=? WHERE IDCUSTOMER=?");
            statement.setString(1, billing_Address);
            statement.setInt(2, id);

            statement.execute();
            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }

    public void updateCustomersWarninglevel(int id, short level) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("UPDATE CUSTOMER SET WARNING_LVL=? WHERE IDCUSTOMER=?");
            statement.setShort(1, level);
            statement.setInt(2, id);

            statement.execute();
            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }

}
