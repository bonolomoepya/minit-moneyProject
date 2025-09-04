import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register($emailadd: String!, $password: String!) {
    register(emailadd: $emailadd, password: $password) {
      id
      emailadd
    }
  }
`;



export const LOGIN_USER = gql`
  mutation Login($emailadd: String!, $password: String!) {
    login(emailadd: $emailadd, password: $password)
  }
`;


export const SEND_MONEY = gql`
  mutation SendMoney(
    $senderIdnumber: Int!
    $recipients: String!
    $amounts: Float!
    $currency: String!
  ) {
    sendMoney(
      senderIdnumber: $senderIdnumber
      recipients: $recipients
      amounts: $amounts
      currency: $currency
    ) {
      id
      recipients
      amounts
      currency
      statusT
      createdAtDate
    }
  }
`;

