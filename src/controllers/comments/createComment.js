const { decamelizeKeys } = require('humps')
const { makeResponse } = require('../../utils')

module.exports = async ({ body, knex, logger, user }, res) => {
  try {

    const { postId, description } = body

    if (!postId || !description) {

      return makeResponse(
        res,
        500,
        !postId
          ? { message: 'Field \'postId\' is missing from payload' }
          : { message: 'Field \'decription\' is missing from payload' }
      )

    }

    const [comment] = await knex('social_me.comments')
      .insert(decamelizeKeys({
        postId,
        userId: user.id,
        description
      }))
      .returning('id')

    return makeResponse(
      res,
      201,
      {
        message: 'Comment successfully created',
        commentId: comment.id
      }
    )

  } catch (err) {

    logger.error(`Exception in createComment: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
