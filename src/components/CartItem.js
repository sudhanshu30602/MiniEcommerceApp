import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <View style={{width:'70%'}}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        </View>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.controlsRow}>
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))}>
              <Text style={styles.controlBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))}>
              <Text style={styles.controlBtn}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 10,
    height:150,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    color: 'green',
    fontSize: 20,
    marginTop: 5,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlBtn: {
    fontSize: 30,
    paddingHorizontal: 10,
    color: '#fff',

    backgroundColor:'purple',
    borderRadius:40,
  },
  qty: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  removeText: {
    color: 'red',
    fontSize: 16,
    marginRight: 15,
  },
});
