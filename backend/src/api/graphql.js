import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import { registerUser, getUsers } from '../modules/accounts/service.js';
import { provisionWallet, getWallet } from '../modules/wallets/service.js';
import { orchestrateDeposit, getTransactions } from '../modules/transactions/service.js';

export const typeDefs = gql`
  scalar JSON

  type User {
    id: ID!
    email: String!
    name: String!
    status: String!
    created_at: String!
  }

  type Wallet {
    id: ID!
    user_id: ID!
    network: String!
    balance: Float!
    created_at: String!
  }

  type Transaction {
    id: ID!
    wallet_id: ID!
    amount: Float!
    status: String!
    metadata: JSON
    created_at: String!
  }

  type SettlementResult {
    transaction: Transaction!
    wallet: Wallet!
    settlementId: ID!
  }

  type Query {
    users: [User!]!
    wallet(id: ID!): Wallet
    transactions(walletId: ID!): [Transaction!]!
  }

  type Mutation {
    registerUser(email: String!, name: String!): User!
    provisionWallet(userId: ID!, network: String!): Wallet!
    deposit(walletId: ID!, amount: Float!, metadata: JSON): SettlementResult!
  }
`;

const parseJSONLiteral = (ast) => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });
      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    case Kind.NULL:
      return null;
    default:
      return null;
  }
};

export const resolvers = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'Arbitrary JSON value',
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: parseJSONLiteral,
  }),
  Query: {
    users: () => getUsers(),
    wallet: (_parent, args) => getWallet(args.id),
    transactions: (_parent, args) => getTransactions({ walletId: args.walletId }),
  },
  Mutation: {
    registerUser: (_parent, args) => registerUser(args),
    provisionWallet: (_parent, args) => provisionWallet(args),
    deposit: (_parent, args) => orchestrateDeposit(args),
  },
};
