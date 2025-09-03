import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker } from 'react-native';
// Use mutation or axios depending on your API setup

export default function SendMoneyScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const onSubmit = () => {
    // validate and call API or mutation
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Recipient"
        value={recipient}
        onChangeText={setRecipient}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Picker selectedValue={currency} onValueChange={setCurrency} style={styles.picker}>
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        {/* Add more currencies */}
      </Picker>
      <Button title="Send Money" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingHorizontal: 8 },
  picker: { height: 50, marginBottom: 12 },
});
