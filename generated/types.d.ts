export type Maybe<T> = T | null;

export interface UserSignInInput {
  email: string;

  password: string;
}

export interface UserSignUpInput {
  email: string;

  password: string;
}

// ====================================================
// Types
// ====================================================

export interface RootQueryType {
  users?: Maybe<(Maybe<User>)[]>;

  user?: Maybe<User>;

  userByToken?: Maybe<User>;
}

export interface User {
  id?: Maybe<string>;

  email?: Maybe<string>;

  password?: Maybe<string>;

  token?: Maybe<string>;

  createdAt?: Maybe<string>;

  updatedAt?: Maybe<string>;
}

export interface RootMutation {
  signIn?: Maybe<User>;

  signUp?: Maybe<User>;
}

// ====================================================
// Arguments
// ====================================================

export interface UserRootQueryTypeArgs {
  id: string;
}
export interface UserByTokenRootQueryTypeArgs {
  token: string;
}
export interface SignInRootMutationArgs {
  input?: Maybe<UserSignInInput>;
}
export interface SignUpRootMutationArgs {
  input?: Maybe<UserSignUpInput>;
}

import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace RootQueryTypeResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    users?: UsersResolver<Maybe<(Maybe<User>)[]>, TypeParent, TContext>;

    user?: UserResolver<Maybe<User>, TypeParent, TContext>;

    userByToken?: UserByTokenResolver<Maybe<User>, TypeParent, TContext>;
  }

  export type UsersResolver<
    R = Maybe<(Maybe<User>)[]>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type UserByTokenResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, UserByTokenArgs>;
  export interface UserByTokenArgs {
    token: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<TContext = {}, TypeParent = User> {
    id?: IdResolver<Maybe<string>, TypeParent, TContext>;

    email?: EmailResolver<Maybe<string>, TypeParent, TContext>;

    password?: PasswordResolver<Maybe<string>, TypeParent, TContext>;

    token?: TokenResolver<Maybe<string>, TypeParent, TContext>;

    createdAt?: CreatedAtResolver<Maybe<string>, TypeParent, TContext>;

    updatedAt?: UpdatedAtResolver<Maybe<string>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type EmailResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type PasswordResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type TokenResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type CreatedAtResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type UpdatedAtResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
}

export namespace RootMutationResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    signIn?: SignInResolver<Maybe<User>, TypeParent, TContext>;

    signUp?: SignUpResolver<Maybe<User>, TypeParent, TContext>;
  }

  export type SignInResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, SignInArgs>;
  export interface SignInArgs {
    input?: Maybe<UserSignInInput>;
  }

  export type SignUpResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, SignUpArgs>;
  export interface SignUpArgs {
    input?: Maybe<UserSignUpInput>;
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export type IResolvers<TContext = {}> = {
  RootQueryType?: RootQueryTypeResolvers.Resolvers<TContext>;
  User?: UserResolvers.Resolvers<TContext>;
  RootMutation?: RootMutationResolvers.Resolvers<TContext>;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
