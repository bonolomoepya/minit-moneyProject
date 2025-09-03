import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      recipients
      amounts
      currency
      statusT
      createdAtDate
    }
  }
`;
