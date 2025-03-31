import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chillr from './chillr';
import Explore from './explore';
import TripDetails from './tripDetails';
import { useNavigationContainerRef } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  const navigationRef = useNavigationContainerRef();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Chillr" component={Chillr} />
      <Tab.Screen name="Explore" component={Explore} />
    </Tab.Navigator>
  );
}