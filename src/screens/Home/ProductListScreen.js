import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  getCategories,
  filterByCategory,
  searchProducts,
} from '../../redux/slices/productSlice';
import ProductCard from '../../components/ProductCard';
import Icon from 'react-native-vector-icons/Feather'; 
import AnIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { filteredItems, categories, loading } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    dispatch(searchProducts(text));
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    dispatch(filterByCategory(category));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getProducts());
    dispatch(getCategories());
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); 
      console.log('Logged out and AsyncStorage cleared!');
      setModal(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
      <View style={styles.searchContainer}>
  <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
  <TextInput
    placeholder="Search products..."
    value={search}
    onChangeText={handleSearch}
    style={styles.searchInput}
    placeholderTextColor="#888"
  />
</View>
<View>
    <TouchableOpacity onPress={() => setModal(!modal)}>
      <Icon name="settings" size={24} color="#888" style={styles.settingsIcon} />
    </TouchableOpacity>

    {/* Dropdown Menu */}
    {modal && (
      <View style={styles.dropdownMenu}>
        <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
          <Text style={styles.dropdownText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal(false)} style={styles.dropdownItem}>
          <Text style={styles.dropdownText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
</View>

      {/* Category Chips */}
      <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['all', ...categories]}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory;
          return (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                isSelected && styles.selectedCategoryChip,
              ]}
              onPress={() => handleCategoryPress(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
     </View>
      {/* Product Cards or Loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 30 }} />
      ) : filteredItems.length === 0 ? (
        <View style={styles.noResult}>
          <Text style={styles.noResultText}>😕 No products found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard product={item} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },
  searchContainer: {
    marginTop:15,
    width:'90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryChip: {
    backgroundColor: '#E1E1E1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  selectedCategoryChip: {
    backgroundColor: 'purple',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  noResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noResultText: {
    fontSize: 16,
    color: '#888',
  },
  dropdownMenu: {
    position: 'absolute',
    width:130,
    top: 35, // Adjust depending on icon size
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },

});
