import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {height, shadow, shadowButton, width} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {get} from '../../helper/http'

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

export default function index(props) {
  const navigation = props.navigation;
  const [kriteria, setKriteria] = React.useState([{}])
  

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
          <Text style={styles.listItemContentAttribute}>Bobot: {item.bobot}</Text>
          </View>
          <TouchableOpacity
          onPress={()=> navigation.navigate('DetailKriteria', {id:item.id})}
            style={styles.button}>
            <Text
              style={styles.buttonText}>
              DETAIL KRITERIA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const fetchData = React.useCallback(()=>{
    get('kri_ahp').then(response=> {
      setKriteria(response);
    });
  });

  React.useEffect(()=> {
    fetchData();
  }, [fetchData]);

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
      <ScrollView style={{backgroundColor: '#242A61'}}>
      <View style={styles.sectionTwo}>
      {kriteria.map((item, index) => renderItem({item, index}))}
     
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
    flex: 1,
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
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  listItemContentAttribute: {
    padding: 3,
    marginStart: 0,
    marginTop: 20,
    fontSize: 14,
    color: 'black',
    fontWeight: 'normal',
    marginBottom: 5,
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
    fontWeight: 'bold',
    fontSize: 15,
    color: '#11CBBF',
  }
});
