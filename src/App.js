import React from 'react';
import {View, Text, StyleSheet, Button, Image, Slider} from 'react-native';
// import * as Font from ''
// import {useFonts} from '@use-expo/font'
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './pages/Login';
import Home from './pages/Home';
import DaftarGuru from './pages/DaftarGuru';
import DetailGuru from './pages/DetailGuru';
import DaftarKriteria from './pages/DaftarKriteria';
import DetailKriteria from './pages/DetailKriteria';
import DaftarNilai from './pages/DaftarNilai';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import DetailNilai from './pages/DetailNilai';
import Init from './pages/Init';
import WPMethod from './pages/WPMethod';
import AHPMethod from './pages/AHPMethod';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerIcon: () => (
        <MaterialIcons name="home" size={20} color="#242A61" />
      ) 
    }
  },  
  'Daftar Guru': {
    screen: DaftarGuru,
  },
  'Daftar Kriteria': {
    screen: DaftarKriteria,
  },
  'Daftar Nilai': {
    screen: DaftarNilai,
  },
});

const RootComponent = createAppContainer(MyDrawerNavigator);

export default function App() {
  return <RootComponent />;
}
