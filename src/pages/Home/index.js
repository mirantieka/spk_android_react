import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import {height, shadow} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {getFromAsyncStorage} from '../../helper/Storage';
import kemendikbud from '../../assets/images/kemendikbud.png'

export default function index(props) {
  const navigation = props.navigation;
  const [nama, setNama] = React.useState('-');

  const getNama = React.useCallback(async () => {
    let namaFromStorage = await getFromAsyncStorage('userName');
    setNama(namaFromStorage);
  });

  React.useEffect(() => {
    getNama();
  });

  return (
    <>
      <View style={styles.sectionOne}>
      <Image
          style={styles.profile}
          source={kemendikbud}
        />
        <View>
          <Text style={styles.sectionOneContentHello}>Hello,</Text>
          <Text style={styles.sectionOneContentName}>{nama}</Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#242A61', height: height * 0.75}}>
        <View style={styles.sectionTwo}>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DaftarGuru')}
              style={[
                styles.menu,
                {
                  backgroundColor: '#FFD2F8',
                },
              ]}>
              <View style={styles.menuContent}>
                <MaterialIcons name="people" size={40} color="#AC20DD" />
                <Text style={[styles.menuText, {color: '#AC20DD'}]}>
                  Daftar Guru
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('DaftarKriteria')}
              style={[styles.menu, {backgroundColor: '#E4E9FF'}]}>
              <View style={styles.menuContent}>
                <FontAwesome5Icons
                  name="puzzle-piece"
                  size={27}
                  color="#11CBBF"
                  style={{marginTop: 10, marginBottom: 3, marginLeft: 8}}
                />
                <Text style={[styles.menuText, {color: '#11CBBF'}]}>
                  Daftar Kriteria
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DaftarNilai')}
              style={[styles.menu, {backgroundColor: '#FDDCDC'}]}>
              <View style={styles.menuContent}>
                <SimpleLineIcons name="graph" size={35} color="#F2475B" />
                <Text style={[styles.menuText, {color: '#F2475B'}]}>
                  Daftar Nilai
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('WPMethod')}
              style={[styles.menu, {backgroundColor: '#D9D2FF'}]}>
              <View style={styles.menuContent}>
                <MaterialIcons
                  name="assignment-turned-in"
                  size={30}
                  color="#3330EE"
                  style={{marginTop: 5, marginBottom: 2}}
                />
                <Text style={[styles.menuText, {color: '#3330EE'}]}>
                  WP Method
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AHPMethod')}
              style={[styles.menu, {backgroundColor: '#FFF0D2'}]}>
              <View style={styles.menuContent}>
                <MaterialIcons
                  name="assignment"
                  size={30}
                  color="#EC9615"
                  style={{marginTop: 5, marginBottom: 2}}
                />
                <Text style={[styles.menuText, {color: '#EC9615'}]}>
                  AHP Method
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={[styles.menu, {backgroundColor: '#FFD2E2'}]}>
              <View style={styles.menuContent}>
                <MaterialIcons
                  name="person"
                  size={35}
                  color="#E81B7D"
                  style={{marginTop: 5}}
                />
                <Text style={[styles.menuText, {color: '#E81B7D'}]}>
                  Profile
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
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionOneContentHello: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#F0F2F5',
  },
  sectionOneContentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profile: {
    width: 80,
    height: 60,
    marginRight: 10
  },
  sectionTwo: {
    height: height * 0.8,
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  menu: {
    width: 165,
    height: 120,

    borderRadius: 30,
    ...shadow,
  },
  menuContent: {
    alignItems: 'center',
    padding: 20,
  },
  menuText: {
    alignItems: 'center',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
  },
});
