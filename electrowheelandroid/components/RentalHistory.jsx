// RentalHistory.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';
import InvoiceService from '../services/InvoiceService';
import RentalsService from '../services/RentalsService';
import NavigationBar from './NavigationBar'; // Import the NavBar component
import { useRoute } from '@react-navigation/native';

const RentalHistory = () => {
  const route = useRoute();
  const { customer } = route.params;

  const navigation = useNavigation();
  const [rentalDetails, setRentalDetails] = useState([]);
  const window = useWindowDimensions();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseRental = await RentalsService.getRentalByCustomerId(customer.idCustomer);

      const rentalData = await Promise.all(responseRental.data.map(async item => {
        const vehicleDataResponse = await VehiclesService.getVehicleById(item.idVehicle);
        const vehicle = vehicleDataResponse.data;

        const invoiceDataResponse = await InvoiceService.getInvoiceById(item.idInvoice);
        const invoice = invoiceDataResponse.data;

        const typeDataResponse = await VehicleTypesService.getVehicleTypeById(vehicle.idVehicle_Type);
        const type = typeDataResponse.data;

        return { ...item, vehicle, invoice, type };
      }));
      setRentalDetails(rentalData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getTripText = (time1, time2) => {
    return time1 === time2 ? 'Ongoing' : 'Finished';
  };

  const getPaidText = (paid) => {
    return paid ? 'Yes' : 'No';
  };

  const handlePayInvoice = async (idInvoice) => {
    try {
      const response = await InvoiceService.updateInvoicePaidStatus({ idInvoice: idInvoice, paid: 1 });
      console.log('Invoice paid:', response.data);
      // Refresh rental details after payment
      fetchData();
    } catch (error) {
      console.error('Error paying invoice:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.heading}>This Customer's Rentals</Text>
          {rentalDetails.map(rental => (
            <View key={rental.idRental} style={styles.rentalContainer}>
              <Text>Rental Id: {rental.idRental}</Text>
              <Text>Rental Date: {rental.rent_Date}</Text>
              <Text>Status: {getTripText(rental.start_Ride, rental.end_Ride)}</Text>
              <Text>Vehicle Id: {rental.vehicle.idVehicle}</Text>
              <Text>Vehicle Type: {rental.type.description_Vehicle}</Text>
              <Text>Invoice Id: {rental.invoice.idInvoice}</Text>
              <Text>Paid: {getPaidText(rental.invoice.paid)}</Text>
              {!rental.invoice.paid ? (
                <Button
                  title="Pay"
                  onPress={() => handlePayInvoice(rental.invoice.idInvoice)}
                />
              ) : null}
            </View>
          ))}
          {/* Add some space at the bottom to ensure the final card isn't covered */}
          <View style={styles.bottomSpace}></View>
        </View>
      </ScrollView>
      <NavigationBar customer={customer} style={styles.navigationBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 60, // Ensure space for the NavigationBar
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rentalContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Adjust as needed
    height: 60, // Adjust the height of your NavigationBar component
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Add a border if needed
  },
  bottomSpace: {
    height: 60, // Adjust according to the height of the NavigationBar
  },
});

export default RentalHistory;
