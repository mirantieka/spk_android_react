import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {height, shadow, width} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';

const item = [
  {
    id: 1,
    nama: 'Normalisasi Bobot',
  },
  {
    id: 2,
    nama: 'Vektor S',
  },
  {
    id: 3,
    nama: 'Vektor V',
  },
  {
    id: 4,
    nama: 'Perankingan',
  },
];

export default function AHPMethod(props) {
  const navigation = props.navigation;
  const [AHPs, setAHPs] = useState();
  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarAHP-${item.id}-${index}`}>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.listItemContentName}>{item.user.nama}</Text>
            <Text style={styles.listItemContentMapel}>Nilai: {item.nilai}</Text>
            <Text style={styles.listItemContentMapel}>Rank: {item.rank}</Text>
          </View>
        </View>
      </View>
    );
  };

  const generateAhp = async () => {
    try {
      const fetchedAhp = await httpGet('ahp/generate');
      setAHPs(fetchedAhp);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAhp = await httpGet('ahp');
        setAHPs(fetchedAhp);
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
          <Text style={styles.sectionOneContentTitle}>AHP Method</Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#242A61', height: height * 0.75}}>
        <View style={styles.sectionTwo}>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={generateAhp}
              style={[
                styles.menu,
                {
                  backgroundColor: '#FFD2F8',
                },
              ]}>
              <View style={styles.menuContent}>
                <IonIcons name="settings" size={25} color="#AC20DD" />
                <Text style={[styles.menuText, {color: '#AC20DD'}]}>
                  Hitung
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('DaftarGuru')}
              style={[
                styles.menu,
                {
                  backgroundColor: '#FFD2F8',
                },
              ]}>
              <View style={styles.menuContent}>
                <IonIcons name="download" size={25} color="#AC20DD" />
                <Text style={[styles.menuText, {color: '#AC20DD'}]}>Cetak</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.sectionTwo}>
              {AHPs == null ? (
                <View style={[styles.loading]}>
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color="#0000ff"
                  />
                </View>
              ) : AHPs.length == 0 ? (
                <View>
                  <Text>No Data Available</Text>
                </View>
              ) : (
                AHPs.map((item, index) => renderItem({item, index}))
              )}
            </View>
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
  profile: {
    marginRight: 10,
  },
  sectionTwo: {
    height: height * 0.9,
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
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
    width: width * 0.85,
    // height: 100,
    // alignSelf: 'center',
    // borderRadius: 30,
    ...shadow,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  menu: {
    height: 50,
    borderRadius: 15,
    width: 150,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow,
    // width: width * 0.85,
    // height: 100,
    // alignSelf: 'center',
    // borderRadius: 30,
    // ...shadow,
  },
  menuContent: {
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // alignItems: 'center',
    // padding: 20,
  },
  menuIcon: {
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  menuText: {
    alignItems: 'center',
    fontSize: 19,
    fontWeight: '700',
    marginVertical: 5,
    paddingHorizontal: 10,
    // fontSize: 17,
    // fontWeight: '700',
    // marginTop: 17,
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
