const { decamelizeKeys } = require('humps')
const { makeResponse } = require('../../utils')

module.exports = mode => async ({ params, knex, logger, user }, res) => {
  try {

    const { postId } = params

    const [hasReaction] = await knex(`social_me.${mode}`)
      .select('id')
      .where(decamelizeKeys({
        userId: user.id,
        postId
      }))

    const [hasOpositeReaction] = await knex(
      `social_me.${mode === 'likes' ?  'dislikes' : 'likes'}`
    )
      .select('id')
      .where(decamelizeKeys({
        userId: user.id,
        postId
      }))

    if (hasReaction || hasOpositeReaction) {

      return makeResponse(
        res,
        409,
        { message: 'You already reacted to this post' }
      )

    }

    const [addReaction] = await knex(`social_me.${mode}`)
      .insert(decamelizeKeys({
        userId: user.id,
        postId
      }))
      .returning('id')

      return makeResponse(
        res,
        200,
        {
          message: `Reaction (${mode}) successfully registered`,
          reactionId: addReaction.id
        }
      )

  } catch (err) {

    logger.error(`Exception in addReaction: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
