const { createLogger } = require('./logger')
const { createKnex } = require('./knex')
const { createMailer } = require('./mail')

exports.createContext = config => {
  const logger = createLogger({ config })

  const knex = createKnex({ config, logger })

  const mailer = createMailer({ config, logger })

  return {
    logger,
    knex,
    mailer
  }
}
