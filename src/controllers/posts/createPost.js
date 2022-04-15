const { decamelizeKeys } = require('humps')
const { makeResponse } = require('../../utils')

module.exports = async ({ body, knex, logger, user }, res) => {
  try {

    const { title, description } = body

    if (!title || !description) {

      return makeResponse(
        res,
        500,
        !title
          ? { message: 'Field \'title\' is missing from payload' }
          : { message: 'Field \'tile\' is missing from payload' }
      )

    }

    const [post] = await knex('social_me.posts')
      .insert(decamelizeKeys({
        title,
        description,
        userId: user.id
      }))
      .returning('id')

    return makeResponse(
      res,
      201,
      {
        message: 'Post successfully created',
        postId: post.id
      }
    )

  } catch (err) {

    logger.error(`Exception in createPost: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
