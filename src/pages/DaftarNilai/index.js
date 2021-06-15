import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {height} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';

export default function DaftarNilai(props) {
  const navigation = props.navigation;
  const [penilaian, setPenilaian] = React.useState(null);
  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarNilai-${item.id}-${index}`}>
        <View style={styles.listItem}>
          <IonIcons
            name="person-circle"
            size={50}
            color="#C9CACE"
            style={styles.profile}
          />
          <View>
            <Text style={styles.listItemContentName}>{item?.user?.nama}</Text>
            <View style={styles.listItemWrapper}>
              {Object.entries(item.nilai).map(val => (
                <View style={styles.listItemRow}>
                  <Text style={styles.listItemContentMapel}>{val[0]} : </Text>
                  <Text style={styles.listItemContentMapel}>{val[1]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const fetchedNilai = await httpGet('penilaian');
        setPenilaian(fetchedNilai);
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
          <Text style={styles.sectionOneContentTitle}>Daftar Nilai</Text>
        </View>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: '#242A61',
          display: 'flex',
        }}>
        <ScrollView style={styles.sectionTwo}>
          {penilaian == null ? (
            <View style={[styles.loading]}>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#0000ff"
              />
            </View>
          ) : penilaian.length == 0 ? (
            <View style={{ alignItems: 'center'}}>
              <Text>No Data Available</Text>
            </View>
          ) : (
            penilaian.map((item, index) => renderItem({item, index}))
          )}
          <View style={{padding: 40}}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionOne: {
    backgroundColor: '#242A61',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionOneContentTitle: {
    fontSize: 23,
    color: '#F0F2F5',
    fontFamily: 'Quicksand-Bold',
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
    fontFamily: 'Quicksand-SemiBold',
  },
  listItemWrapper: {
    display: 'flex',
  },
  listItemRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  listItemContentMapel: {
    fontSize: 14,
    color: '#3330EE',
    fontFamily: 'Quicksand-Medium',
  },
});
