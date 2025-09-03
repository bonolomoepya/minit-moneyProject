import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/graphql/mutations';

export default function RegisterScreen() {
  const [emailadd, setEmailadd] = useState('');
  const [password, setPassword] = useState('');
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);

  const onSubmit = () => {
    register({ variables: { emailadd, password } });
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
      <Button onPress={onSubmit} title={loading ? 'Registering...' : 'Register'} disabled={loading} />
      {error && <Text style={styles.error}>Error: {error.message}</Text>}
      {data && <Text style={styles.success}>User registered successfully!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', marginTop: 10 },
});
