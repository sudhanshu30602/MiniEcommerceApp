// components/ProductDetailCard.js
import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch , useSelector} from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/slices/cartSlice';



const ProductDetailCard = ({ product }) => {
    const navigation = useNavigation();
    const { cartItems, total } = useSelector(state => state.cart);
 
    const [isInCart, setIsInCart] = useState(false);
    useEffect(() => {
        if (product && cartItems) {
          const found = cartItems.some(item => item.id === product.id);
          setIsInCart(found);
        }
      }, [cartItems, product]);
    const dispatch = useDispatch();
  if (!product) return null;

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>
        ${product.price}
        {product.discount > 0 && (
          <Text style={styles.discount}>  -{product.discount}% OFF</Text>
        )}
      </Text>

      <Text style={styles.label}>Brand:</Text>
      <Text style={styles.value}>{product.brand}</Text>

      <Text style={styles.label}>Model:</Text>
      <Text style={styles.value}>{product.model}</Text>

      <Text style={styles.label}>Color:</Text>
      <Text style={styles.value}>{product.color}</Text>

      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{product.category}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        { isInCart === false ? (
        <TouchableOpacity style={styles.addToCartBtn}   onPress={() => dispatch(addToCart(product))}>
          <Text style={styles.AddButton}>Add to Cart</Text>
        </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.addInCart}   onPress={() => dispatch(addToCart(product))}>
          <Text style={styles.btnText}>Added in cart</Text>
        </TouchableOpacity>
        )
        }
        <TouchableOpacity style={styles.buyNowBtn}  onPress={() => navigation.navigate('CheckoutScreen')}>
          <Text style={styles.btnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  productImage: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
  },
  discount: {
    fontSize: 16,
    color: '#d32f2f',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize:17,
    color: 'black',
  },
  value: {
    marginBottom: 6,
    fontSize:16,
    color: 'black',
  },
  description: {
    marginTop: 8,
    color: 'black',
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  addToCartBtn: {
    //backgroundColor: '#1',
    borderColor:'purple',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  addInCart:{
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    backgroundColor:'lightgreen',
  },
  buyNowBtn: {
    backgroundColor: 'purple',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  AddButton: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
