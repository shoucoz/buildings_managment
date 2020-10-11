// Update with your config settings.

module.exports = {

  development: {
    client: "mysql2",
    connection: {
      database: "test_buildings",
      user: "root",
      password: "sqlpass1234"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "mysql2",
    connection: {
      database: "test_buildings_test",
      user: "root",
      password: "sqlpass1234"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations_test"
    }
  },

  production: {
    client: "mysql2",
    connection: {
      database: "test_buildings",
      user: "root",
      password: "sqlpass1234"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};


