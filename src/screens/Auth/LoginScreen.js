import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(loginSuccess(token));
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    setLoading(true);
    try {
      const res = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      const token = res.data.token;
      await AsyncStorage.setItem('token', token);
      dispatch(loginSuccess(token));
      Alert.alert('Login Successful');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
  
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.link}>
            Don't have an account?{' '}
            <Text
              style={styles.signupText}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e7eaf0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'white',
    padding: 28,
    borderRadius: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f4f4f4',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 18,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
  },
  signupText: {
    color: 'purple',
    fontWeight: 'bold',
  },
});
