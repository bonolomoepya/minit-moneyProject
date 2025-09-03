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
    login(emailadd: $emailadd, password: $password) {
      token
    }
  }
`;
