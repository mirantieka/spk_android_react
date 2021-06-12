import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Profile from '.';
import EditProfile from '../EditProfile';

const ProfileStacks = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStacks;
