import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@react-native-vector-icons/feather';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen.tsx';
import ContactUsScreen from './src/screens/ContactUsScreen.tsx';
import ReportHarassmentScreen from './src/screens/ReportHarassmentScreen';
import TrackComplaintScreen from './src/screens/TrackComplaintScreen';
import EmergencyHelpScreen from './src/screens/EmergencyHelpScreen';
import SafetyLearningScreen from './src/screens/SafetyLearningScreen';
import CrimeInfoScreen from './src/screens/CrimeInfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator — shown after login
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }: any) => {
          const icons: Record<string, string> = {
            Home: 'home',
            Report: 'alert-triangle',
            Track: 'file-text',
            Emergency: 'phone-call',
            Learn: 'book-open',
          };
          return <Feather name={icons[route.name] as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Report" component={ReportHarassmentScreen} />
      <Tab.Screen name="Track" component={TrackComplaintScreen} />
      <Tab.Screen name="Emergency" component={EmergencyHelpScreen} />
      <Tab.Screen name="Learn" component={SafetyLearningScreen} />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Main app with bottom tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Screens accessible from tabs */}
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="CrimeInfo" component={CrimeInfoScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ReportHarassment" component={ReportHarassmentScreen} />
        <Stack.Screen name="TrackComplaint" component={TrackComplaintScreen} />
        <Stack.Screen name="EmergencyHelp" component={EmergencyHelpScreen} />
        <Stack.Screen name="SafetyLearning" component={SafetyLearningScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;