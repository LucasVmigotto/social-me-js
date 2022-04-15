const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = config => {
  const { createContext } = require('./context')
  const { protectedByAuth } = require('./security')
  const { authMe } = require('./controllers/auth')

  const app = express()

  const { logger, knex, mailer } = createContext(config)

  app.use(cors())
  app.use(bodyParser.json())

  app.use((req, _, next) => {

    req.knex = knex
    req.logger = logger

    next()

  })

  app.post('/auth', authMe)

  app.use(protectedByAuth)

  // router(app)

  const httpServer = http.createServer(app)

  return { httpServer, knex, logger, mailer }
}
