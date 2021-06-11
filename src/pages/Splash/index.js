import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Splash(props) {
  const navigation = props.navigation;

  useEffect(async () => {
    const token = await AsyncStorage.getItem('authToken');
    setTimeout(() => {
      if (token) {
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
  },
  title: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
