import {
  GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString,
} from 'graphql';

import { User } from '../../entity/User';
import { extractFields } from '../utils';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});


export { userType };
