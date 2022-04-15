const { makeResponse } = require('../../utils')

module.exports = async ({ params, body, knex, logger, user }, res) => {
  try {

    const { userId } = params
    const { name, email } = body

    if (user.id !== parseInt(userId)) {

      return makeResponse(
        res,
        409,
        { message: 'You cannot edit other profile than yours' }
      )

    }

    if (!name || !email) {

      return makeResponse(
        res,
        500,
        !name
          ? { message: 'Field \'name\' is missing from payload' }
          : { message: 'Field \'email\' is missing from payload' }
      )

    }

    const [userUpdated] = await knex('social_me.users')
      .update({ name, email })
      .where('id', userId)
      .returning('id')

    return makeResponse(
      res,
      201,
      {
        message: 'User successfully updated',
        userId: userUpdated.id
      }
    )

  } catch (err) {

    logger.error(`Exception in updateUser: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }

}
