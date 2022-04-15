const { decamelizeKeys } = require('humps')
const config = require('../../config')
const {
  makeResponse,
  mountAddress
} = require('../../utils')
const notifyCommentary = require('../../utils/templates/notifyCommentary')

/**
 * Function that send email with
 * the given info in method arguments
 *
 * @param {object} mailer
 * @param {string} name
 * @param {string} email
 * @param {string} subject
 * @param {string} message
 */
const notifyByMail = (mailer, name, email, subject, message) => {
  mailer.sendMail({
    to: mountAddress({ name, email }),
    from: mountAddress({
      name: config.SOCIAL_ME_EMAIL_NAME,
      email: config.SOCIAL_ME_EMAIL_ADDR
    }),
    subject,
    html: message
  })
}

module.exports = async ({ body, knex, logger, user, mailer }, res) => {
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

    const [postOwner] = await knex('social_me.users')
      .select(
        'name',
        'email'
      )
      .leftJoin('social_me.posts', 'posts.user_id', 'users.id')
      .where('posts.id', postId)

    notifyByMail(
      mailer,
      postOwner.name,
      postOwner.email,
      'New Commentary',
      notifyCommentary(postOwner.name, description))

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
