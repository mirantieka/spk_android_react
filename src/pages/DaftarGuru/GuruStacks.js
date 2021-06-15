import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DaftarGuru from '.';
import DetailGuru from '../DetailGuru';

const GuruStacks = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DaftarGuru" component={DaftarGuru} />
      <Stack.Screen name="DetailGuru" component={DetailGuru} />
    </Stack.Navigator>
  );
};

export default GuruStacks;
