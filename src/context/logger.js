const winston = require('winston')
const {
  combine,
  timestamp,
  json,
  prettyPrint
} = winston.format

exports.createLogger = context => {

  const { config } = context

  return winston.createLogger({
    level: config.LOG_LEVEL,
    format: combine(timestamp(), json()),
    transports: [new winston.transports.Console()],
    silent: config.NODE_ENV === 'test'
  })

}
