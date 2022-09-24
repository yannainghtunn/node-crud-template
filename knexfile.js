// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 const pg = require('pg')
 require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,

  },
/*
  production: {
    client: 'postgresql',
    connection: {
      database: 'kopwar',
      user:     'kopwarmicro',
      password: 'mypassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }*/
};

