import { getConnectionOptions, createConnection } from 'typeorm';

const initConnection = async () => {
  let connectionOptions = await getConnectionOptions();

  connectionOptions = {
    ...connectionOptions,
    entities: [
      `${__dirname}/entity/**/*.ts`,
    ],
  };

  await createConnection(connectionOptions);
};

export default initConnection;
