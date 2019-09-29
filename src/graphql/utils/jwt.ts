import { Request } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';

const { JWT_SECRET: secret } = process.env;

function getUserId(context: Request): string {
  const { headers } = context;

  if (!headers) {
    throw new Error('Unauthorized');
  }

  const { authorization, origin } = context.headers;

  // TODO: Find a better way to handle graphqli
  if (origin === `http://localhost:${process.env.PORT}`) {
    console.warn('Graphqli call');
    return '';
  }

  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    try {
      const { userId } = jsonwebtoken.verify(token, secret);
      return userId;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('Unauthorized');
}

export { secret, getUserId };
