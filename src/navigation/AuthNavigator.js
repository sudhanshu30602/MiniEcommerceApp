import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ProductListScreen from '../screens/Home/ProductListScreen';
import CartScreen from '../screens/Cart/CartScreen';
import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
import PaymentSuccessScreen from '../screens/Checkout/PaymentSuccessScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen  name="Signup" component={SignupScreen} />
    <Stack.Screen name="Tabs" component={BottomTabNavigator} />
    <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
