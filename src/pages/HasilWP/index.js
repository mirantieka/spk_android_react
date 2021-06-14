import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SectionList,
} from 'react-native';
import {height, shadowButton} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {get} from '../../helper/http';

const DATA = [
  {
    title: 'Pendagogik',
    data: [
      {
        id: 4213112,
        nama: 'Menguasai karakteristik',
        nilai: '0-4',
      },
    ],
  },
  {
    title: 'Sosial',
    data: [
      {
        id: 1123123,
        nama: 'Menguasai karakteristik',
        nilai: '0-4',
      },
    ],
  },
];

// const Item = ({data}) => (
//   <View style={{marginBottom: 1}}>
//     <View style={styles.listItem}>
//       <Text style={styles.listItemContentValue}>{data.nama}</Text>
//       <Text>{data.nilai}</Text>
//     </View>
//   </View>
// );

export default function index(props) {
  const navigation = props.navigation;
    const [rankingWP, setRankingWP] = React.useState([]);
    const renderItem = ({item, index}) => {
      return (
        <View key={`rankingWP-${item.nama}-${index}`}>
          <View style={{marginBottom: 1}}>
            <View style={styles.listItem}>
              <Text style={styles.listItemContentValue}>{item.nama}</Text>
              <Text>{item.nilai.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      );
    };

    const fetchData = React.useCallback(() => {
      get(`user/guru/ranking`).then(response => {
          console.log('response', response);
        setRankingWP(response.result);
      });
    });

    React.useEffect(() => {
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
          <Text style={styles.sectionOneContentTitle}>Perankingan WP</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#242A61'}}>
        
        <ScrollView style={{backgroundColor: '#242A61', height: height * 0.85}}>
          <View style={styles.sectionTwo}>
          
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.listItemTitle}>Nama</Text>
              <Text style={styles.listItemTitle}>Nilai</Text>
            </View>
            
            {rankingWP.map((item, index) => renderItem({item, index}))}
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
            //   onPress={() => navigation.navigate('Home')}
              style={[styles.buttonTwo, {backgroundColor: '#0AC61D'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: 30,
                  marginTop: 10,
                }}>
                <MaterialIcons
                  name="check"
                  size={25}
                  color="#fff"
                  style={styles.backButton}
                />
                <Text style={styles.buttonTextTwo}>SAVE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            //   onPress={() => navigation.navigate('Home')}
              style={[styles.buttonTwo, {backgroundColor: '#C60A0A'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginStart: 25,
                  marginTop: 10,
                }}>
                <MaterialIcons
                  name="delete-forever"
                  size={25}
                  color="#fff"
                  style={styles.backButton}
                />
                <Text style={[styles.buttonTextTwo, {color: '#fff'}]}>
                  DELETE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </View>
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
    height: height,
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  listItem: {
    height: 50,
    padding: 5,
    backgroundColor: 'white',
    borderColor: '#F0F2F5',
    borderTopWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    marginStart: -5,
    marginEnd: -5,
    color: '#242A61',
    fontSize: 17,
    fontWeight: 'bold',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    padding: 10,
    // backgroundColor: '#F0F2F5',
  },
  listItemContentValue: {
    padding: 3,
    fontSize: 14,
    color: '#3330EE',
    fontWeight: 'normal',
  },
  button: {
    height: 50,
    width: 350,
    backgroundColor: '#FDB242',
    marginBottom: 15,
    borderRadius: 30,
    alignSelf: 'center',
    ...shadowButton,
  },
  buttonText: {
    alignSelf: 'center',
    marginTop: 13,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
  },
  buttonTwo: {
    height: 50,
    width: 160,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 30,
    alignSelf: 'center',
    ...shadowButton,
  },
  buttonTextTwo: {
    alignSelf: 'center',
    // marginTop: 13,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
});
