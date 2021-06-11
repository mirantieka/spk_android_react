import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen
          name="Login"
          component={Login}
          navigationOptions={{
            drawerIcon: () => (
              <MaterialIcons name="home" size={20} color="#242A61" />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          navigationOptions={{
            drawerIcon: () => (
              <MaterialIcons name="home" size={20} color="#242A61" />
            ),
          }}
        />
        {/* <Drawer.Screen name="Daftar Kriteria" />
        <Drawer.Screen name="Daftar Nilai" /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
