const { decamelizeKeys, camelizeKeys } = require('humps')
const { makeResponse } = require('../../utils')

module.exports = async ({ params, knex, logger, user }, res) => {
  try {

    const { commentId } = params

    const [commentCreator] = await knex('social_me.commentaries')
      .select('user_id')
      .where('id', commentId)

    const [postOwner] = await knex('social_me.posts')
      .select('posts.user_id')
      .leftJoin('social_me.commentaries', 'post_id', 'posts.id')
      .where('commentaries.id', commentId)

    const deletedBy = user.id === camelizeKeys(commentCreator).userId
      ? 'COMMENT_CREATOR'
      : user.id === camelizeKeys(postOwner).userId
        ? 'POST_OWNER'
        : null

    if (!deletedBy) {

      return makeResponse(
        res,
        409,
        { message: 'Only comment creators or related post owners can remove commentaries' }
      )

    }

    const [commentDeleted] = await knex('social_me.commentaries')
      .update(decamelizeKeys({ deletedBy }))
      .where('id', commentId)
      .returning('id')

    return makeResponse(
      res,
      200,
      { message: 'Comment successfully deleted' }
    )

  } catch (err) {

    logger.error(`Exception in deleteComment: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
