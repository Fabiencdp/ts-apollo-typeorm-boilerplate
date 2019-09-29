import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

interface IPublish<T> {
  type: string;
  payload: T;
}

export async function publish<T>(event: IPublish<T>): Promise<void> {
  return pubsub.publish(event.type, event.payload);
}
