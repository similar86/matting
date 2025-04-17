const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
  }

  type User {
    id: String!
    name: String!
    age: Int!
    interests: [String!]
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    signup: async (_, { name, email, password }) => {
      const user = { id: String(users.length + 1), name, email };
      const token = 'dummy_token';
      return { user, token };
    },
    login: async (_, { email, password }) => {
      const user = users.find(u => u.email === email);
      if (!user) throw new Error('ユーザーが見つかりません');
      const token = 'dummy_token';
      return { user, token };
    },
  },
};

// ダミーデータ
let users = [
  { id: '1', name: '田中太郎', age: 28, interests: ['スポーツ', '読書'] },
  { id: '2', name: '佐藤花子', age: 24, interests: ['音楽', '旅行'] },
];

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  // MongoDBの接続（実際の接続文字列に置き換えてください）
  await mongoose.connect('mongodb://localhost:27017/matching-app', { useNewUrlParser: true, useUnifiedTopology: true });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
