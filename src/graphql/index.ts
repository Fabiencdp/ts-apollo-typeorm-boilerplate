import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import { userQuery } from './user/query';
import { userMutation } from './user/mutation';

/**
 * Root Query
 * @type {GraphQLObjectType}
 */
const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...userQuery,
  }),
});


/**
 * Root Mutation
 * @type {GraphQLObjectType}
 */
const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    ...userMutation,
  }),
});


/**
 * Root Subscription
 * @type {GraphQLObjectType}
 */
// const rootSubscription = new GraphQLObjectType({
//   name: 'RootSubscription',
//   fields: () => ({
//     test: { type: GraphQLString },
//     ...jobSubscription,
//   }),
// });

/**
 * Main Schema
 * @type {GraphQLSchema}
 */
const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
  // subscription: rootSubscription,
});

export default schema;
