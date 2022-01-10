import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'mysql'): Promise<Connection> => {
  const options = await getConnectionOptions();

  return createConnection(
    Object.assign(options, {
      host,
    }),
  );
};