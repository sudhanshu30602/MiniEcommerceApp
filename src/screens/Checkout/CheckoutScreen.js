import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../../redux/slices/cartSlice';

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { cartItems, total } = useSelector(state => state.cart);

  const handlePlaceOrder = () => {
    setTimeout(() => {
      dispatch(clearCart());
      navigation.replace('PaymentSuccess');
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.qty}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>₹{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.orderBtn} onPress={handlePlaceOrder}>
        <Text style={styles.orderText}>Place Order (Payment)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  qty: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'green',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  orderBtn: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  orderText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
