export = {
  API: {
    protocol: 'http',
    host: 'localhost',
    port: 5005,
    prefix: '/api/v1',
  },
  general: {
    debug: false,
  },
  db: {
    pg: {
      name: 'default',
      type: 'postgres',
      host: '178.62.210.190',
      port: 5432,
      username: 'tid',
      password: 'WSJtxAnH7FSfp7Zr',
      database: 'tid',
      entities: [
        'src/**/**.entity.ts',
        'src/**/**.entity.js',
        '**/**.entity.ts',
        '**/**.entity.js',
      ],
    },
  },
  logger: {
    winston: {
      colorConsoleLogEnable: true,
      options: {
        file: {
          level: 'info',
          filename: `./logs/app.log`,
          handleExceptions: true,
          json: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          colorize: false,
        },
        console: {
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
        },
      },
    },
  },
};
