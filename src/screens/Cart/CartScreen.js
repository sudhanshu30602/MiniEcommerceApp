import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from '../../components/CartItem';

const CartScreen = ({ navigation }) => {
  const { cartItems, total } = useSelector(state => state.cart);

  const renderCartItem = ({ item }) => <CartItem item={item} />;

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={{alignItems:'center', justifyContent:'center', height:'100%'}}>
           <Image
          source={require('../../assets/carts.jpg')}
           style={styles.emptyImage}
           resizeMode="contain"
         />
        <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ₹{total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('CheckoutScreen')}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  list: {
    paddingBottom: 100,
  },
  emptyImage: {
    width: '120%',
    height: '40%',
    marginBottom: 20,
   // optional: match your theme
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'purple',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
