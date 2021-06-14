import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { DownloadDirectoryPath, writeFile } from 'react-native-fs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import XLSX from 'xlsx';
import { height, shadow, width } from '../../helper/DEFINED';
import { httpGet } from '../../helper/http';

export default function index(props) {
  const navigation = props.navigation;
  const input = res => res;
  const output = str => str;
  const [WPs, setWPs] = useState();
  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarWP-${item.id}-${index}`}>
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

  const generateWp = async () => {
    try {
      const fetchedWP = await httpGet('wp/generate');
      setWPs(fetchedWP);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedWP = await httpGet('wp');
        setWPs(fetchedWP);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const exportFile = () => {
    const data = WPs.map(w => {
      return {...w, user: w.user.nama};
    });
    /* convert JSON back to worksheet */
    const ws = XLSX.utils.json_to_sheet(data);

    /* build new workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'WP Method');

    /* write file */
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    const DDP = DownloadDirectoryPath + '/';
    const file = DDP + 'WPMethod.xlsx';
    writeFile(file, wbout, 'ascii')
      .then(res => {
        Alert.alert('exportFile success', 'Exported to ' + file);
      })
      .catch(err => {
        Alert.alert('exportFile Error', 'Error ' + err.message);
      });
  };

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
              onPress={generateWp}
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
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              width: width * 0.85,
            }}
          />
          <View style={styles.wrapper}>
            <View style={styles.sectionTwo}>
              {WPs == null ? (
                <View style={[styles.loading]}>
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color="#0000ff"
                  />
                </View>
              ) : WPs.length == 0 ? (
                <View>
                  <Text>No Data Available</Text>
                </View>
              ) : (
                WPs.map((item, index) => renderItem({item, index}))
              )}
            </View>
          </View>
          {/* <View style={styles.wrapper}>
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
          </View> */}
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
