import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {height} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';

export default function DaftarGuru(props) {
  const navigation = props.navigation;
  const [users, setUsers] = useState();
  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarGuru-${item.id}-${index}`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailGuru', {data: item})}>
          <View style={styles.listItem}>
            <Image
              style={styles.profilePhoto}
              source={require('../../assets/images/kemendikbud.png')}
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await httpGet('users');
        setUsers(fetchedUsers);
      } catch (error) {}
    };
    fetchData();
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
          <Text style={styles.sectionOneContentTitle}>Daftar Guru</Text>
        </View>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: '#242A61',
          display: 'flex',
        }}>
        <ScrollView style={styles.sectionTwo}>
          {users == null ? (
            <View style={[styles.loading]}>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#0000ff"
              />
            </View>
          ) : users.length == 0 ? (
            <View>
              <Text>No Data Available</Text>
            </View>
          ) : (
            users.map((item, index) => renderItem({item, index}))
          )}
          <View style={{padding: 40}}></View>
        </ScrollView>
      </SafeAreaView>
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
  scrollview: {
    flexGrow: 1,
  },
  profilePhoto: {
    width: 50,
    height: 40,
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
