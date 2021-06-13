import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AHPMethod from '../../pages/AHPMethod';
import WPMethod from '../../pages/WPMethod';
import DaftarGuru from '../../pages/DaftarGuru';
import DaftarKriteria from '../../pages/DaftarKriteria';
import DaftarNilai from '../../pages/DaftarNilai';
import Home from '../../pages/Home/index';
import ProfileStacks from '../../pages/Profile/ProfileStacks';

export default function Main() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        navigationOptions={{
          drawerIcon: () => (
            <MaterialIcons name="home" size={20} color="#242A61" />
          ),
        }}
      />
      <Drawer.Screen name="DaftarGuru" component={DaftarGuru} />
      <Drawer.Screen name="DaftarNilai" component={DaftarNilai} />
      <Drawer.Screen name="DaftarKriteria" component={DaftarKriteria} />
      <Drawer.Screen name="WPMethod" component={WPMethod} />
      <Drawer.Screen name="AHPMethod" component={AHPMethod} />
      <Drawer.Screen name="ProfileStacks" component={ProfileStacks} />
    </Drawer.Navigator>
  );
}
