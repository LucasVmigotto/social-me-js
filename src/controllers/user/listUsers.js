const { makeResponse } = require('../../utils')

module.exports = async ({ knex, logger }, res) => {
  try {

    const users = await knex('social_me.users')
      .select(
        'id',
        'name',
        'email',
      )

      logger.info(`Users query returned with ${users.length} results`)

      return makeResponse(
        res,
        200,
        { users }
      )

  } catch (err) {

    logger.error(`Error in listUsers: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
