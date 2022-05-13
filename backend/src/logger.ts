import { createLogger, format, transports } from 'winston';

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: '/api/v2/logs?dd-api-key=ceefa79a634e3b55409485d2c6b9ff36&ddsource=nodejs&service=zion-backend',
  // TODO: ^ wtf, credentials in source code..
  ssl: true,
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [new transports.Http(httpTransportOptions)],
  // transports: [new transports.File({ filename: `src/logs/winston.log` })],
});

module.exports = logger;
