// InteractiveMap.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Import Text component
import MapView, { Marker, Callout } from 'react-native-maps';
import NavigationBar from './NavigationBar'; // Import the NavBar component
import VehiclesService from '../services/VehiclesService';
import VehicleTypesService from '../services/VehicleTypesService';
import { useRoute } from '@react-navigation/native';

const InteractiveMap = () => { // 1. Receive customer prop

  const route = useRoute();
  const { customer } = route.params;
  const [vehicles, setVehicles] = useState([]);
  console.log(customer);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await VehiclesService.getAllVehicles();
      const vehiclesWithTypes = await Promise.all(response.data.map(async vehicle => {
        const typeDataResponse = await VehicleTypesService.getVehicleTypeById(vehicle.idVehicle_Type);
        const type = typeDataResponse.data;
        return { ...vehicle, type };
      }));
      setVehicles(vehiclesWithTypes.filter(vehicle => vehicle.available !== 0));
      console.log(vehicles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {customer.firstName}</Text> 
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.4268,
          longitude: 26.1025,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.idVehicle}
            coordinate={{
              latitude: parseFloat(vehicle.xcoord),
              longitude: parseFloat(vehicle.ycoord),
            }}
            idVehicle={vehicle.idVehicle}
            description={vehicle.type.description_Vehicle}
          >
            <Callout>
              <View>
                <Text>{vehicle.type.description_Vehicle}</Text>
                <Text>Price per minute: {vehicle.type.price_Per_Minute}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <NavigationBar customer={customer}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  greeting: { // Define styles for the greeting message
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default InteractiveMap;
