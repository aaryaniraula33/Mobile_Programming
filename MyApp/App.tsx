import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './DashboardScreen';
import ContactUsScreen from './ContactUsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;