const { makeResponse } = require('../../utils')

module.exports = async ({ params, knex, logger }, res) => {
  try {

    const { postId } = params

    await knex('social_me.posts')
      .increment('views', 1)
      .where('id', postId)

    const likeSubQuery = knex('social_me.likes')
      .count('likes.id').as('likes')
      .where('post_id', knex.ref('posts.id'))

    const dislikeSubQuery = knex('social_me.dislikes')
      .count('dislikes.id').as('dislikes')
      .where('post_id', knex.ref('posts.id'))

    const post = await knex('social_me.posts')
      .select(
        'posts.id',
        'title',
        'description',
        'views',
        'name',
        'email',
        likeSubQuery,
        dislikeSubQuery
      )
      .leftJoin('social_me.users', 'users.id', 'posts.id')
      .where('posts.id', postId)

      return makeResponse(
        res,
        200,
        { post }
      )

  } catch (err) {

    logger.error(`Error in getPost: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
