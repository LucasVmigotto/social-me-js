const winston = require('winston')
const {
  combine,
  timestamp,
  json,
  prettyPrint
} = winston.format

exports.createLogger = context => {

  const { config } = context

  const format = config.NODE_ENV === 'production'
    ? combine(timestamp(), json())
    : combine(timestamp(), prettyPrint())

  return winston.createLogger({
    level: config.LOG_LEVEL,
    format,
    transports: [
      new winston.transports.Console()
    ],
    silent: config.NODE_ENV === 'test'
  })

}
