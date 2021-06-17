import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SectionList,
} from 'react-native';
import {colors, height} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {get} from '../../helper/http';

const DATA = [
  {
    title: {
      nama: 'Nur Ismi Fahmia',
      totalNilai: '99',
    },
    data: [
      {
        id: 1,
        kriteria: 'Umum',
        nilai: '99',
      },
      {
        id: 2,
        kriteria: 'Teman Sejawat',
        nilai: '99',
      },
      {
        id: 3,
        kriteria: 'Orangtua',
        nilai: '99',
      },
      {
        id: 4,
        kriteria: 'Peserta Didik',
        nilai: '99',
      },
      {
        id: 5,
        kriteria: 'Dunia Industri',
        nilai: '99',
      },
    ],
  },
  {
    title: {
      nama: 'Miranti Eka',
      totalNilai: '99',
    },

    data: [
      {
        id: 1,
        kriteria: 'Umum',
        nilai: '99',
      },
      {
        id: 2,
        kriteria: 'Teman Sejawat',
        nilai: '99',
      },
      {
        id: 3,
        kriteria: 'Orangtua',
        nilai: '99',
      },
      {
        id: 4,
        kriteria: 'Peserta Didik',
        nilai: '99',
      },
      {
        id: 5,
        kriteria: 'Dunia Industri',
        nilai: '99',
      },
    ],
  },
];

// const Item = ({data}) => (
//   <View style={{marginBottom: 1}}>
//     <View style={styles.listItem}>
//       <Text style={styles.listItemContentValue}>{data.kriteria}</Text>
//       <Text style={[styles.listItemContentValue, {fontWeight: 'bold'}]}>
//         {data.nilai}
//       </Text>
//     </View>
//   </View>
// );

export default function index(props) {
  const navigation = props.navigation;
  const userId = navigation.state.params.data.id;
  const [daftarNilai, setDaftarNilai] = React.useState([]);
  const renderItem = ({item, index}) => {
      console.log("asdadsa", item);
    return (
      <View key={`daftarNilai-${item.id}-${index}`}>
        <View style={{marginBottom: 1}}>
          <View style={styles.listItem}>
            <Text style={styles.listItemContentValue}>{item.kriteria_ahp.nama}</Text>
            <Text>{item.nilai}</Text>
          </View>
        </View>
      </View>
    );
  };

  const fetchData = React.useCallback(() => {
    get(`penilaian/${userId}/nilai`).then(response => {
      setDaftarNilai(response);
    });
  });

  React.useEffect(() => {
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
          <Text style={styles.sectionOneContentTitle}>Detail Nilai</Text>
        </View>
      </View>
      {/* <View style={{backgroundColor: colors.mainBlue}}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item data={item} />}
        renderSectionHeader={({section: {title}}) => (
          <View style={{flexDirection: 'row',
          justifyContent: 'space-between',}}>
          <Text style={styles.listItemTitle}>{title.nama}</Text>
          <Text style={styles.listItemTitle}>{title.totalNilai}</Text>
          </View>
        )}
        contentContainerStyle={{
          backgroundColor: 'white',
          ...styles.sectionTwo,
        }}
      />
      </View> */}
      <ScrollView style={{backgroundColor: colors.mainBlue, height: height * 0.85}}>
        <View style={styles.sectionTwo}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.listItemTitle}>Kriteria</Text>
            <Text style={styles.listItemTitle}>Nilai</Text>
          </View>
          {daftarNilai.length > 0 && daftarNilai.map((item, index) => renderItem({item, index}))}
        </View>
      </ScrollView>
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
    color: colors.mainBlue,
    fontSize: 17,
    fontWeight: 'bold',
    padding: 10,
  },
  listItemContentValue: {
    padding: 3,
    fontSize: 14,
    color: '#3330EE',
    fontWeight: 'normal',
  },
});
