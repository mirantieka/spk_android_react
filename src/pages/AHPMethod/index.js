import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DownloadDirectoryPath, writeFile} from 'react-native-fs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import XLSX from 'xlsx';
import {height, shadow, width} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';

export default function AHPMethod(props) {
  const navigation = props.navigation;
  const [AHPs, setAHPs] = useState();
  const [jabatan, setJabatan] = useState('-');
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

  const exportFile = () => {
    const data = AHPs.map(ahp => {
      return {...ahp, user: ahp.user.nama};
    });
    /* convert JSON back to worksheet */
    const ws = XLSX.utils.json_to_sheet(data);

    /* build new workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AHP Method');

    /* write file */
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    const DDP = DownloadDirectoryPath + '/';
    const file = DDP + 'AHPMethod.xlsx';
    writeFile(file, wbout, 'ascii')
      .then(res => {
        Alert.alert('exportFile success', 'Exported to ' + file);
      })
      .catch(err => {
        Alert.alert('exportFile Error', 'Error ' + err.message);
      });
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

  useEffect(async () => {
    const user = await getFromAsyncStorage('user');
    const jabatan = JSON.parse(user).jabatan;
    setJabatan(jabatan);
  }, []);
  
  console.log('jataban dari wp', jabatan);

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
      <SafeAreaView
        style={{
          backgroundColor: '#242A61',
          display: 'flex',
        }}>
        <View style={styles.wrapper}>
          {jabatan === 'Tim PKG' ? (
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
          ) : (
            <TouchableOpacity
              onPress={exportFile}
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
          )}
        </View>
        <ScrollView style={styles.sectionTwo}>
          {AHPs == null ? (
            <View style={[styles.loading]}>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#0000ff"
              />
            </View>
          ) : AHPs.length == 0 ? (
            <View style={{alignItems: 'center'}}>
              <Text>No Data Available</Text>
            </View>
          ) : (
            AHPs.sort((a, b) => a.rank - b.rank).map((item, index) => renderItem({item, index}))
          )}
          <View style={{padding: 70}}></View>
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
    color: '#F0F2F5',
    fontFamily: 'Quicksand-Bold',
  },
  backButton: {
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
    width: width * 0.82,
    alignSelf: 'center',
    ...shadow,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Quicksand-Bold',
    // fontSize: 17,
    // fontWeight: '700',
    // marginTop: 17,
  },
  listItemContentName: {
    fontSize: 17,
    color: '#242A61',
    fontFamily: 'Quicksand-SemiBold',
  },
  listItemContentMapel: {
    fontSize: 14,
    color: '#3330EE',
    fontFamily: 'Quicksand-Medium',
  },
});
