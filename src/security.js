const { verify } = require('jsonwebtoken')
const config = require('./config')

const verifyToken = (token, secret) =>

  new Promise((resolve, reject) => {

    verify(token, secret, (err, decodedToken) => {

      if (err) {

        reject(err)

      }

      resolve(decodedToken)

    })

  })

const parseAuthorization = (auth) => {

  const [type, token] = auth.split(' ')

  if (type !== 'Bearer') {

    throw new Error('Unsupported authorization method')

  }

  return token
}

const protectedByAuth = (req, _, next) => {

  const { headers: { authorization } } = req

  if (authorization) {

    try {

      verifyToken(
        parseAuthorization(authorization),
        config.JWT_SECRET
      )
        .then(user => {

          req.user = user

          next()

        })
        .catch(next)

    } catch (err) {

      next(err)

    }

  } else {

    next()

  }

}

module.exports = { protectedByAuth }
