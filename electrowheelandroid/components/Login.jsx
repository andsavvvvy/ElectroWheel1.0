import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CustomerService from '../services/CustomerService';
import Notification from './Notification'; // Import the Notification component

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleLogin = async () => {
    try {
      console.log(email);
      const response = await CustomerService.customerLogin(email, password);
      const { data } = response;
      console.log(data);
      
      switch(data) {
        case 'Ok':
          const userData = await CustomerService.getCustomerByEmail(email);
          console.log(userData.data);
          navigation.navigate('InteractiveMap', {customer: userData.data});
          break;
        case 'NotFound':
          setNotificationMessage('Email or password is incorrect.');
          break;
        case 'Banned':
          setNotificationMessage('Your account is banned.');
          break;
        default:
          setNotificationMessage('An unknown error occurred. Please try again.');
      }
      
      setShowNotification(true);
    } catch (error) {
      console.error(error);
      setNotificationMessage('An error occurred. Please try again later.');
      setShowNotification(true);
    }
  };

   const handleRegister = () => {
    navigation.navigate('RegisterForm'); 
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
      {showNotification ? <Notification message={<Text>{notificationMessage}</Text>} onClose={() => setShowNotification(false)} /> : null} 
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

export default Login;
