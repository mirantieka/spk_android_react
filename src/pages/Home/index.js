import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {height, shadow, width} from '../../helper/DEFINED';
import {getFromAsyncStorage} from '../../helper/Storage';

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
    width: 60,
    height: 60,
    marginRight: 10,
  },
  sectionTwo: {
    height: height * 0.8,
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    display: 'flex',
  },
  wrapper: {
    marginBottom: 22,
  },
  menu: {
    height: 50,
    borderRadius: 15,
    ...shadow,
  },
  menuContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 1
  },
  menuIcon: {
    // paddingHorizontal: 5,
    // marginHorizontal: 60,
    marginLeft: 90,
    marginRight: 20
    // marginVertical: 5,
  },
  menuText: {
    alignItems: 'center',
    fontSize: 19,
    fontWeight: '700',
    flex: 1
    // marginVertical: 5,
    // paddingHorizontal: 10,
  },
});

export default function Home(props) {
  const navigation = props.navigation;
  const [nama, setNama] = useState('-');

  useEffect(async () => {
    const user = await getFromAsyncStorage('user');
    const nama = JSON.parse(user).nama;
    setNama(nama);
  }, []);

  return (
    <>
      <View style={styles.sectionOne}>
        <Image
          style={styles.profile}
          source={require('../../assets/images/kemendikbud.png')}
        />
        <View>
          <Text style={styles.sectionOneContentHello}>Hello,</Text>
          <Text style={styles.sectionOneContentName}>{nama}</Text>
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: '#242A61',
          height: height * 0.75,
          display: 'flex',
        }}>
        <View style={styles.sectionTwo}>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DaftarGuru')}
              style={[
                styles.menu,
                {
                  alignSelf: 'stretch',
                  backgroundColor: '#FFD2F8',
                },
              ]}>
              <View style={styles.menuContent}>
                <MaterialIcons
                  name="people"
                  size={35}
                  color="#AC20DD"
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, {color: '#AC20DD'}]}>
                  Daftar Guru
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('KriteriaStacks')}
              style={[styles.menu, {backgroundColor: '#E4E9FF'}]}>
              <View style={styles.menuContent}>
                <MaterialIcons
                  name="extension"
                  size={35}
                  color="#11CBBF"
                  style={styles.menuIcon}
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
                <MaterialIcons
                  name="show-chart"
                  size={35}
                  color="#F2475B"
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, {color: '#F2475B'}]}>
                  Daftar Nilai
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#cecece',
              borderBottomWidth: 1,
              width: width * 0.85,
              marginBottom: 25,
            }}
          />
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WPMethod')}
              style={[styles.menu, {backgroundColor: '#D9D2FF'}]}>
              <View style={styles.menuContent}>
                <MaterialIcons
                  name="assignment-turned-in"
                  size={35}
                  color="#3330EE"
                  style={styles.menuIcon}
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
                  size={35}
                  color="#EC9615"
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, {color: '#EC9615'}]}>
                  AHP Method
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#cecece',
              borderBottomWidth: 1,
              width: width * 0.85,
              marginBottom: 25,
            }}
          />
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileStacks')}
              style={[styles.menu, {backgroundColor: '#FFD2E2'}]}>
              <View style={styles.menuContent}>
                <MaterialIcons
                  name="person"
                  size={35}
                  color="#E81B7D"
                  style={styles.menuIcon}
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
