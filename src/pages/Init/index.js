import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { shadowButton } from '../../helper/DEFINED';

export default function index(props) {
  const navigation = props.navigation;
  setTimeout(async () => {
      let userId = await AsyncStorage.getItem("userId");
      let userName = await AsyncStorage.getItem("userName");
      console.log("userId", userId);
      console.log("userName", userName);
      if(userId){
        navigation.navigate("Home");
      }
      else{
        navigation.navigate("Login");
      }
  }, 1000);

  return (
    <View>
      <Text>ISMIRANTI TATITAITIIATAITAII</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 190,
    marginLeft: -10,
    marginTop: 50,
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
    marginTop: 30,
    marginBottom: 8,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    alignSelf: 'center',
  },
  sectionOneContentTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#F0F2F5',
  },
  sectionTwo: {
    padding: 30,
    backgroundColor: 'white',
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0F2F5',
    borderRadius: 30,
    paddingVertical: 2,
  },
  button: {
    height: 50,
    width: 350,
    backgroundColor: '#FDB242',
    marginTop: 35,
    marginBottom: 15,
    borderRadius: 30,
    alignSelf: 'center',
    ...shadowButton,
  },
  buttonText: {
    alignSelf: 'center',
    marginTop: 13,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
  },
});
