import React, {useRef} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import CustomBottomSheet from './CustomBottomSheet';
import ProductDetailCard from './ProductDetailCard';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef();

  return (
    <TouchableOpacity style={styles.card} onPress={() => bottomSheetRef.current.open()}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.infoRow}>
        <View style={{width:'60%', height:'150%'}}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.title}
        >
          {product.title}
        </Text>
        </View>
        <View>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        </View>
        <CustomBottomSheet ref={bottomSheetRef}>
        <ProductDetailCard product={product} />
       </CustomBottomSheet>
      </View>

      {/* Optional Add to Cart button */}
      {/* <TouchableOpacity
        style={styles.cartButton}
        onPress={() => dispatch(addToCart(product))}
      >
        <Text style={styles.cartButtonText}>Add to Cart</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    height: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: 550,
    height: '80%',
    resizeMode: 'contain',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#28a745',
    marginRight: 5,
  },
  cartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
