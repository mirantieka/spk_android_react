import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {height, shadowButton} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';

const data = [
  {
    id: 1,
    name: 'Umum',
    attribut: 'Benefit',
    bobot: '0.7',
  },
  {
    id: 2,
    name: 'Umum',
    attribut: 'Benefit',
    bobot: '0.7',
  },
];

export default function DaftarKriteria(props) {
  const navigation = props.navigation;
  const [kriteria, setKriteria] = useState(null);

  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarKriteria-${item.id}-${index}`}>
        <View
          style={{
            marginVertical: 10,
            borderWidth: 2,
            borderRadius: 30,
            borderColor: '#F0F2F5',
          }}>
          <View style={styles.listItemTitle}>
            <Text style={styles.listItemContentName}>{item.nama}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.listItemContentAttribute}>
              Attribut: {item.tipe}
            </Text>
            <Text style={styles.listItemContentAttribute}>
              Bobot: {item.bobot}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailKriteria', {id: item.id})}
            style={styles.button}>
            <Text style={styles.buttonText}>DETAIL KRITERIA</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // const fetchData = React.useCallback(() => {
  //   setIsLoading(true);
  //   get('kri_ahp').then(response => {
  //     setKriteria(response);
  //     setIsLoading(false);
  //   });
  // });

  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedKriteria = await httpGet('kri_ahp');
        setKriteria(fetchedKriteria);
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
          <Text style={styles.sectionOneContentTitle}>Daftar Kriteria</Text>
        </View>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: '#242A61',
          display: 'flex',
        }}>
        <ScrollView style={styles.sectionTwo}>
          {kriteria == null ? (
            <View style={[styles.loading]}>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#0000ff"
              />
            </View>
          ) : kriteria.length == 0 ? (
            <View style={{ alignItems: 'center'}}>
              <Text>No Data Available</Text>
            </View>
          ) : (
            kriteria.map((item, index) => renderItem({item, index}))
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontFamily: 'Quicksand-Bold'
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
  },
  listItemTitle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 1,
    borderColor: '#F0F2F5',
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: '#11CBBF',
  },
  listItemContentName: {
    padding: 3,
    marginStart: 0,
    alignSelf: 'center',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Quicksand-Bold'
  },
  listItemContentAttribute: {
    padding: 3,
    marginStart: 0,
    marginTop: 20,
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Quicksand-Medium'
  },
  listItemContentValue: {
    padding: 3,
    marginStart: 10,
    fontSize: 14,
    color: '#3330EE',
    fontWeight: 'normal',
  },
  buttonDetail: {
    padding: 20,
    borderRadius: 30,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: '#DCE9E3',
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 30,
    alignSelf: 'center',
    ...shadowButton,
  },
  buttonText: {
    alignSelf: 'center',
    marginTop: 13,
    fontSize: 15,
    color: '#11CBBF',
    fontFamily: 'Quicksand-Medium'
  },
});
