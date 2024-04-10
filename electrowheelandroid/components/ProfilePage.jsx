import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomerService from '../services/CustomerService';
import Notification from './Notification'; // Import the Notification component
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import NavigationBar from './NavigationBar'; // Import the NavBar component


const ProfilePage = () => {

  const navigation = useNavigation(); // Access the navigation object

  const route = useRoute();
  const { customer } = route.params;

  const [editCustomer, setEditCustomer] = useState(customer);
  const [editNameMode, setEditNameMode] = useState(false);
  const [editBillingAddressMode, setEditBillingAddressMode] = useState(false);
  const [editEmailPasswordMode, setEditEmailPasswordMode] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const [editEmail, setEditEmail] = useState(customer.email);
  const [editPassword, setEditPassword] = useState(customer.password);
  const [editConfirmPassword, setEditConfirmPassword] = useState('');
  const [editFirstName, setEditFirstName] = useState(customer.firstName);
  const [editLastName, setEditLastName] = useState(customer.lastName);
  const [editBillingAddress, setEditBillingAddress] = useState(customer.billingAddress);

  const handleUpdateName = async () => {
    try {
      const response = await CustomerService.updateCustomerName({
        idCustomer: customer.idCustomer,
        firstName: editFirstName,
        lastName: editLastName
      });
      console.log('Name updated successfully');
       setEditCustomer(prevCustomer => ({
      ...prevCustomer,
      firstName: editFirstName,
      lastName: editLastName
    }));
      setEditNameMode(false);
      setNotificationMessage('Name updated successfully');
      setShowNotification(true);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handleUpdateBillingAddress = async () => {
    try {
      const response = await CustomerService.updateCustomerBillingAddress({
        idCustomer: customer.idCustomer,
        billingAddress: editBillingAddress
      });

      setEditCustomer(prevCustomer => ({
      ...prevCustomer,
      billingAddress: editBillingAddress
    }));
      console.log('Billing address updated successfully');
      setEditBillingAddressMode(false);
      setNotificationMessage('Billing address updated successfully');
      setShowNotification(true);
    } catch (error) {
      console.error('Error updating billing address:', error);
    }
  };

  const handleUpdateEmailPassword = async () => {
    try {
      // Check if passwords match
      if (editPassword === editConfirmPassword) {
        const response = await CustomerService.updateCustomerEmailAndPassword({
          idCustomer: customer.idCustomer,
          email: editEmail,
          password: editPassword
        });
         setEditCustomer(prevCustomer => ({
          ...prevCustomer,
          email: editEmail,
          password: editPassword
         }));
        console.log('Email and password updated successfully');
        setEditEmailPasswordMode(false);
        setNotificationMessage('Email and password updated successfully');
        setShowNotification(true);
      } else {
        // If passwords don't match, show error message
        console.error('Passwords do not match');
      }
    } catch (error) {
      console.error('Error updating email and password:', error);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await CustomerService.deleteCustomer(customer.idCustomer);

      // Navigate to the login page upon successful deletion
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email: {editCustomer.email}</Text>
      <Text>First Name: {editNameMode ? (
        <TextInput
          style={styles.input}
          value={editFirstName}
          onChangeText={setEditFirstName}
        />
      ) : (
        editCustomer.firstName
      )}</Text>
      <Text>Last Name: {editNameMode ? (
        <TextInput
          style={styles.input}
          value={editLastName}
          onChangeText={setEditLastName}
        />
      ) : (
        editCustomer.lastName
      )}</Text>
      <Text>Warning Level: {customer.warningLevel}</Text>
      <Text>Billing Address: {editBillingAddressMode ? (
        <TextInput
          style={styles.input}
          value={editBillingAddress}
          onChangeText={setEditBillingAddress}
        />
      ) : (
        editCustomer.billingAddress
      )}</Text>
      
      {(!editNameMode && !editBillingAddressMode && !editEmailPasswordMode) && (
        <Button title="Edit Name" onPress={() => setEditNameMode(true)} />
      )}
      
      {(!editNameMode && !editBillingAddressMode && !editEmailPasswordMode) && (
        <Button title="Edit Billing Address" onPress={() => setEditBillingAddressMode(true)} />
      )}

      {(!editNameMode && !editBillingAddressMode && !editEmailPasswordMode) && (
        <Button title="Edit Email and Password" onPress={() => setEditEmailPasswordMode(true)} />
      )}

      {editNameMode && (

        <View>
          <Text>New First Name:</Text>
          <TextInput
            style={styles.input}
            value={editFirstName}
            onChangeText={setEditFirstName}
          />
          <Text>New Last Name:</Text>
          <TextInput
            style={styles.input}
            value={editLastName}
            onChangeText={setEditLastName}
          />
          
        
        <Button title="Save Changes" onPress={handleUpdateName} />
        <Button title="Cancel" onPress={() => setEditNameMode(false)} />
        </View>
      )}

      {editBillingAddressMode && (
         <View>
          <Text>New Billing Address:</Text>
          <TextInput
            style={styles.input}
            value={editBillingAddress}
            onChangeText={setEditBillingAddress}
          />
          
        <Button title="Save Changes" onPress={handleUpdateBillingAddress} />
        <Button title="Cancel" onPress={() => setEditBillingAddressMode(false)} />
        
        </View>
        
      )}

      {editEmailPasswordMode && (
        <View>
          <Text>New Email:</Text>
          <TextInput
            style={styles.input}
            value={editEmail}
            onChangeText={setEditEmail}
          />
          <Text>New Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={editPassword}
            onChangeText={setEditPassword}
          />
          <Text>Confirm New Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={editConfirmPassword}
            onChangeText={setEditConfirmPassword}
          />
          <Button title="Save Changes" onPress={handleUpdateEmailPassword} />
          <Button title="Cancel" onPress={() => setEditEmailPasswordMode(false)} />
        </View>
      )}

      {showNotification && (
        <Notification message={notificationMessage} onClose={handleCloseNotification} />
      )}
       
       <Button title = "Disconnect" onPress={() => navigation.navigate('Login')}/>
       <Button title = "Delete Account" onPress={handleDeleteAccount}/>
       <NavigationBar customer={editCustomer} />
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

export default ProfilePage;
