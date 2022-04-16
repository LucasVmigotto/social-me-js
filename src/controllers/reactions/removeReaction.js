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


    if (!hasReaction) {

      return makeResponse(
        res,
        409,
        { message: 'You did not react yet to this post' }
      )

    }

    const removeReaction = await knex(`social_me.${mode}`)
      .where(decamelizeKeys({
        userId: user.id,
        postId
      }))
      .del()

    if (!!removeReaction) {

      return makeResponse(
        res,
        200,
        { message: `Reaction (${mode}) successfully removed` }
      )

    } else {

      return makeResponse(
        res,
        500,
        { message: `Reaction (${mode}) could not be removed` }
      )

    }

  } catch (err) {

    logger.error(`Exception in removeReaction: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
