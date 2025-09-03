import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Minit Money!</Text>
      <Button title="Send Money" onPress={() => navigation.navigate('SendMoney')} />
      <Button title="History" onPress={() => navigation.navigate('History')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, alignItems: 'center' },
});
