import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

useEffect(() => {
    const timer = setTimeout(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
  
          if (token) {
            // If token exists, go to Tabs screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tabs' }],
            });
          } else {
            // If no token, go to Login screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        } catch (error) {
          console.error('Error checking login status:', error);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      };
  
      checkLoginStatus();
    }, 2500);
  
    return () => clearTimeout(timer);
  }, []);
  
   

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Image
      source={require('../../assets/shoping.png')}
      style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>ShopEasy</Text>
        <Text style={styles.tagline}>Your one-stop shop for everything!</Text>
      </View>
    </View>
  );
};

export default SplashScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.85)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#4b0082',
      marginBottom: 10,
    },
    tagline: {
      fontSize: 16,
      color: '#555',
    },
  });
  