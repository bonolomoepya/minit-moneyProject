import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [emailadd, setEmailadd] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const onSubmit = async () => {
    try {
      const res = await login({ variables: { emailadd, password } });
      if (res.data.login.token) {
        await AsyncStorage.setItem('token', res.data.login.token);
        // Navigate to HomeScreen or whatever your flow is
      }
    } catch (e) {
      // error handled by Apollo error
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', marginTop: 10 },
});
