import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, height} from '../../helper/DEFINED';
import {httpGet} from '../../helper/http';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDetailKriteria = await httpGet(
          `kri_ahp/${kriAhpId}/detail`,
        );
        setDetailKriteria(fetchedDetailKriteria);
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
      <View style={{backgroundColor: colors.mainBlue}}>
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
        <ScrollView
          style={{backgroundColor: colors.mainBlue, height: height * 0.85}}>
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
    fontFamily: 'Quicksand-SemiBold',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    padding: 10,
    // backgroundColor: '#F0F2F5',
  },
  listItemContentValue: {
    padding: 3,
    fontSize: 14,
    color: '#3330EE',
    fontFamily: 'Quicksand-Medium',
  },
});
