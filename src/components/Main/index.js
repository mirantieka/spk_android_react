import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AHPMethod from '../../pages/AHPMethod';
import DaftarGuru from '../../pages/DaftarGuru';
import GuruStacks from '../../pages/DaftarGuru/GuruStacks';
import KriteriaStacks from '../../pages/DaftarKriteria/KriteriaStacks';
import DaftarNilai from '../../pages/DaftarNilai';
import HasilAkhir from '../../pages/HasilAkhir';
import Home from '../../pages/Home/index';
import ProfileStacks from '../../pages/Profile/ProfileStacks';
import WPMethod from '../../pages/WPMethod';

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
      <Drawer.Screen
        name="DaftarGuru"
        component={GuruStacks}
        options={{drawerLabel: 'Daftar Guru'}}
      />
      <Drawer.Screen
        name="DaftarNilai"
        component={DaftarNilai}
        options={{drawerLabel: 'Daftar Nilai'}}
      />
      <Drawer.Screen
        name="KriteriaStacks"
        component={KriteriaStacks}
        options={{drawerLabel: 'Kriteria'}}
      />
      <Drawer.Screen
        name="WPMethod"
        component={WPMethod}
        options={{drawerLabel: 'WP Method'}}
      />
      <Drawer.Screen
        name="AHPMethod"
        component={AHPMethod}
        options={{drawerLabel: 'AHP Method'}}
      />
      <Drawer.Screen
        name="HasilAkhir"
        component={HasilAkhir}
        options={{drawerLabel: 'Hasil Akhir'}}
      />
      <Drawer.Screen
        name="ProfileStacks"
        component={ProfileStacks}
        options={{drawerLabel: 'Profile'}}
      />
    </Drawer.Navigator>
  );
}
