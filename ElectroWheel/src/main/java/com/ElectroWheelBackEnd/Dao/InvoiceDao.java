package com.ElectroWheelBackEnd.Dao;

import com.ElectroWheelBackEnd.Models.Invoice;
import com.ElectroWheelBackEnd.Models.Rental;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository

public class InvoiceDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceDao.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/electrowheeldb";
    private static final String DB_USER = "root";
    private static final String DB_PASS = "Bobita2@1";

    public void deleteInvoice(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("DELETE FROM INVOICE WHERE IDINVOICE=?");
            statement.setInt(1, id);

            statement.execute();
            LOGGER.info("Delete executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public void insertInvoice(Invoice invoice) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO INVOICE VALUES(?,?,?,?,?)");
            statement.setInt(1, invoice.getIdInvoice());
            statement.setFloat(2, invoice.getGross_Amount());
            statement.setFloat(3, invoice.getVat());
            statement.setFloat(4, invoice.getNet_Amount());
            statement.setShort(5, invoice.getPaid());

            statement.execute();
            LOGGER.info("Insert executed successfully");
        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
    }

    public List<Invoice> retrieveInvoices() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM invoice");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM INVOICE");

            List<Invoice> invoiceList = new ArrayList<>();
            while (resultSet.next()) {
                invoiceList.add(
                        new Invoice(
                                resultSet.getInt("idinvoice"),
                                resultSet.getFloat("gross_amount"),
                                resultSet.getFloat("vat"),
                                resultSet.getFloat("net_amount"),
                                resultSet.getShort("paid")
                        )
                );
            }
            return invoiceList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Invoice> retrieveUnpaidInvoices() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM invoice");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM INVOICE WHERE PAID = 0");

            List<Invoice> invoiceList = new ArrayList<>();
            while (resultSet.next()) {
                    invoiceList.add(
                            new Invoice(
                                    resultSet.getInt("idinvoice"),
                                    resultSet.getFloat("gross_amount"),
                                    resultSet.getFloat("vat"),
                                    resultSet.getFloat("net_amount"),
                                    resultSet.getShort("paid")
                            )
                    );

            }
            return invoiceList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public List<Invoice> retrievePaidInvoices() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM invoice");
            ResultSet resultSet = statement.executeQuery("SELECT * FROM INVOICE WHERE PAID = 1");

            List<Invoice> invoiceList = new ArrayList<>();
            while (resultSet.next()) {
                    invoiceList.add(
                            new Invoice(
                                    resultSet.getInt("idinvoice"),
                                    resultSet.getFloat("gross_amount"),
                                    resultSet.getFloat("vat"),
                                    resultSet.getFloat("net_amount"),
                                    resultSet.getShort("paid")
                            )
                    );

            }
            return invoiceList;

        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public Invoice retrieveInvoiceById(int id) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {

            LOGGER.info("Connected to MySql database!");
            LOGGER.info("Prepare statement");
            Statement statement = connection.createStatement();
            LOGGER.info("Executing query: SELECT * FROM invoice");
            PreparedStatement statement1 = connection.prepareStatement("SELECT * FROM INVOICE WHERE IDINVOICE = ?");
            statement1.setInt(1, id);
            ResultSet resultSet = statement1.executeQuery();

            if (!resultSet.next()) {
                    Invoice invoice = new Invoice();
                    return invoice;
                }
            else{
                Invoice invoice = new Invoice(
                        resultSet.getInt("idinvoice"),
                        resultSet.getFloat("gross_amount"),
                        resultSet.getFloat("vat"),
                        resultSet.getFloat("net_amount"),
                        resultSet.getShort("paid")
                );
                return invoice;
            }


        } catch (SQLException e) {
            LOGGER.error("Connection failure", e);
        }
        return null;
    }

    public void updateInvoicePaidStatus(int id, short paid) {

        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS)) {
            System.out.println("Connected to MySql database!");
            System.out.println("Prepare statement");

            PreparedStatement statement = connection.prepareStatement("UPDATE INVOICE SET PAID=? WHERE IDINVOICE=?");
            statement.setShort(1, paid);
            statement.setInt(2, id);


            statement.execute();

            System.out.println("Update executed successfully");
        } catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
        }
    }


}
