import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { shadowButton } from '../../helper/DEFINED';
import { httpGet, httpPut } from '../../helper/http';

export default function EditProfile(props) {
  const navigation = props.navigation;

  const [user, setUser] = useState();
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [jurusan, setJurusan] = useState('');

  const editProfile = async () => {
    const body = {
      ...user,
      nama: nama || user.nama,
      username: username || user.username,
      gender: gender || user.gender,
      jabatan: jabatan || user.jabatan,
      jurusan: jurusan || user.jurusan,
    };

    try {
      await httpPut(`user/update/${user.id}`, body);
      alert('Data berhasil diubah!');
      navigation.navigate('Profile');
    } catch (error) {
      console.error(error);
      alert('Data gagal diubah!');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await httpGet('user/profile');
      setUser(fetchedUser);
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
          <Text style={styles.sectionOneContentTitle}>Edit Profile</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#242A61'}}>
        <Image
          style={styles.profilePhoto}
          source={require('../../assets/images/kemendikbud.png')}
        />
      </View>
      {user && (
        <ScrollView style={{backgroundColor: '#242A61'}}>
          <View style={styles.sectionTwo}>
            <View>
              <Text style={styles.listItemContentName}>Account Info</Text>
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>NIP</Text>
                  <TextInput
                    style={styles.listItemContentValue}
                    editable={false}>
                    {user.nip} 
                  </TextInput>
                </View>
              </View>
              <View>
                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>Nama</Text>
                    <TextInput
                      style={styles.listItemContentValue}
                      onChangeText={text => setNama(text)}
                      defaultValue={user.nama}></TextInput>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>
                      Username
                    </Text>
                    <TextInput
                      style={styles.listItemContentValue}
                      onChangeText={text => setUsernametext}
                      defaultValue={user.username}
                    />
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>
                      Jenis Kelamin
                    </Text>
                    <TextInput
                      style={styles.listItemContentValue}
                      onChangeText={text => setGender(text)}
                      defaultValue={user.jenis_kelamin}
                    ></TextInput>
                  </View>
                </View>

                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>Jabatan</Text>
                    <TextInput
                      style={styles.listItemContentValue}
                      onChangeText={text => setJabatan(text)}
                      defaultValue={user.jabatan}
                    />
                  </View>
                </View>
                <View style={styles.listItem}>
                  <View>
                    <Text style={styles.listItemContentAttribute}>Jurusan</Text>
                    <TextInput
                      style={styles.listItemContentValue}
                      onChangeText={text => setJurusan(text)}
                      defaultValue={user.jurusan}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => editProfile()}
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
                onPress={() => navigation.navigate('Profile')}
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
    fontFamily: 'Quicksand-Bold',
    color: '#F0F2F5',
  },
  backButton: {
    marginRight: 10,
  },
  editButton: {
    marginLeft: 'auto',
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
    fontFamily: 'Quicksand-Bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  listItemContentAttribute: {
    fontSize: 15,
    color: '#242A61',
    fontFamily: 'Quicksand-Bold',
    marginTop: 20,
  },
  listItemContentValue: {
    fontSize: 17,
    color: '#3330EE',
    fontFamily: 'Quicksand-Medium',
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
    fontFamily: 'Quicksand-Bold',
    fontSize: 19,
    color: 'white',
  },
  profilePhoto: {
    width: 150,
    height: 120,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
