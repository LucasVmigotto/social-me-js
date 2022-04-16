const { makeResponse } = require('../../utils')

module.exports = async ({ params, knex, logger }, res) => {
  try {

    const { postId } = params

    const audit = await knex('social_me.audit_posts')
      .select(
        'update_timestamp',
        'old_title',
        'new_title',
        'old_description',
        'new_description'
      )
      .where('post_id', postId)
      .orderBy('id', 'desc')

      return makeResponse(
        res,
        200,
        { audit }
      )

  } catch (err) {

    logger.error(`Error in auditPost: ${err}`)
    return makeResponse(
      res,
      500,
      { message: 'An internal error occurred' }
    )

  }
}
