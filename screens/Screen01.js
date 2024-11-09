import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default function Screen01() {
  const generateColor = () => {
    const CHHAPOLA = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${CHHAPOLA}`;
  };
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

      <View style={styles.body}>
        <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
          <View style={styles.searchAndFilter}>
            <View style={styles.search}>
              <Icon style={styles.iconSize} name="search" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for product"
                placeholderTextColor="#BCC1CA"
              />
            </View>
            <View style={styles.filter}>
              <Icon style={styles.iconSize} name="filter-list" />
            </View>
          </View>

          <View style={styles.categories}>
            <Pressable style={styles.category}>
              <View
                style={[
                  styles.imageCategory,
                  { backgroundColor: generateColor() },
                ]}>
                <Image source={require('../assets/imgs/beauty.png')} />
              </View>
              <Text style={styles.textCategory}> Electronics</Text>
            </Pressable>

            <Pressable style={styles.category}>
              <View
                style={[
                  styles.imageCategory,
                  { backgroundColor: generateColor() },
                ]}>
                <Image source={require('../assets/imgs/beauty.png')} />
              </View>
              <Text style={styles.textCategory}> Electronics</Text>
            </Pressable>

            <Pressable style={styles.category}>
              <View
                style={[
                  styles.imageCategory,
                  { backgroundColor: generateColor() },
                ]}>
                <Image source={require('../assets/imgs/beauty.png')} />
              </View>
              <Text style={styles.textCategory}> Electronics</Text>
            </Pressable>
          </View>

          <View style={styles.banner}>
            <View style={styles.leftBanner}>
              <Text style={styles.text1Banner}>Shoes</Text>
              <Text style={styles.text2Banner}>50% off</Text>

              <Pressable style={styles.buttonBanner}>
                <Text style={styles.textButtonBanner}>Buy now</Text>
              </Pressable>
            </View>

            <Image source={require('../assets/imgs/bannerHome.png')} />
          </View>

          <View style={styles.topProduct}>
            <Pressable style={styles.eachTopProduct}>
              <ImageBackground
                style={styles.imageEachTopProduct}
                source={require('../assets/imgs/sale.png')}>
                <Text style={styles.textDiscountEachtopProduct}>30%</Text>
              </ImageBackground>
            </Pressable>

            <Pressable style={styles.eachTopProduct}>
              <ImageBackground
                style={styles.imageEachTopProduct}
                source={require('../assets/imgs/sale.png')}>
                <Text style={styles.textDiscountEachtopProduct}>30%</Text>
              </ImageBackground>
            </Pressable>
          </View>

          <View style={styles.recommend}>
            <Text style={styles.text1Recommned}>Recommended for you</Text>
            <Text style={styles.text2Recommend}>View all</Text>
          </View>

          <View style={styles.recommend}>
            <View style={styles.recommendProduct}>
              <Image source={require('../assets/imgs/shoesRcm.png')} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View>
                  <Text style={styles.textName}>Shoes</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="star" size={20} color="#F3C63F" />
                    <Text style={styles.textRating}>&nbsp; 4.5</Text>
                  </View>
                </View>

                <Text style={styles.textPrice}>299$</Text>
              </View>
            </View>
            <View style={styles.recommendProduct}>
              <Image source={require('../assets/imgs/shoesRcm.png')} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View>
                  <Text style={styles.textName}>Shoes</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="star" size={20} color="#F3C63F" />
                    <Text style={styles.textRating}>&nbsp; 4.5</Text>
                  </View>
                </View>

                <Text style={styles.textPrice}>299$</Text>
              </View>
            </View>

            <View style={styles.recommendProduct}>
              <Image source={require('../assets/imgs/shoesRcm.png')} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View>
                  <Text style={styles.textName}>Shoes</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="star" size={20} color="#F3C63F" />
                    <Text style={styles.textRating}>&nbsp; 4.5</Text>
                  </View>
                </View>

                <Text style={styles.textPrice}>299$</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  alldeals: { paddingHorizontal: 10, fontSize: 16, fontWeight: 'bold' },

  body: { flex: 10 },

  iconSize: {
    width: 25,
    height: 25,
  },
  searchAndFilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  search: {
    flex: 8,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingVertical: 10,
  },
  searchInput: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
  filter: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  categories: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  category: {
    alignItems: 'center',
  },
  textCategory: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageCategory: {
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    height: 85,
    resizeMode: 'cover',
    marginHorizontal: 8,
  },
  banner: {
    backgroundColor: '#F3FCF0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  leftBanner: {
    paddingHorizontal: 20,
  },
  text1Banner: {
    color: '#FF6026',
    fontSize: 36,
  },
  text2Banner: {
    fontSize: 26,
  },
  buttonBanner: {
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 8,
  },
  textButtonBanner: {
    color: 'white',
  },
  recommend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text1Recommned: {
    fontSize: 23,
  },
  text2Recommend: {
    fontSize: 17,
    color: 'darkgrey',
  },
  recommendProduct: {
    height: 200,
    width: 130,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    alignItems: 'center',
    paddingTop: 20,
    marginHorizontal: 6,
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textPrice: {
    fontSize: 18,
    color: '#FF6026',
    marginTop: 35,
  },

  
  container: {
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
    flex: 1,
  },
  topProduct: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'pink',
  },
  eachTopProduct: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageEachTopProduct: {
    width: null,
    height: 150,
    resizeMode: 'cover',
  },
  textDiscountEachtopProduct: {
    marginTop: 10,
    marginLeft: 2,
    backgroundColor: '#EB235F',
    paddingVertical: 10,
    justifyContent: 'space-between',
    height: 30,
    width: 50,
    color: 'white',
    textAlign: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
