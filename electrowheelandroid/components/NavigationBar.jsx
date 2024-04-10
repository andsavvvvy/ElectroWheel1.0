// NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useRoute } from '@react-navigation/native';



const NavigationBar = () => {
    const navigation = useNavigation(); // Access the navigation object
    const route = useRoute();
    const { customer } = route.params;

    const handleNavigate = (screenName) => {
    navigation.navigate(screenName, { customer });
  };
  return (
     <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigate('InteractiveMap')}>
        <Text style={styles.link}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('QrCodeScanner')}>
        <Text style={styles.link}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('RentalHistory')}>
        <Text style={styles.link}>Rentals</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigate('ProfilePage')}>
        <Text style={styles.link}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Position the container at the bottom
    bottom: 0, // Align to the bottom of the screen
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%', // Take the full width of the screen
    paddingVertical: 10, // Add some vertical padding for better spacing
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default NavigationBar;
