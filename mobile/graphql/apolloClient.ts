import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // ORR your IP
  cache: new InMemoryCache(),
});

export default client;
