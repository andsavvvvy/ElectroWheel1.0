package com.ElectroWheelBackEnd.Dao;

import com.ElectroWheelBackEnd.Models.Vehicle;
import com.ElectroWheelBackEnd.Models.Rental;
import com.ElectroWheelBackEnd.Models.Invoice;
import com.ElectroWheelBackEnd.Models.Customer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class RentalDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(RentalDao.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/electrowheeldb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "Bobita2@1";

    public void deleteRental(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("DELETE FROM RENTAL WHERE IDRENTAL=?");
            statement.setInt(1, id);

            statement.execute();
            LOGGER.info("Delete executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public void insertRental(Rental rental) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO RENTAL VALUES(?,?,?,?,?,?,DEFAULT)");
            statement.setInt(1, rental.getIdRental());
            statement.setInt(2, rental.getIdVehicle());
            statement.setInt(3,rental.getIdCustomer());
            statement.setDate(4, rental.getRent_Date());
            statement.setTime(5, rental.getStart_Ride());
            statement.setTime(6, rental.getStart_Ride());


            statement.execute();
            LOGGER.info("Insert executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public List<Rental> retrieveRentals() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM rental");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM RENTAL");

            List<Rental> rentalList = new ArrayList<>();
            while (resultSet.next()) {
                rentalList.add(
                        new Rental(
                                resultSet.getInt("idrental"),
                                resultSet.getInt("idvehicle"),
                                resultSet.getInt("idcustomer"),
                                resultSet.getDate("rent_date"),
                                resultSet.getTime("start_time"),
                                resultSet.getTime("end_time"),
                                resultSet.getInt("idinvoice")
                        )
                );
            }
            return rentalList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Rental> retrieveOngoingRentals() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM rental");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM RENTAL WHERE START_TIME = END_TIME");

            List<Rental> rentalList = new ArrayList<>();
            while (resultSet.next()) {
                    rentalList.add(
                            new Rental(
                                    resultSet.getInt("idrental"),
                                    resultSet.getInt("idvehicle"),
                                    resultSet.getInt("idcustomer"),
                                    resultSet.getDate("rent_date"),
                                    resultSet.getTime("start_time"),
                                    resultSet.getTime("end_time"),
                                    resultSet.getInt("idinvoice")
                            )
                    );

            }
            return rentalList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Rental> retrieveRentalsByCustomerId(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM rental");

            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM RENTAL WHERE IDCUSTOMER = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            List<Rental> rentalList = new ArrayList<>();
            while (resultSet.next()) {
                    rentalList.add(
                            new Rental(
                                    resultSet.getInt("idrental"),
                                    resultSet.getInt("idvehicle"),
                                    resultSet.getInt("idcustomer"),
                                    resultSet.getDate("rent_date"),
                                    resultSet.getTime("start_time"),
                                    resultSet.getTime("end_time"),
                                    resultSet.getInt("idinvoice")
                            )
                    );
            }
            return rentalList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }


    public List<Rental> retrieveRentalsByVehicleId(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM rental");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM RENTAL WHERE IDVEHICLE = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            List<Rental> rentalList = new ArrayList<>();
            while (resultSet.next()) {
                    rentalList.add(
                            new Rental(
                                    resultSet.getInt("idrental"),
                                    resultSet.getInt("idvehicle"),
                                    resultSet.getInt("idcustomer"),
                                    resultSet.getDate("rent_date"),
                                    resultSet.getTime("start_time"),
                                    resultSet.getTime("end_time"),
                                    resultSet.getInt("idinvoice")
                            )
                    );

            }
            return rentalList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Rental> retrieveRentalsByDate(Date date) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM rental");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM RENTAL WHERE RENT_DATE = ?");
            statement1.setDate(1, (java.sql.Date) date);
            ResultSet resultSet = statement1.executeQuery();

            List<Rental> rentalList = new ArrayList<>();
            while (resultSet.next()) {
                rentalList.add(
                        new Rental(
                                resultSet.getInt("idrental"),
                                resultSet.getInt("idvehicle"),
                                resultSet.getInt("idcustomer"),
                                resultSet.getDate("rent_date"),
                                resultSet.getTime("start_time"),
                                resultSet.getTime("end_time"),
                                resultSet.getInt("idinvoice")
                        )
                );

            }
            return rentalList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public Rental retrieveRentalsByInvoiceId(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM rental");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM RENTAL WHERE IDINVOICE = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            List<Rental> rentalList = new ArrayList<>();
            if (!resultSet.next()) {
                Rental rental = new Rental();
                return rental;
            }
            else {


                           Rental rental = new Rental(
                                    resultSet.getInt("idrental"),
                                    resultSet.getInt("idvehicle"),
                                    resultSet.getInt("idcustomer"),
                                    resultSet.getDate("rent_date"),
                                    resultSet.getTime("start_time"),
                                    resultSet.getTime("end_time"),
                                    resultSet.getInt("idinvoice")
                            );
                    return rental;

            }


        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public Rental retrieveRentalById(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM rental");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM RENTAL WHERE IDRENTAL = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {
                Rental rental = new Rental();
                return rental;
            }
            else {


                Rental rental = new Rental(
                        resultSet.getInt("idrental"),
                        resultSet.getInt("idvehicle"),
                        resultSet.getInt("idcustomer"),
                        resultSet.getDate("rent_date"),
                        resultSet.getTime("start_time"),
                        resultSet.getTime("end_time"),
                        resultSet.getInt("idinvoice")
                );
                return rental;

            }



        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }



    public void updateRentalAfterEndOfTrip(int id, Time end_Time, int id_inv) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement1 = connection.prepareStatement("UPDATE RENTAL SET END_TIME=? WHERE IDRENTAL=?");
            statement1.setTime(1, end_Time);
            statement1.setInt(2, id);

            PreparedStatement statement2 = connection.prepareStatement("UPDATE RENTAL SET IDINVOICE=? WHERE IDRENTAL=?");
            statement2.setInt(1, id_inv);
            statement2.setInt(2, id);

            statement1.execute();
            statement2.execute();
            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }

}
