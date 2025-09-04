import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // router

export default function LoginScreen() {
  const router = useRouter(); // Create router instance

  const [emailadd, setEmailadd] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const onSubmit = async () => {
    try {
      const res = await login({ variables: { emailadd, password } });


          if (res.data?.login) {
      await AsyncStorage.setItem('token', res.data.login);
      router.replace('/home'); // do the triggge
    }
    } catch (e) {

    }
  };



  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={emailadd}
        onChangeText={setEmailadd}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button onPress={onSubmit} title={loading ? 'Logging in...' : 'Login'} disabled={loading} />

      {error && <Text style={styles.error}>Error: {error.message}</Text>}
      {data && <Text style={styles.success}>Login successful!</Text>}

      {/*nav link */}
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', marginTop: 10 },
  registerLink: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
