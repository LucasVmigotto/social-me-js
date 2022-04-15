const { makeResponse } = require('../../utils')

module.exports = async ({ body, knex, logger }, res) => {
  try {

    const { name, email } = body

    if (!name || !email) {

      return makeResponse(
        res,
        500,
        !name
          ? { message: 'Field \'name\' is missing from payload' }
          : { message: 'Field \'email\' is missing from payload' }
      )

    }

    const [user] = await knex('social_me.users')
      .insert({ name, email })
      .returning('id')

    return makeResponse(
      res,
      201,
      {
        message: 'User successfully created',
        userId: user.id
      }
    )

  } catch (err) {

    logger.error(`Exception in createUser: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
