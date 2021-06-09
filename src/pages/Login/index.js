import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {shadowButton} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Login from '../../assets/images/login.png';
import {post} from '../../helper/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index(props) {
  // console.log("props", props);

  const navigation = props.navigation;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = React.useCallback(() => {
    let body = {
      username: username,
      password: password,
    };
    post('users/postapilogin', body).then(async response => {
      // console.log("response login", response);
      if (response.success === true) {
        //pindah layar
        await Promise.all([
          AsyncStorage.setItem('userId', response.data.id.toString()),
          AsyncStorage.setItem('userName', response.data.nama),
        ]);

        navigation.navigate('Home');
      } else {
        alert(response.message);
        //alert username atau pass salah
      }
    });
  });

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'white'}}>
        <Image source={Login} style={styles.logo} />
        <Text style={[styles.title, {color: '#242A61'}]}>
          WELCOME TO SPK PENILAIAN GURU
        </Text>
        <Text style={[styles.description, {color: '#242A61'}]}>
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
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
