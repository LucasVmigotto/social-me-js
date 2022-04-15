const { makeResponse } = require('../../utils')

module.exports = async ({ params, knex, logger }, res) => {
  try {

    const { postId } = params

    const comments = await knex('social_me.comments')
      .select(
        'comments.id',
        'comments.description',
        'users.name'
      )
      .leftJoin('social_me.users', 'user_id', 'users.id')
      .where('post_id', postId)
      .whereNull('deleted_by')
      .orderBy('comments.id')

      logger.info(`Comments query returned with ${comments.length} results`)

      return makeResponse(
        res,
        200,
        { comments }
      )

  } catch (err) {

    logger.error(`Error in listComments: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
