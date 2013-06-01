var config = {
  detailedErrors: true,
  debug: true,
  hostname: null,
  port: 4000,
  model: {
    defaultAdapter: 'postgres'
  },
  db: {
    postgres: {
      user: 'bruno',
      database: 'boraro_chat',
      password: '',
      host: 'localhost',
      port: 5432
    }
  },
  sessions: {
    store: 'memory',
    key: 'sid',
    expiry: 14 * 24 * 60 * 60
  }
};

module.exports = config;
