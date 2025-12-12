import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (client) {
      await client.end();
    }
  }
}

async function getNewClient() {
  const connectionOptions = {};

  if (process.env.POSTGRES_URL) {
    connectionOptions.connectionString = process.env.POSTGRES_URL;
  } else {
    connectionOptions.host = process.env.POSTGRES_HOST;
    connectionOptions.port = process.env.POSTGRES_PORT;
    connectionOptions.user = process.env.POSTGRES_USER;
    connectionOptions.database = process.env.POSTGRES_DB;
    connectionOptions.password = process.env.POSTGRES_PASSWORD;
    connectionOptions.ssl = process.env.NODE_ENV === "production";
  }

  const client = new Client(connectionOptions);
  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};
