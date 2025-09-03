import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client'; // Adjust path as needed
import { ExpoRoot } from 'expo-router'; // or your root navigator

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ExpoRoot /> {/* or your root navigator/component */}
    </ApolloProvider>
  );
}
