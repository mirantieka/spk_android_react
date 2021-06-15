import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {shadowButton, height} from '../../helper/DEFINED';
import {httpGet, httpPost} from '../../helper/http';

export default function Profile({navigation}) {
  const [user, setUser] = useState();

  const onLogoutClick = async () => {
    // Do logout
    try {
      await httpPost('auth/logout');
    } catch (error) {}
    // Remove token and user object in async storage
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');

    navigation.navigate('Login');
  };

  useEffect(async () => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await httpGet('user/profile');
        setUser(fetchedUser);
      } catch (error) {}
    };
    fetchUser();
  }, []);

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
          <Text style={styles.sectionOneContentTitle}>Profile</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editButton}>
          <MaterialComunityIcons
            name="account-edit"
            size={35}
            color="#FDB242"
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#242A61'}}>
        <Image
          style={styles.profilePhoto}
          source={require('../../assets/images/kemendikbud.png')}
        />
      </View>
      {user && (
        <SafeAreaView
          style={{
            backgroundColor: '#242A61',
            display: 'flex',
          }}>
          <ScrollView style={styles.sectionTwo}>
            <View>
              <Text style={styles.listItemContentName}>Account Info</Text>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>NIP</Text>
                  <Text style={styles.listItemContentValue}>{user.nip}</Text>
                </View>
              </View>
              <View>
                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>Nama</Text>
                    <Text style={styles.listItemContentValue}>{user.nama}</Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>
                      Username
                    </Text>
                    <Text style={styles.listItemContentValue}>
                      {user.username}
                    </Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>
                      Jenis Kelamin
                    </Text>
                    <Text style={styles.listItemContentValue}>
                      {user.jenis_kelamin}
                    </Text>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>Jabatan</Text>
                    <Text style={styles.listItemContentValue}>
                      {user.jabatan}
                    </Text>
                  </View>
                </View>
                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>Jurusan</Text>
                    <Text style={styles.listItemContentValue}>
                      {user.jurusan}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={onLogoutClick} style={styles.button}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
            <View style={{padding: 120}}></View>
          </ScrollView>
        </SafeAreaView>
      )}
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
  profilePhoto: {
    width: 150,
    height: 120,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionTwo: {
    // height: height,
    // flex: 1,
    height: height * 0.9,
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
    marginBottom: 5,
  },
  listItemContentValue: {
    fontSize: 17,
    color: '#3330EE',
    fontWeight: 'normal',
  },
  button: {
    height: 50,
    width: 350,
    backgroundColor: '#FDB242',
    marginTop: 20,
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
