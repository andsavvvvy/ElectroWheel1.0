import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import Notification from './Notification';
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';
import RentalsService from '../services/RentalsService';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavigationBar from './NavigationBar';

const QrCodeScanner = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { customer } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      await fetchObjectData(data);
    }
  };

  const fetchObjectData = async (vehicleId) => {
  try {
    console.log(vehicleId);
    

    const newRentalId = await RentalsService.getNewRentalId();
    console.log(newRentalId.data);
    const response = await VehiclesService.getVehicleById(vehicleId);
    const typeDataResponse = await VehicleTypesService.getVehicleTypeById(response.data.idVehicle_Type);
    const type = typeDataResponse.data;
    const vehicleWithDetails = { ...response.data, type };

   

    navigation.navigate('RentPage', {
      customer: customer,
      rentalid: newRentalId.data,
      vehicle: vehicleWithDetails,
    });

    setNotificationMessage(`Object Data: ${JSON.stringify(response.data)}`);
    setShowNotification(true);
  } catch (error) {
    console.error(error);
    setNotificationMessage('Failed to fetch object data');
    setShowNotification(true);
  }
};


  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.preview}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={handleBarCodeScanned}
      />
      <View style={styles.overlay} />
      {showNotification && <Notification message={notificationMessage} onClose={handleCloseNotification} />}
      <NavigationBar customer={customer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default QrCodeScanner;
