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
import LoadingOverlay from '../../components/LoadingOverlay';
import {colors, height, shadow, userRoles, width} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';
import {getFromAsyncStorage} from '../../helper/Storage';

export default function HasilAkhir(props) {
  const navigation = props.navigation;
  const [hasilAkhir, setHasilAkhir] = useState();
  const [jabatan, setJabatan] = useState('-');
  const [isLoading, setIsLoading] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <View key={`${item.id}-${index}`}>
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

  const generateHasilAkhir = async () => {
    setIsLoading(true);
    try {
      const fetchedHasilAkhir = await httpGet('hasil-akhir/generate');
      setHasilAkhir(fetchedHasilAkhir);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const exportFile = () => {
    const data = hasilAkhir.values.map(value => {
      return {...value, user: value.user.nama};
    });

    /* convert JSON back to worksheet */
    const ws = XLSX.utils.json_to_sheet(data);

    /* build new workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${hasilAkhir.method} Method`);

    /* write file */
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    const DDP = DownloadDirectoryPath + '/';
    const file = `${DDP}${hasilAkhir.method}-Method.xlsx`;
    writeFile(file, wbout, 'ascii')
      .then(res => {
        Alert.alert('exportFile success', 'Exported to ' + file);
      })
      .catch(err => {
        Alert.alert('exportFile Error', 'Error ' + err.message);
      });
  };

  useEffect(async () => {
    let jabatan = '';
    const getUserRole = async () => {
      const user = await getFromAsyncStorage('user');
      jabatan = JSON.parse(user).jabatan;
    };
    const fetchData = async () => {
      if (jabatan == userRoles.TIM_PKG) {
        setHasilAkhir({
          values: [],
          method: '-',
          sensitivity: null,
        });
      } else {
        try {
          const fetchedHasilAkhir = await httpGet('hasil-akhir');
          setHasilAkhir(fetchedHasilAkhir);
        } catch (error) {}
      }
    };

    await getUserRole();
    await fetchData();
  }, []);

  useEffect(async () => {
    const user = await getFromAsyncStorage('user');
    const jabatan = JSON.parse(user).jabatan;
    setJabatan(jabatan);
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
          <Text style={styles.sectionOneContentTitle}>Hasil Akhir</Text>
        </View>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: colors.mainBlue,
          display: 'flex',
        }}>
        <View style={styles.wrapper}>
          {jabatan == userRoles.TIM_PKG ? (
            <TouchableOpacity
              onPress={generateHasilAkhir}
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
          {hasilAkhir == null || hasilAkhir?.values == null ? (
            <View style={[styles.loading]}>
              <ActivityIndicator
                animating={true}
                size="large"
                color={colors.mainBlue}
              />
            </View>
          ) : hasilAkhir?.values.length == 0 ? (
            <View style={{alignItems: 'center'}}>
              <Text>No Data Available</Text>
            </View>
          ) : (
            <>
              <View
                style={{display: 'flex', flexDirection: 'row', fontSize: 22}}>
                <Text style={styles.title}>SPK Method :</Text>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    marginTop: 10,
                    paddingStart: 8,
                    fontSize: 17,
                    fontFamily: 'Quicksand-Bold',
                  }}>
                  {hasilAkhir.method}
                </Text>
              </View>
              <View
                style={{display: 'flex', flexDirection: 'row', fontSize: 22}}>
                <Text style={styles.title}>Sensitivity :</Text>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    marginTop: 10,
                    paddingStart: 8,
                    fontSize: 17,
                    fontFamily: 'Quicksand-Bold',
                  }}>
                  {hasilAkhir.sensitivity}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#cecece',
                  borderBottomWidth: 1,
                  width: width * 0.85,
                  marginBottom: 25,
                  marginTop: 25,
                }}
              />
              {hasilAkhir.values.map((item, index) =>
                renderItem({item, index}),
              )}
            </>
          )}
          <View style={{padding: 70}}></View>
        </ScrollView>
      </SafeAreaView>
      {isLoading && <LoadingOverlay />}
    </>
  );
}

const styles = StyleSheet.create({
  sectionOne: {
    backgroundColor: colors.mainBlue,
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
    borderRadius: 30,
    width: 170,
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
    borderBottomWidth: 2,
    color: colors.mainBlue,
    fontFamily: 'Quicksand-SemiBold',
  },
  listItemContentMapel: {
    fontSize: 14,
    color: '#3330EE',
    fontFamily: 'Quicksand-Medium',
  },
  title: {
    fontSize: 17,
    fontFamily: 'Quicksand-Medium',
    marginTop: 10,
  },
});
