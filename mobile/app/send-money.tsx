import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { SEND_MONEY } from '@/graphql/mutations';
import { useRouter } from 'expo-router';

export default function SendMoneyScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [senderIdnumber, setSenderIdnumber] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [currency, setCurrency] = useState('ZAR');

  const router = useRouter();

  const [sendMoney, { loading }] = useMutation(SEND_MONEY);

  const onSubmit = async () => {
    try {
      const amt = parseFloat(amount);
      const senderId = parseInt(senderIdnumber);

      if (!recipient || isNaN(amt) || isNaN(senderId)) {
        setErrorMsg('Please enter valid recipient, amount, and sender ID.');
        return;
      }

      const res = await sendMoney({
        variables: {
          senderIdnumber: senderId,
          recipients: recipient,
          amounts: amt,
          currency,
        },
      });

      const tx = res.data.sendMoney;

      setSuccessMsg(`✅ Sent R${tx.amounts} to ${tx.recipients}. Status: ${tx.statusT}`);
      setErrorMsg('');
      setRecipient('');
      setAmount('');
      setSenderIdnumber('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Transaction failed.');
      setSuccessMsg('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Send Money (ZAR)</Text>

      <TextInput
        placeholder="Sender ID Number"
        value={senderIdnumber}
        onChangeText={setSenderIdnumber}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Recipient Email or ID"
        value={recipient}
        onChangeText={setRecipient}
        style={styles.input}
      />

      <TextInput
        placeholder="Amount in Rands"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title={loading ? 'Sending...' : 'Send'} onPress={onSubmit} disabled={loading} />

      {successMsg ? <Text style={styles.success}>{successMsg}</Text> : null}
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <Button title="Back to Home" onPress={() => router.replace('/home')} />
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  success: { color: 'green', marginTop: 12 },
  error: { color: 'red', marginTop: 12 },
});
