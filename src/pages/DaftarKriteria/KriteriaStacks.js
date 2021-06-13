import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DaftarKriteria from '.';
import Profile from '.';
import DetailKriteria from '../DetailKriteria';
import EditProfile from '../EditProfile';

const KriteriaStacks = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DaftarKriteria" component={DaftarKriteria} />
      <Stack.Screen name="DetailKriteria" component={DetailKriteria} />
    </Stack.Navigator>
  );
};

export default KriteriaStacks;
