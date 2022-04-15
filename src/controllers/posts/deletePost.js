const { camelizeKeys } = require('humps')
const { makeResponse } = require('../../utils')

module.exports = async ({ params, knex, logger, user }, res) => {
  try {

    const { postId } = params

    const [creator] = await knex('social_me.posts')
      .select('user_id')
      .where('id', postId)

    if (user.id !== camelizeKeys(creator).userId) {

      return makeResponse(
        res,
        409,
        { message: 'You can only delete post that you have created' }
      )

    }

    const postDeleted = await knex('social_me.posts')
      .where('id', postId)
      .del()

    if (!!postDeleted) {

      logger.error('Post successfully deleted')
      return makeResponse(
        res,
        201,
        { message: 'Post successfully deleted' }
      )

    } else {

      logger.error('Post could not be deleted')
      return makeResponse(
        res,
        500,
        { message: 'Post could not be deleted' }
      )

    }

  } catch (err) {

    logger.error(`Exception in deletePost: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
