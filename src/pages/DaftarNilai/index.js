import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {height} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {get, post} from '../../helper/http';

export default function index(props) {
  const navigation = props.navigation;
  const [users, setUsers] = React.useState([{}]);
  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarNilai-${item.id}-${index}`}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailNilai', {data: item})}>
          <View style={styles.listItem}>
            <IonIcons
              name="person-circle"
              size={50}
              color="#C9CACE"
              style={styles.profile}
            />
            <View>
              <Text style={styles.listItemContentName}>{item.nama}</Text>
              <Text style={styles.listItemContentMapel}>
                {item.jurusan || item.jabatan}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const login = React.useCallback(() => {
    let body = {
      username: '',
      password: '',
    };
    post('user/login', body).then(response => {
      if(response.success === true){
        //pindah layar
      }
      else{
        //alert username atau pass salah
      }
    });
  });

  const fetchData = React.useCallback(() => {
    // get('user/guru').then(response => {
    //   setGuru(response);
    // });
    get('users').then(response => {
      console.log('response', response);
      setUsers(response);
    });
  });

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          <Text style={styles.sectionOneContentTitle}>Daftar Nilai</Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#242A61', height: height * 0.85}}>
        <View style={styles.sectionTwo}>
          {users.map((item, index) => renderItem({item, index}))}
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
  profile: {
    marginRight: 10,
  },
  sectionTwo: {
    height: height * 0.9,
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  listItem: {
    height: 100,
    padding: 20,
    backgroundColor: 'white',
    borderColor: '#F0F2F5',
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContentName: {
    fontSize: 17,
    color: '#242A61',
    fontWeight: 'bold',
  },
  listItemContentMapel: {
    fontSize: 14,
    color: '#3330EE',
    fontWeight: 'normal',
  },
});
