import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import VehiclesService from '../services/VehiclesService';
import InvoiceService from '../services/InvoiceService';
import RentalsService from '../services/RentalsService';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const RentPage = () => {

  const route = useRoute();
  const { vehicle, rentalid, customer } = route.params;
  console.log(vehicle);
  console.log(rentalid);
  console.log(customer);

  const navigation = useNavigation();

  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [location, setLocation] = useState({ latitude: vehicle.xcoord, longitude: vehicle.ycoord });
  const [invoiceData, setInvoiceData] = useState({
    idInvoice : 0,
    tripPrice: 0,
    vatValue: 0,
    netAmount: 0,
    paid: 0
  });

  useEffect(() => {
    if (startTime && stopTime) {
      const durationInMinutes = Math.floor((stopTime - startTime) / (1000 * 60));
      setDurationMinutes(durationInMinutes);
      calculatePrice(durationInMinutes);
      generateRandomLocation();
      updateVehicleAvailability();
    }
  }, [startTime, stopTime]);

  const startTimer = () => {
    const now = new Date();
    setStartTime(now);
    createRental();
  };

  const stopTimer = () => {
    const now = new Date();
    setStopTime(now);
    
    
  };

  const createRental = async () =>{
     try {
    const updateVehicle =await VehiclesService.updateVehicleAvailability({idVehicle: vehicle.idVehicle, available: 0});

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Ensures two digits
    const day = ('0' + currentDate.getDate()).slice(-2); // Ensures two digits
    const localDate = `${year}-${month}-${day}`;
    const hours = ('0' + currentDate.getHours()).slice(-2); // Ensures two digits
    const minutes = ('0' + currentDate.getMinutes()).slice(-2); // Ensures two digits
    const seconds = ('0' + currentDate.getSeconds()).slice(-2); // Ensures two digits
    const currentTime = `${hours}:${minutes}:${seconds}`;

     const newRental = await RentalsService.insertRental({
      idRental: rentalid,
      idVehicle: vehicle.idVehicle,
      idCustomer: customer.idCustomer,
      rent_Date: localDate, 
      start_Ride: currentTime
    });
    console.log('Rental Created');
  }catch(error) {
    console.error('Create Rental Failed', error);
  }

  }



  const updateVehicleAvailability = async () =>{

         try {
      const response = await VehiclesService.updateVehicleAvailability({
        idVehicle: vehicle.idVehicle,
        available: 1
      });
      console.log('Vehicle availability updated successfully.');
    } catch (error) {
      console.error('Error updating vehicle availability:', error);
    }    
  }

  const generateRandomLocation = async () => {
    let offset;

    // Determine offset based on the number of minutes
    if (durationMinutes <= 5) {
      offset = 0.003;
    } else if (durationMinutes <= 10) {
      offset = 0.009;
    } else if (durationMinutes <= 20) {
      offset = 0.015;
    } else {
      offset = 0.02; // Default offset value for longer durations
    }

    // Generate new latitude and longitude near the original ones
    const newLatitude = vehicle.xcoord + (Math.random() * offset * 2 - offset);
    const newLongitude = vehicle.ycoord + (Math.random() * offset * 2 - offset);

    // Update the location state
    setLocation({ latitude: newLatitude, longitude: newLongitude });

    // Update vehicle coordinates using Axios
    try {
      const response = await VehiclesService.updateVehicleCoordonates({
        idVehicle: vehicle.idVehicle,
        xcoord: newLatitude,
        ycoord: newLongitude
      });
      console.log('Vehicle coordinates updated successfully.');
    } catch (error) {
      console.error('Error updating vehicle coordinates:', error);
    }
  };

  const calculatePrice = async (duration) => {
    const tripPrice = duration * vehicle.type.price_Per_Minute;
    const vatValue = tripPrice * 0.19; // Assuming a VAT rate of 19%
    const netAmount = tripPrice + vatValue;

    

     try {
      const newInvoiceId = await InvoiceService.getNewInvoiceId();
      console.log(newInvoiceId.data);
      setInvoiceData({
      idInvoice : newInvoiceId.data,
      tripPrice: tripPrice,
      vatValue: vatValue,
      netAmount: netAmount,
      paid: false
    });
        const response = await InvoiceService.insertInvoice({
        idInvoice: newInvoiceId.data,
        gross_Amount: tripPrice,
        vat: vatValue,
        net_Amount: netAmount
      });

       const currentDate = new Date();
       const hours = ('0' + currentDate.getHours()).slice(-2); // Ensures two digits
       const minutes = ('0' + currentDate.getMinutes()).slice(-2); // Ensures two digits
       const seconds = ('0' + currentDate.getSeconds()).slice(-2); // Ensures two digits
       const currentTime = `${hours}:${minutes}:${seconds}`;
       console.log("Rental update information");
       console.log(rentalid);
       console.log(newInvoiceId.data);
       console.log(currentTime);
      await RentalsService.updateRentalAfterEndOfTrip( {
        idRental: rentalid,
        idInvoice: newInvoiceId.data,
        end_Ride: currentTime
      });
      console.log('Rental update and Invoice Creation successful.');
    } catch (error) {
      console.error('Error Finishing Ride:', error);
    }

    try {
       
      console.log('Object in the database updated successfully.');
    } catch (error) {
      console.error('Error updating object in the database:', error);
    }

  };

  // Determine if the "Go to Map" button should be enabled
// Determine if the "Go to Map" button should be enabled
  const isMapButtonEnabled = (startTime === null && stopTime === null) || (startTime === null || stopTime !== null);


  return (
    <View>
      <Text>Vehicle ID: {vehicle.idVehicle}</Text>
      <Text>Description: {vehicle.type.description_Vehicle}</Text>
      <Text>First Name: {customer.firstName}</Text>
      <Text>Last Name: {customer.lastName}</Text>
      <Text>Email: {customer.email}</Text>

      <Text>Price per Minute: ${vehicle.type.price_Per_Minute.toFixed(2)}</Text>
      <Text>Start Time: {startTime ? startTime.toLocaleTimeString() : 'Not started'}</Text>
      <Text>Stop Time: {stopTime ? stopTime.toLocaleTimeString() : 'Not stopped'}</Text>
      <Text>Duration (minutes): {durationMinutes}</Text>
      {location.latitude && location.longitude && (
        <Text>
          Location: Latitude {location.latitude.toFixed(6)}, Longitude{' '}
          {location.longitude.toFixed(6)}
        </Text>
      )}
      <Text>Trip Price: ${invoiceData.tripPrice.toFixed(2)}</Text>
      <Text>VAT: ${invoiceData.vatValue.toFixed(2)}</Text>
      <Text>Net Amount: ${invoiceData.netAmount.toFixed(2)}</Text>
      <Button title="Start Timer" onPress={startTimer} disabled={startTime !== null} />
      <Button
        title="Stop Timer"
        onPress={stopTimer}
        disabled={startTime === null || stopTime !== null}
      />
       <Button
        title="Go to Map"
        onPress={() => navigation.navigate('InteractiveMap' , {customer: customer})}
        disabled={!isMapButtonEnabled}
      />
    </View>
  );
};

export default RentPage;
