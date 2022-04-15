const { sign } = require('jsonwebtoken')
const { makeResponse } = require('../../utils')
const config = require('../../config')

const authMe = async ({ body, knex, logger }, res) => {
  try {

    if (!body.email) {

      return makeResponse(
        res,
        409,
        { 'message': 'Email credential is missing from login info' }
      )

    }

    const [user] = await knex('social_me.users')
      .select('id', 'name')
      .where('email', body.email)
      .limit(1)

    if (!user) {

      return makeResponse(
        res,
        409,
        { message: `There is no user related to ${body.email}` }
      )

    }

    const token = sign(
      {
        ...user,
        email: body.email
      },
      config.JWT_SECRET,
      {
        issuer: 'social-me',
        expiresIn: config.JWT_EXP
      }
    )

    return makeResponse(
      res,
      201,
      { token }
    )

  } catch (err) {

    logger.error(`Exception in authMe: ${err}`)

    return makeResponse(
      res,
      500,
      { 'message': 'An internal error occurred' }
    )

  }

}

module.exports = { authMe }
