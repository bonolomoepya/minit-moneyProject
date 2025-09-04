// mobile/App.tsx
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient'; // adjust if needed
import { Slot } from 'expo-router'; // or NavigationContainer, etc.

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Slot /> {/* or your main navigator */}
    </ApolloProvider>
  );
}
