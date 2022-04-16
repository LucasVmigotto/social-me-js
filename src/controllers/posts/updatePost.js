const { camelizeKeys } = require('humps')
const { makeResponse } = require('../../utils')

module.exports = async ({ params, body, knex, logger, user }, res) => {
  try {

    const { postId } = params
    const { title, description } = body

    if (!title || !description) {

      return makeResponse(
        res,
        500,
        !title
          ? { message: 'Field \'title\' is missing from payload' }
          : { message: 'Field \'description\' is missing from payload' }
      )

    }

    const [creator] = await knex('social_me.posts')
      .select('user_id')
      .where('id', postId)

    if (user.id !== parseInt(camelizeKeys(creator).userId)) {

      return makeResponse(
        res,
        409,
        { message: 'You can only edit post that you have created' }
      )

    }

    const [postUpdated] = await knex('social_me.posts')
      .update({ title, description })
      .where('id', postId)
      .returning('id')

    return makeResponse(
      res,
      201,
      {
        message: 'Post successfully updated',
        postId: postUpdated.id
      }
    )

  } catch (err) {

    logger.error(`Exception in updatePost: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }

}
