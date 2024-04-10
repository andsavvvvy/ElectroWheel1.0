package com.ElectroWheelBackEnd.Dao;

import com.ElectroWheelBackEnd.Models.Vehicle_Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository

public class Vehicle_TypeDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(Vehicle_TypeDao.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/electrowheeldb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "Bobita2@1";

    public void deleteVehicleType(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("DELETE FROM VEHICLE_TYPE WHERE IDVEHICLE_TYPE=?");
            statement.setInt(1, id);

            statement.execute();
            LOGGER.info("Delete executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public void insertVehicleType(Vehicle_Type vehicleType) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO VEHICLE_TYPE VALUES(?,?,?)");
            statement.setInt(1, vehicleType.getIdVehicle_Type());
            statement.setString(2, vehicleType.getDescription_Vehicle());
            statement.setFloat(3, vehicleType.getPrice_Per_Minute());


            statement.execute();
            LOGGER.info("Insert executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public List<Vehicle_Type> retrieveVehicleTypes() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM vehicle_type");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM VEHICLE_TYPE");

            List<Vehicle_Type> typeList = new ArrayList<>();
            while (resultSet.next()) {
                typeList.add(
                        new Vehicle_Type(
                                resultSet.getInt("idvehicle_type"),
                                resultSet.getString("description_vehicle"),
                                resultSet.getFloat("price_per_minute")
                        )
                );
            }
            return typeList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public Vehicle_Type retrieveTypeById(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM vehicle_type");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM VEHICLE_TYPE WHERE IDVEHICLE_TYPE = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {

                    Vehicle_Type type = new Vehicle_Type();
                    return type;
            }
            else{
                Vehicle_Type type = new Vehicle_Type(
                        resultSet.getInt("idvehicle_type"),
                        resultSet.getString("description_vehicle"),
                        resultSet.getFloat("price_per_minute")
                );
                return type;
            }


        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public void updateVehicleTypePricePerMinute(int id, float price) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("UPDATE VEHICLE_TYPE SET PRICE_PER_MINUTE=? WHERE IDVEHICLE_TYPE=?");
            statement.setFloat(1, price);
            statement.setInt(2, id);


            statement.execute();

            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }


}
