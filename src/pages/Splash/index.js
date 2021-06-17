import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../helper/DEFINED';

export default function Splash(props) {
  const navigation = props.navigation;

  useEffect(async () => {
    const token = await AsyncStorage.getItem('authToken');
    const user = await AsyncStorage.getItem('user');
    setTimeout(() => {
      if (token && user) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPK App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.mainBlue,
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
