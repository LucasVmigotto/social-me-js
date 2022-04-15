const nodemailer = require('nodemailer')

exports.createMailer = ({ config, logger }) => {

  const mailer = nodemailer.createTransport({
    host: config.MAILHOG_HOST,
    port: config.MAILHOG_PORT,
    auth: null
  })

  mailer.on('error', err => {

    logger.error(err.message)

  })

  mailer.on('idle', el => {

    logger.info(el)

  })

  return mailer
}
