const { makeResponse } = require('../../utils')

module.exports = async ({ knex, logger }, res) => {
  try {

    const commentariesSubQuery = knex('social_me.commentaries')
      .count('commentaries.id').as('commentaries')
      .where('post_id', knex.ref('posts.id'))

    const likeSubQuery = knex('social_me.likes')
      .count('likes.id').as('likes')
      .where('post_id', knex.ref('posts.id'))

    const dislikeSubQuery = knex('social_me.dislikes')
      .count('dislikes.id').as('dislikes')
      .where('post_id', knex.ref('posts.id'))

    const posts = await knex('social_me.posts')
      .select(
        'posts.id',
        'title',
        'description',
        'views',
        'name',
        'email',
        commentariesSubQuery,
        likeSubQuery,
        dislikeSubQuery
      )
      .leftJoin('social_me.users', 'users.id', 'posts.id')

      return makeResponse(
        res,
        200,
        { posts }
      )

  } catch (err) {

    logger.error(`Error in reportPosts: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
