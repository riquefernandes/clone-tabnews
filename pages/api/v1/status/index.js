import database from "/infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const dbVersion = await database.query("SELECT version();");
  const maxConns = await database.query(
    "SELECT current_setting('max_connections')::int AS max_connections;"
  );
  const databaseName = process.env.POSTGRES_DB;
  const activeConns = await database.query({
    text: "SELECT count(*)::int AS conexoes_ativas FROM pg_stat_activity WHERE datname=$1",
    values: [databaseName],
  });

  const resultDbVersion = dbVersion.rows[0].version.match(/\d+\.\d+/)[0];
  const resultMaxConns = maxConns.rows[0].max_connections;
  const resultActiveConns = activeConns.rows.length;

  response.status(200).json({
    update_At: updateAt,
    dependecies: {
      database: {
        version: resultDbVersion,
        max_connections: parseInt(resultMaxConns),
        resultActiveConns: resultActiveConns,
      },
    },
  });
}

export default status;
