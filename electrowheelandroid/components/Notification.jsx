import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Notification = ({ message, onClose }) => {
  return (
    <TouchableOpacity onPress={onClose} style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  message: {
    color: 'white',
  },
});

export default Notification;
