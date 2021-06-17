import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoadingOverlay from '../../components/LoadingOverlay';
import {colors, shadowButton} from '../../helper/DEFINED';
import {httpGet, httpPost} from '../../helper/http';

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
    width: '100%',
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

export default function Login(props) {
  const navigation = props.navigation;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLoginClick = async () => {
    let data = {
      username: username,
      password: password,
    };
    setIsLoading(true);
    try {
      // Get an auth token
      const token = await httpPost('auth/login', data);
      await AsyncStorage.setItem('authToken', token.key);

      // Get an user object
      const user = await httpGet('/user/profile');
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setIsLoading(false);
      navigation.navigate('Main');
    } catch (err) {
      setIsLoading(false);
      alert(err?.message);
    }
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white'}}>
          <Image
            source={require('../../assets/images/login-image.png')}
            style={styles.logo}
          />
          <Text style={[styles.title, {color: colors.mainBlue}]}>
            WELCOME TO SPK PENILAIAN GURU
          </Text>
          <Text style={[styles.description, {color: colors.mainBlue}]}>
            Please login to continue
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.sectionTwo}>
            <View style={styles.textInput}>
              <IonIcons
                name="person"
                size={25}
                color="#242A61"
                style={{marginStart: 30}}
              />
              <TextInput
                style={{paddingHorizontal: 20, fontSize: 15}}
                placeholder="Username"
                placeholderTextColor="#ADAFB2"
                onChangeText={text => setUsername(text)}
              />
            </View>
            <View style={[styles.textInput, {marginTop: 15}]}>
              <MaterialIcons
                name="lock"
                size={25}
                color="#242A61"
                style={{marginStart: 30}}
              />
              <TextInput
                style={{paddingHorizontal: 20, fontSize: 15}}
                placeholder="Password"
                placeholderTextColor="#ADAFB2"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
              />
            </View>
            <TouchableOpacity onPress={onLoginClick} style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
