import knex from 'knex'

export default await knex({
    client: "sqlite3", // or 'better-sqlite3'
    connection: {
      filename: "./mydb.sqlite",
    },
    useNullAsDefault: true
  });
