const { makeResponse } = require('../../utils')

module.exports = async ({ params, knex, logger }, res) => {
  try {

    const { postId } = params

    const commentaries = await knex('social_me.commentaries')
      .select(
        'commentaries.id',
        'commentaries.description',
        'commentaries.deleted_by',
        'users.name'
      )
      .leftJoin('social_me.users', 'user_id', 'users.id')
      .where('post_id', postId)
      .orderBy('commentaries.id')

      logger.info(`Commentaries query returned with ${commentaries.length} results`)

      return makeResponse(
        res,
        200,
        { commentaries }
      )

  } catch (err) {

    logger.error(`Error in listCommentaries: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
