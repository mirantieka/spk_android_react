import React from 'react'
import { View, Text } from 'react-native'
// import * as Font from ''
// import {useFonts} from '@use-expo/font'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login'
import Home from './pages/Home';
import DaftarGuru from './pages/DaftarGuru'
import DetailGuru from './pages/DetailGuru'
import DaftarKriteria from './pages/DaftarKriteria'
import DetailKriteria from './pages/DetailKriteria'
import DaftarNilai from './pages/DaftarNilai'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import DetailNilai from './pages/DetailNilai'
import Init from './pages/Init'
import WPMethod from './pages/WPMethod'
import AHPMethod from './pages/AHPMethod'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  DaftarGuru: {
    screen: DaftarGuru
  },
  DetailGuru: {
    screen: DetailGuru
  },
  DaftarKriteria: {
    screen: DaftarKriteria
  },
  DetailKriteria: {
    screen: DetailKriteria
  },
  DaftarNilai: {
    screen: DaftarNilai
  },
  DetailNilai: {
    screen: DetailNilai
  },
  Login: {
    screen: Login
  },
  Profile: {
    screen: Profile
  },
  EditProfile: {
    screen: EditProfile
  },
  Init: {
    screen: Init
  },
  WPMethod: {
    screen: WPMethod
  },
  AHPMethod: {
    screen: AHPMethod
  }
},{
  headerMode: 'none',
  initialRouteName: 'Home'
});

const RootComponent = createAppContainer(AppNavigator);

// const customFonts = {
//   QuicksandLight:  require("../src/assets/fonts/Quicksand-Light.ttf")
// }

export default function App() {

  // const [isLoaded] = useFonts(customFonts);

  // if(!isLoaded) {
  //   return <AppLoading />
  // }
  return <RootComponent/>
  // return (
  //   <View>
  //     <Home />
  //   </View>
  // )
}
