import {createConnection, getConnection, getConnectionOptions} from 'typeorm';

const dbConnection = {
  async create(){
    const options = await getConnectionOptions();

    await createConnection(
        Object.assign(options, {
          database: process.env.TYPEORM_DATABASE_TEST,
          host: "0.0.0.0",
        }),
    );;
  },

  async close(){
    await getConnection().close(); 
  }
};

export { dbConnection }