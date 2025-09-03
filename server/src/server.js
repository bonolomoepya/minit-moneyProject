import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma/index.js"; // your generated path

const prisma = new PrismaClient();
const app = express();
app.use(cors());

const typeDefs = gql`
  type User {
    id: ID!
    emailadd: String!
    createdAtDate: String!
  }

  type Transaction {
    id: ID!
    senderIdnumber: Int!
    recipients: String!
    amounts: Float!
    currency: String!
    statusT: String!
    createdAtDate: String!
  }

  type Query {
    users: [User!]!
    transactions: [Transaction!]!
  }

  type Mutation {
    register(emailadd: String!, password: String!): User!
    login(emailadd: String!, password: String!): String!
    sendMoney(senderIdnumber: Int!, recipients: String!, amounts: Float!, currency: String!): Transaction!
  }
`;

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    transactions: () => prisma.transaction.findMany(),
  },
  Mutation: {
    register: async (_, { emailadd, password }) => {
      return await prisma.user.create({
        data: { emailadd, password },
      });
    },
    login: async (_, { emailadd, password }) => {
      const user = await prisma.user.findUnique({ where: { emailadd } });
      if (!user || user.password !== password) {
        throw new Error("Invalid credentials");
      }
      // Normally return a JWT here, just returning a dummy token
      return "dummy-jwt-token";
    },
    sendMoney: async (_, { senderIdnumber, recipients, amounts, currency }) => {
      return await prisma.transaction.create({
        data: {
          senderIdnumber,
          recipients,
          amounts,
          currency,
          statusT: "COMPLETED",
        },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server running at http://localhost:4000/graphql`)
  );
}

start();
