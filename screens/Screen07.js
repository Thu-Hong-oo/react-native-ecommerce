import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import COLORS from '../components/colors';
export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="left" type="antdesign" size={20} color="gray" />
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />{' '}
        {/* Để khoảng trống giống như trong giao diện gốc */}
      </View>

      {/* Cart Items */}
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.cartItems}>
          {[
            {
              id: 1,
              name: 'Headphone',
              price: '$500',
              quantity: 'x1',
              image: require('../assets/imgs/headphone.png'),
            },
            {
              id: 2,
              name: 'Headphone',
              price: '$300',
              quantity: 'x1',
              image: require('../assets/imgs/headphone2.png'),
            },
            {
              id: 3,
              name: 'Smartphone',
              price: '$1000',
              quantity: 'x1',
              image: require('../assets/imgs/mobileHeader.png'),
            },
            {
              id: 4,
              name: 'Smartphone',
              price: '$1000',
              quantity: 'x1',
              image: require('../assets/imgs/mobileHeader.png'),
            },
          ].map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>Consequat ex eu</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <View style={styles.itemPriceContainer}>
                <Icon name="edit" size={20} color="gray" />
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Voucher and Total */}
        <Text style={styles.voucherLabel}>Voucher</Text>
        <View style={styles.voucherContainer}>
          <TextInput
            placeholder="Enter voucher code"
            placeholderTextColor="gray"
            style={styles.voucherInput}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>$2,800</Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
          <FontAwesome name="arrow-right" size={15} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  cartItems: {
    marginTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemDescription: {
    color: '#555',
  },
  itemPriceContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemQuantity: {
    color: '#555',
  },
  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voucherLabel: {
    marginTop: 15,
    fontWeight: '600',
  },
  voucherInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  applyButton: {
    marginLeft: 10,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.orange,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});
