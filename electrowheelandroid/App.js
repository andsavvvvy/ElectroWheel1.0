import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import InteractiveMap from './components/InteractiveMap';
import ProfilePage from './components/ProfilePage';
import RentPage from './components/RentPage';
import QrCodeScanner from './components/QrCodeScanner';
import RentalHistory from './components/RentalHistory';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegisterForm" component={RegisterForm} />
        <Stack.Screen
          name="InteractiveMap"
          component={InteractiveMap}
          
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          
        />
        <Stack.Screen
          name="RentPage"
          component={RentPage}
         
        />
         <Stack.Screen
          name="RentalHistory"
          component={RentalHistory}
          
        />
        <Stack.Screen
          name="QrCodeScanner"
          component={QrCodeScanner}
         
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
