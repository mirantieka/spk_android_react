import React, {useState, useEffect} from 'react';
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
import {height} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';

export default function DaftarNilai(props) {
  const navigation = props.navigation;
  const [penilaian, setPenilaian] = React.useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarNilai-${item.id}-${index}`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailNilai', {data: item})}>
          <View style={styles.listItem}>
            <IonIcons
              name="person-circle"
              size={50}
              color="#C9CACE"
              style={styles.profile}
            />
            <View>
              <Text style={styles.listItemContentName}>{item.id}</Text>
              {/* <View style={[styles.loading]}>
                <ActivityIndicator
                  animating={isLoading}
                  size="large"
                  color="#0000ff"
                />
              </View> */}
              <Text style={styles.listItemContentMapel}>
                {item.nilai || item.jabatan}
              </Text>
              {/* {Object.values(penilaian.nilai).map} */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const fetchData = React.useCallback(() => {
  //   get('users').then(response => {
  //     console.log('response', response);
  //     setUsers(response);
  //   });
  // });

  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNilai = await httpGet('penilaian');
        setPenilaian(fetchedNilai);
        console.log(fetchedNilai);
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
      <ScrollView style={{backgroundColor: '#242A61', height: height * 0.85}}>
        <View style={styles.sectionTwo}>
          {penilaian.map((item, index) => renderItem({item, index}))}
        </View>
      </ScrollView>
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
