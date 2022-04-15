const { camelizeKeys } = require('humps')
const { makeResponse } = require('../../utils')

module.exports = async ({ params, body, knex, logger, user }, res) => {
  try {

    const { commentId } = params
    const { description } = body

    if (!description) {

      return makeResponse(
        res,
        500,
        { message: 'Field \'description\' is missing from payload' }
      )

    }

    const [creator] = await knex('social_me.commentaries')
      .select('user_id')
      .where('id', commentId)

    if (user.id !== parseInt(camelizeKeys(creator).userId)) {

      return makeResponse(
        res,
        409,
        { message: 'You can only edit commentaries that you have created' }
      )

    }

    const [commentUpdated] = await knex('social_me.commentaries')
      .update({ description })
      .where('id', commentId)
      .returning('id')

    return makeResponse(
      res,
      201,
      {
        message: 'Comment successfully updated',
        commentId: commentUpdated.id
      }
    )

  } catch (err) {

    logger.error(`Exception in updateComment: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }

}
