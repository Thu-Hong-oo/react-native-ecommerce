import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import COLORS from '../components/colors';
import { useState } from 'react';

export default function Screen03() {
  const [data, setData] = useState([
    {
      name: 'Pear',
      img: require('../assets/imgs/pear.png'),
      price: 3,
    },

    {
      name: 'Avocado',
      img: require('../assets/imgs/pear.png'),
      price: 4,
    },
    {
      name: 'Cherry',
      img: require('../assets/imgs/pear.png'),
      price: 10,
    },
    {
      name: 'Orange',
      img: require('../assets/imgs/pear.png'),
      price: 7,
    },
  ]);
  const renderListCol2 = ({ item }) => (
    <View style={{ width: 100, height: 180, margin: 10, flex: 1 }}>
      <View
        style={{
          backgroundColor: COLORS.gray,
          width: '100%',
          height: 120,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={item.img} style={{ width: 120, height: 120 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 8,
          marginHorizontal: 10,
        }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Icon name="add-circle-outline" size={24} color="gray" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5,
          marginHorizontal: 10,
        }}>
        <Rating imageSize={13} />
        <Text style={{ fontWeight: 'bold' }}>${item.price}</Text>
      </View>
    </View>
  );

  const renderListRow = ({ item }) => (
    <View
      style={{
        borderRadius: 5,
        borderColor: COLORS.gray,
        borderWidth: 1,
        marginBottom: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems:"center"
      }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={item.img}
          style={{ width: 50, height: 50, marginHorizontal: 10 }}
        />

        <View>
          <Text style={{ fontWeight: 'bold' , marginBottom:10}}>{item.name}</Text>
          <Rating imageSize={13} />
        </View>
      </View>
      <View style = {{marginRight:10, alignItems:"center"}}>
        <Icon name="add-circle-outline" size={24} color="gray" />
        <Text style={{ fontWeight: 'bold' }}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.itemLeft}>
            <Pressable>
              <Icon name="left" type="antdesign" size={20} color="gray" />
            </Pressable>
            <Text style={styles.alldeals}>All Deals</Text>
          </View>

          <View style={styles.itemRight}>
            <Icon name="cart-outline" type="ionicon" size={20} color="gray" />
            <Image
              source={require('../assets/imgs/avata.png')}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
      </View>
      <View style={styles.viewSearch}>
        <View style={styles.inputSearch}>
          <Icon name="search" size={20} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            style={{ paddingVertical: 3, width: '100%' }}></TextInput>
        </View>
        <Pressable style={styles.buttonList}>
          <Icon name="filter-list" size={20} color="gray" />
        </Pressable>
      </View>
      <View style={{ flex: 10 }}>
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.banner}>
            <Image
              source={require('../assets/imgs/banner.png')}
              style={{ width: null, resizeMode: 'cover' }}
            />
          </View>
          <View style={styles.listCol2}>
            <FlatList data={data} renderItem={renderListCol2} numColumns={2} />
          </View>

          <TouchableOpacity style={styles.btnSeeAll}>
            <Text style={styles.textSeeAll}>See all</Text>
          </TouchableOpacity>

          <View style={styles.listRow}>
            <View style={styles.row}>
              <Text style={{ fontWeight: 'bold' }}>Relavant Products</Text>

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Text style={styles.grayText}>See all</Text>
                <Icon name="right" type="antdesign" size={12} color="gray" />
              </Pressable>
            </View>

            <View style={{ flex: 1 , marginTop:20}}>
              <FlatList data={data} renderItem={renderListRow} />
            </View>
          </View>
        </ScrollView>
      </View>

   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grayText: { color: 'gray' },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'column',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alldeals: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewSearch: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  inputSearch: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    paddingVertical: 5,
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonList: {
    marginLeft: 10,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  body: {
    flex: 1,
    marginTop: 10,
  },
  banner: {
    height: 100,
    width: '100%',
    paddingHorizontal: 15,
  },

  listCol2: {
    marginTop: 40,
    marginHorizontal: 5,
  },
  btnSeeAll: {
    backgroundColor: COLORS.gray,
    paddingVertical: 7,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 25,
  },
  textSeeAll: {
    color: 'gray',
    textAlign: 'center',
  },

  listRow: {
    marginTop: 10,
    marginHorizontal: 15,
  },

});
