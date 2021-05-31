import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {height, shadowButton, width} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {get} from '../../helper/http';
import { getFromAsyncStorage } from '../../helper/Storage';

const data = [
  {
    id: 1,
    attribut: 'Nama:',
    value: 'Nur Ismi Fahmia',
  },
  {
    id: 2,
    attribut: 'Email:',
    value: 'ismiee@gmail.com',
  },
  {
    id: 3,
    attribut: 'Password:',
    value: '*********',
  },
  {
    id: 4,
    attribut: 'Role:',
    value: 'Tim PKG',
  },
];

export default function index(props) {
  const navigation = props.navigation;

  const [nip, setNip] = React.useState("");
  const [nama, setNama] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [jenkel, setJenkel] = React.useState("");
  const [jabatan, setJabatan] = React.useState("");

  const editProfile = React.useCallback(() => {
    let body = {
      nip: nip,
      nama: nama,
      username: username,
      password: password,
      jenkel: jenkel,
      jabatan: jabatan
    };
    put(`user/update/${userIdFromStorage}`, body).then(async response => {
      console.log("response update", response);
      if(response.success === true){
        //pindah layar ke halaman profile
        await Promise.all([
          AsyncStorage.setItem('userId', response.data.id.toString()),
          AsyncStorage.setItem('userName', response.data.nama)
        ]);

        navigation.navigate('Profile');
      }
      else{
        alert(response.message);
        //alert username atau pass salah
      }
    });
  });
  const [id, setId] = React.useState('-');

  const getUserId = React.useCallback(async () => {
    let userIdFromStorage = await getFromAsyncStorage('userId');
    get(`user/${userIdFromStorage}/profile`).then(response => {
      console.log(response);
      setId(response[0]);
    });
  });

  React.useEffect(() => {
    getUserId();
  });

  return (
    <>
      <View style={styles.sectionOne}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="chevron-left"
            size={35}
            color="#F0F2F5"
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.sectionOneContentTitle}>Edit Profile</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#242A61'}}>
        <IonIcons
          name="person-circle"
          size={140}
          color="#C9CACE"
          style={styles.profilePhoto}
        />
        {/* <Text style={{position: 'absolute', top: 0, right: 0, backgroundColor: 'white', width:24, height:24}}>10</Text> */}
      </View>
      <ScrollView style={{backgroundColor: '#242A61'}}>
        <View style={styles.sectionTwo}>
          <View>
            <Text style={styles.listItemContentName}>Account Info</Text>

            <View style={styles.listItem}>
              <View>
                <Text style={styles.listItemContentAttribute}>NIP</Text>
                <TextInput style={styles.listItemContentValue}>{id.nip}</TextInput>
              </View>
            </View>
            <View>
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>Nama</Text>
                  <TextInput style={styles.listItemContentValue}>{id.nama}</TextInput>
                </View>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>Username</Text>
                  <TextInput style={styles.listItemContentValue}>{id.username}</TextInput>
                </View>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>
                    Jenis Kelamin
                  </Text>
                  <TextInput style={styles.listItemContentValue}>
                    {id.jenis_kelamin}
                  </TextInput>
                </View>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>Jabatan</Text>
                  <TextInput style={styles.listItemContentValue}>{id.jabatan}</TextInput>
                </View>
              </View>
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>Jurusan</Text>
                  <TextInput style={styles.listItemContentValue}>{id.jurusan}</TextInput>
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={[styles.button, {backgroundColor: '#FDB242'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: 30,
                  marginTop: 10,
                }}>
                <MaterialIcons
                  name="check"
                  size={30}
                  color="#fff"
                  style={styles.backButton}
                />
                <Text style={styles.buttonText}>SAVE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={[styles.button, {backgroundColor: '#DCE9E3'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: 25,
                  marginTop: 10,
                }}>
                <MaterialIcons
                  name="refresh"
                  size={30}
                  color="#FDB242"
                  style={styles.backButton}
                />
                <Text style={[styles.buttonText, {color: '#FDB242'}]}>
                  CANCEL
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionOne: {
    backgroundColor: '#242A61',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionOneContentTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#F0F2F5',
  },
  backButton: {
    marginRight: 10,
  },
  editButton: {
    marginLeft: 'auto',
  },
  profile: {
    marginRight: 10,
  },
  profilePhoto: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  sectionTwo: {
    // height: height,
    // flex: 1,
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  listItem: {
    height: 70,
    backgroundColor: 'white',
    borderColor: '#E1D7D7',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContentName: {
    fontSize: 20,
    color: '#242A61',
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  listItemContentAttribute: {
    fontSize: 15,
    color: '#242A61',
    fontWeight: 'bold',
    marginTop: 20,
  },
  listItemContentValue: {
    fontSize: 17,
    color: '#3330EE',
    fontWeight: 'normal',
    marginTop: -5,
  },
  button: {
    height: 50,
    width: 160,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 30,
    alignSelf: 'center',
    ...shadowButton,
  },
  buttonText: {
    alignSelf: 'center',
    // marginTop: 13,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
});
