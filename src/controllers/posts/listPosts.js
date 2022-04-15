const { makeResponse } = require('../../utils')

module.exports = async ({ knex, logger }, res) => {
  try {

    const posts = await knex('social_me.posts')
      .select(
        'id',
        'title',
        'description',
        'views'
      )

      logger.info(`Posts query returned with ${posts.length} results`)

      return makeResponse(
        res,
        200,
        { posts }
      )

  } catch (err) {

    logger.error(`Error in listPosts: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
