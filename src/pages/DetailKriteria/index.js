import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SectionList,
} from 'react-native';
import {height} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {get, httpGet} from '../../helper/http';

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

export default function DetailKriteria({route, navigation}) {
  const kriAhpId = route.params.id;
  const [detailKriteria, setDetailKriteria] = React.useState([{}]);
  const renderItem = ({item, index}) => {
    return (
      <View key={`daftarGuru-${item.id}-${index}`}>
        <View style={{marginBottom: 1}}>
          <View style={styles.listItem}>
            <Text style={styles.listItemContentValue}>{item.kompetensi}</Text>
            <Text>{item.range_nilai}</Text>
          </View>
        </View>
      </View>
    );
  };

  React.useEffect(async () => {
    const fetchData = async () => {
      try {
        const kriteria = await httpGet(`kri_ahp/${kriAhpId}/detail`);
        setDetailKriteria(kriteria);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedKriteria = await httpGet(`kri_ahp/${kriAhpId}/detail`);
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
          <Text style={styles.sectionOneContentTitle}>Detail Kriteria</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#242A61'}}>
        {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item data={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listItemTitle}>{title}</Text>
        )}
        contentContainerStyle={{
          backgroundColor: 'white',
          ...styles.sectionTwo,
        }}
      /> */}
        <ScrollView style={{backgroundColor: '#242A61', height: height * 0.85}}>
          <View style={styles.sectionTwo}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.listItemTitle}>Kompetensi</Text>
              <Text style={styles.listItemTitle}>Nilai</Text>
            </View>
            {detailKriteria.map((item, index) => renderItem({item, index}))}
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
  profile: {
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
});
