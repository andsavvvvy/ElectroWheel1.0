package com.ElectroWheelBackEnd.Dao;

import com.ElectroWheelBackEnd.Models.Vehicle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository

public class VehicleDao {
    private static final Logger LOGGER = LoggerFactory.getLogger(VehicleDao.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/electrowheeldb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "Bobita2@1";

    public void deleteVehicle(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

           // System.out.println(vehicle.getIdVehicle());

            PreparedStatement statement = connection.prepareStatement("DELETE FROM VEHICLE WHERE IDVEHICLE=?");
            statement.setInt(1, id);

            statement.execute();
            LOGGER.info("Delete executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public void insertVehicle(Vehicle vehicle) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO VEHICLE VALUES(?,?,?,?,?,?)");
            statement.setInt(1, vehicle.getIdVehicle());
            statement.setInt(2, vehicle.getIdVehicle_Type());
            statement.setDate(3, vehicle.getRegisterDate());
            statement.setFloat(4, vehicle.getXcoord());
            statement.setFloat(5, vehicle.getYcoord());
            statement.setShort(6, vehicle.getAvailable());

            statement.execute();
            LOGGER.info("Insert executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public List<Vehicle> retrieveVehicles() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM vehicle");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM VEHICLE");

            List<Vehicle> vehicleList = new ArrayList<>();
            while (resultSet.next()) {
                vehicleList.add(
                        new Vehicle(
                                resultSet.getInt("idvehicle"),
                                resultSet.getInt("idvehicle_type"),
                                resultSet.getDate("register_date"),
                                resultSet.getFloat("xcoord"),
                                resultSet.getFloat("ycoord"),
                                resultSet.getShort("available"))
                );
            }
            return vehicleList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Vehicle> retrieveAvailableVehicles() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM vehicle");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM VEHICLE WHERE AVAILABLE = 1");

            List<Vehicle> vehicleList = new ArrayList<>();
            while (resultSet.next()) {
                if(resultSet.getShort("available") == 1) {
                    vehicleList.add(
                            new Vehicle(
                                    resultSet.getInt("idvehicle"),
                                    resultSet.getInt("idvehicle_type"),
                                    resultSet.getDate("register_date"),
                                    resultSet.getFloat("xcoord"),
                                    resultSet.getFloat("ycoord"),
                                    resultSet.getShort("available"))
                    );
                }
            }
            return vehicleList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Vehicle> retrieveVehiclesByDate(Date date) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM vehicle");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM VEHICLE WHERE REGISTER_DATE = ?");
            statement1.setDate(1, (java.sql.Date) date);
            ResultSet resultSet = statement1.executeQuery();

            List<Vehicle> vehicleList = new ArrayList<>();
            while (resultSet.next()) {
                    vehicleList.add(
                            new Vehicle(
                                    resultSet.getInt("idvehicle"),
                                    resultSet.getInt("idvehicle_type"),
                                    resultSet.getDate("register_date"),
                                    resultSet.getFloat("xcoord"),
                                    resultSet.getFloat("ycoord"),
                                    resultSet.getShort("available"))
                    );

            }
            return vehicleList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Vehicle> retrieveVehiclesByType(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM vehicle");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM VEHICLE WHERE IDVEHICLE_TYPE = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            List<Vehicle> vehicleList = new ArrayList<>();
            while (resultSet.next()) {
                    vehicleList.add(
                            new Vehicle(
                                    resultSet.getInt("idvehicle"),
                                    resultSet.getInt("idvehicle_type"),
                                    resultSet.getDate("register_date"),
                                    resultSet.getFloat("xcoord"),
                                    resultSet.getFloat("ycoord"),
                                    resultSet.getShort("available"))
                    );
            }
            return vehicleList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }



    public Vehicle retrieveVehicleById(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM vehicle");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM VEHICLE WHERE IDVEHICLE = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();
            if (!resultSet.next()) {

                    Vehicle vehicle = new Vehicle();
                    return vehicle;

            }
            else{
                Vehicle vehicle = new Vehicle(
                        resultSet.getInt("idvehicle"),
                        resultSet.getInt("idvehicle_type"),
                        resultSet.getDate("register_date"),
                        resultSet.getFloat("xcoord"),
                        resultSet.getFloat("ycoord"),
                        resultSet.getShort("available")
                    );
             return vehicle;
            }

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public void updateVehicleCoordonates(int id, float x, float y) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement1 = connection.prepareStatement("UPDATE VEHICLE SET XCOORD=? WHERE IDVEHICLE=?");
            statement1.setFloat(1, x);
            statement1.setInt(2, id);

            PreparedStatement statement2 = connection.prepareStatement("UPDATE VEHICLE SET YCOORD=? WHERE IDVEHICLE=?");
            statement2.setFloat(1, y);
            statement2.setInt(2, id);


            statement1.execute();
            statement2.execute();

            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }

    public void updateVehicleAvailability(int id, short available) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            System.out.println(id);

            System.out.println(available);

            PreparedStatement statement = connection.prepareStatement("UPDATE VEHICLE SET AVAILABLE=? WHERE IDVEHICLE=?");
            statement.setShort(1, available);
            statement.setInt(2, id);

            statement.execute();

            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }


}
