export = {
    API: {
      protocol: 'http',
      host: '0.0.0.0',
      port: 5005,
    },
    general: {
      debug: false,
    },
    auth: {
      jwtSecret: 'dfsgdfv',
    },
    db: {
      pg: {
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'tid',
        password: 'WSJtxAnH7FSfp7Zr',
        database: 'tid',
        entities: [
          'src/**/**.entity.psql.ts',
          'src/**/**.entity.psql.js',
          '**/**.entity.psql.ts',
          '**/**.entity.psql.js',
        ],
      },
    },
  };
