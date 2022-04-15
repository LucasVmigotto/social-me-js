const { makeResponse } = require('../../utils')

module.exports = async ({ params, knex, logger }, res) => {
  try {

    const { userId } = params

    const userDeleted = await knex('social_me.users')
      .where('id', userId)
      .del()

    if (!!userDeleted) {

      logger.error('User successfully deleted')
      return makeResponse(
        res,
        201,
        { message: 'User successfully deleted' }
      )

    } else {

      logger.error('User could not be deleted')
      return makeResponse(
        res,
        500,
        { message: 'User could not be deleted' }
      )

    }

  } catch (err) {

    logger.error(`Exception in deleteUser: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
