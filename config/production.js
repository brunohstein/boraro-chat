var config = {
  detailedErrors: true,
  debug: true,
  hostname: null,
  model: {
    defaultAdapter: 'postgres'
  },
  db: {
    postgres: {
      user: 'isqxerhcimjeod',
      database: 'd99a7sr6909d48',
      password: '92rYpLRB15SuZUDkzbh292eDy6',
      host: 'ec2-23-21-129-125.compute-1.amazonaws.com',
      port: 5432
    }
  },
  sessions: {
    store: 'cookie',
    key: 'sid',
    expiry: 14 * 24 * 60 * 60
  }
};

module.exports = config;
