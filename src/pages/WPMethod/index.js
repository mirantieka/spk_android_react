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
import {height, shadow, width} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

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

export default function index(props) {
  const navigation = props.navigation;
  // const keyExtractor = (item, index) => index.toString()
  // const renderItem = ({item}) => {
  //   return (
  //     <View key={`wpMethod-${item.id}-${index}`}>
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate('DetailGuru', {data: item})}>
  //         <View style={styles.listItem}>
  //           <View>
  //             <Text style={styles.listItemContentName}>{item.nama}</Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

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
          <Text style={styles.sectionOneContentTitle}>WP Method</Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#242A61', height: height * 0.75}}>
        <View style={styles.sectionTwo}>
          <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PerankinganWP')}
              style={[
                styles.menu,
                {
                  backgroundColor: '#FFD2F8',
                },
              ]}>
              <View style={styles.menuContent}>
                <Text style={[styles.menuText, {color: '#AC20DD'}]}>
                  Perankingan WP
                </Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DaftarPenilaianWP')}
              style={[styles.menu, {backgroundColor: '#E4E9FF'}]}>
              <View style={styles.menuContent}>
                <Text style={[styles.menuText, {color: '#11CBBF'}]}>
                Daftar Penilaian WP
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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  menu: {
    width: width * 0.85,
    height: 100,
    alignSelf: 'center',
    borderRadius: 30,
    ...shadow,
  },
  menuContent: {
    alignItems: 'center',
    padding: 20,
  },
  menuText: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 17
  },
});
