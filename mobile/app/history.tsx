import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS } from '@/graphql/queries';

export default function HistoryScreen() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  if (data.transactions.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No transactions found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={data.transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>Recipient:</Text>
            <Text>{item.recipients}</Text>

            <Text style={styles.label}>Amount:</Text>
            <Text>
              {item.amounts.toFixed(2)} {item.currency}
            </Text>

            <Text style={styles.label}>Status:</Text>
            <Text>{item.statusT}</Text>

            <Text style={styles.label}>Date:</Text>
            <Text>{new Date(item.createdAtDate).toLocaleString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
