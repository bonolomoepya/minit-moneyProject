import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_TRANSACTIONS } from '@/graphql/queries';

export default function HistoryScreen() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  if (data.transactions.length === 0) return <Text>No transactions found.</Text>;

  return (
    <FlatList
      data={data.transactions}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>Recipient: {item.recipients}</Text>
          <Text>Amount: {item.amounts} {item.currency}</Text>
          <Text>Status: {item.statusT}</Text>
          <Text>Date: {item.createdAtDate}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 12, borderBottomColor: '#ccc', borderBottomWidth: 1 },
});
