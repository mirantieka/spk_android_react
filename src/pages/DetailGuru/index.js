import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {height, shadow, width} from '../../helper/DEFINED';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {httpGet} from '../../helper/http';
import {useEffect} from 'react/cjs/react.development';
import kemendikbud from '../../assets/images/kemendikbud.png';

export default function DetailGuru(props) {
  const navigation = props.navigation;
  const [user, setUser] = React.useState(navigation.state.params.data || {});
  const renderItem = ({item, index}) => {
    return (
      <View key={`detailGuru-${item.id}-${index}`}>
        <View style={styles.listItem}>
          <View>
            <Text style={styles.listItemContentAttribute}>{item.attribut}</Text>
            <Text style={styles.listItemContentValue}>{item.nama}</Text>
          </View>
        </View>
      </View>
    );
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
          <Text style={styles.sectionOneContentTitle}>Detail Guru</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#242A61'}}>
        <Image
          style={styles.profilePhoto}
          source={require('../../assets/images/kemendikbud.png')}
        />
      </View>
      <ScrollView style={{backgroundColor: '#242A61', height: height * 0.5}}>
        <View style={styles.sectionTwo}>
          <View>
            <Text style={styles.listItemContentName}>{user.nama}</Text>
            <View>
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>NIP</Text>
                  <Text style={styles.listItemContentValue}>{user.nip}</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>
                    Jenis Kelamin
                  </Text>
                  <Text style={styles.listItemContentValue}>
                    {user.jenis_kelamin}
                  </Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View>
                  <Text style={styles.listItemContentAttribute}>Jurusan</Text>
                  <Text style={styles.listItemContentValue}>
                    {user.jurusan}
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
  profilePhoto: {
    width: 220,
    height: 200,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionTwo: {
    height: height * 0.5,
    padding: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  listItem: {
    height: 80,
    backgroundColor: 'white',
    borderColor: '#E1D7D7',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContentName: {
    fontSize: 20,
    color: '#242A61',
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center',
  },
  listItemContentAttribute: {
    fontSize: 17,
    color: '#242A61',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listItemContentValue: {
    fontSize: 14,
    color: '#3330EE',
    fontWeight: 'normal',
  },
});
