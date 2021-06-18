import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, height, shadow, userRoles, width} from '../../helper/DEFINED';
import {getFromAsyncStorage} from '../../helper/Storage';
import {useIsFocused} from '@react-navigation/native';

export default function Home(props) {
  const navigation = props.navigation;
  const [nama, setNama] = useState();
  const [jabatan, setJabatan] = useState();
  const isFocused = useIsFocused();

  useEffect(async () => {
    const userString = await getFromAsyncStorage('user');
    const user = JSON.parse(userString);
    const userNama = user.nama;
    const userJabatan = user.jabatan;

    setNama(userNama);
    setJabatan(userJabatan);
  }, [isFocused]);

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
          backgroundColor: colors.mainBlue,
          height: height,
          display: 'flex',
        }}>
        <View style={styles.sectionTwo}>
          {jabatan === userRoles.TIM_PKG ? (
            <View>
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
                    <View style={styles.iconWrapper}>
                      <MaterialIcons
                        name="people"
                        size={35}
                        color="#AC20DD"
                        style={styles.menuIcon}
                      />
                    </View>
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
                    <View style={styles.iconWrapper}>
                      <MaterialIcons
                        name="extension"
                        size={35}
                        color="#11CBBF"
                        style={styles.menuIcon}
                      />
                    </View>
                    <Text style={[styles.menuText, {color: '#11CBBF'}]}>
                      Daftar Kriteria
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.wrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DaftarNilai')}
                  style={[styles.menu, {backgroundColor: '#FDDCDC'}]}>
                  <View style={styles.menuContent}>
                    <View style={styles.iconWrapper}>
                      <MaterialIcons
                        name="show-chart"
                        size={35}
                        color="#F2475B"
                        style={styles.menuIcon}
                      />
                    </View>
                    <Text style={[styles.menuText, {color: '#F2475B'}]}>
                      Daftar Nilai
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View
            style={{
              borderBottomColor: '#cecece',
              borderBottomWidth: 1,
              width: width * 0.85,
              marginBottom: 25,
            }}
          />

          {/* WP Method */}
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WPMethod')}
              style={[styles.menu, {backgroundColor: '#D9D2FF'}]}>
              <View style={styles.menuContent}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons
                    name="assignment-turned-in"
                    size={35}
                    color="#3330EE"
                    style={styles.menuIcon}
                  />
                </View>
                <Text style={[styles.menuText, {color: '#3330EE'}]}>
                  WP Method
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* AHP Method */}
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AHPMethod')}
              style={[styles.menu, {backgroundColor: '#FFF0D2'}]}>
              <View style={styles.menuContent}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons
                    name="assignment"
                    size={35}
                    color="#EC9615"
                    style={styles.menuIcon}
                  />
                </View>
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
                <View style={styles.iconWrapper}>
                  <MaterialIcons
                    name="person"
                    size={35}
                    color="#E81B7D"
                    style={styles.menuIcon}
                  />
                </View>
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
    backgroundColor: colors.mainBlue,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionOneContentHello: {
    fontSize: 17,
    color: '#F0F2F5',
    fontFamily: 'Quicksand-Medium',
  },
  sectionOneContentName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Quicksand-SemiBold',
  },
  profile: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  sectionTwo: {
    height: height * 0.79,
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
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
  },
  iconWrapper: {
    display: 'flex',
    width: '40%',
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  menuText: {
    alignItems: 'center',
    fontSize: 19,
    // fontWeight: '700',
    fontFamily: 'Quicksand-SemiBold',
  },
});
