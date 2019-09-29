import * as jsonwebtoken from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { User } from '../../entity/User';
import { userType } from './type';

import { secret } from '../utils/jwt';

const userSignUpInput = new GraphQLInputObjectType({
  name: 'UserSignUpInput',
  fields: () => ({
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const userSignInInput = new GraphQLInputObjectType({
  name: 'UserSignInInput',
  fields: () => ({
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});


const userMutation = {
  signIn: {
    type: userType,
    args: {
      input: { type: userSignInInput },
    },
    async resolve(parent, { input }) {
      const { email, password } = input;

      const user = await User.findOneOrFail({ email });
      if (!user) {
        throw new Error('No such user found');
      }

      const valid = await bcryptjs.compare(password, user.password);

      if (!valid) {
        throw new Error('Invalid password');
      }

      user.token = jsonwebtoken.sign({ userId: user.id }, secret);

      return user;
    },
  },

  signUp: {
    type: userType,
    args: {
      input: { type: userSignUpInput },
    },
    async resolve(parent, { input }) {
      // Hash password
      input.password = await bcryptjs.hash(input.password, 10);

      const user = User.create(input);
      const created = await user.save();

      // Create token
      created.token = jsonwebtoken.sign({ userId: created.id }, secret);

      return created;
    },
  },
};

export { userMutation };
