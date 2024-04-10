import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Notification from './Notification'; // Import the Notification component
import CustomerService from '../services/CustomerService';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


const RegisterForm = () => {

      const navigation = useNavigation(); // Access the navigation object


  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    billingAddress: '',
    password: '',
    confirmPassword: '',
    warningLevel: 0,
  });

  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleRegister = async () => {
    
    const {confirmPassword,  ...data } = formData;

    if (data.password !== confirmPassword) {
      setNotificationMessage('The passwords do not match. Please try again.');
      setShowNotification(true);
      return;
    }

    try {
      const newId = await CustomerService.getNewCustomerId();
      const idCustomer = newId.data;
      const response = await CustomerService.insertCustomer({idCustomer, ...data});
      // Handle successful registration response
      setNotificationMessage('Registration Successful. You are now registered!');
      setShowNotification(true);
      navigation.navigate('Login');
      // You can navigate to another screen upon successful registration
    } catch (error) {
      // Handle registration error
      console.error(error);
      setNotificationMessage('Failed to register. Please try again.');
      setShowNotification(true);
    }
  };

  const handleChangeText = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChangeText('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleChangeText('firstName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleChangeText('lastName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Billing Address"
        value={formData.billingAddress}
        onChangeText={(value) => handleChangeText('billingAddress', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleChangeText('password', value)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChangeText('confirmPassword', value)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Log In" onPress={() => navigation.navigate('Login')} />
      {showNotification && (
        <Notification message={notificationMessage} onClose={handleCloseNotification} />
      )} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default RegisterForm;
