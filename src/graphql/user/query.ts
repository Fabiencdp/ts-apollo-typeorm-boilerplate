import { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

import { User } from '../../entity/User';
import { userType } from './type';

import { extractFields } from '../utils';
import { getUserId } from '../utils/jwt';

const userQuery = {
  users: {
    type: new GraphQLList(userType),
    resolve(parent, args, context, info) {
      const select = extractFields(info);
      return User.find({ select });
    },
  },

  user: {
    type: userType,
    args: {
      id: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args, context, info) {
      const { id } = args;
      const select = extractFields(info);
      return User.findOneOrFail({ id }, { select });
    },
  },

  userByToken: {
    type: userType,
    args: {
      token: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args, context, info) {
      const id = getUserId(context);
      const select = extractFields(info);
      return User.findOneOrFail({ id }, { select });
    },
  },
};

export { userQuery };
