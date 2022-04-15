const { protectedByAuth } = require('../security')
const { authMe } = require('../controllers/auth')

const users = require('../controllers/users')
const posts = require('../controllers/posts')
const reactions = require('../controllers/reactions')
const commentaries = require('../controllers/commentaries')

module.exports = app => {

  app.post('/auth', authMe)

  app.post('/users', users.createUser)
  app.get('/users', protectedByAuth, users.listUsers)
  app.put('/users/:userId', protectedByAuth, users.updateUser)
  app.delete('/users/:userId', protectedByAuth, users.deleteUser)

  app.post('/posts', protectedByAuth, posts.createPost)
  app.get('/posts', protectedByAuth, posts.listPosts)
  app.get('/posts/:postId', protectedByAuth, posts.getPost)
  app.put('/posts/:postId', protectedByAuth, posts.updatePost)
  app.delete('/posts/:postId', protectedByAuth, posts.deletePost)

  app.patch('/posts/:postId/like', protectedByAuth, reactions.addReaction('likes'))
  app.patch('/posts/:postId/like/undo', protectedByAuth, reactions.removeReaction('likes'))
  app.patch('/posts/:postId/dislike', protectedByAuth, reactions.addReaction('dislikes'))
  app.patch('/posts/:postId/dislike/undo', protectedByAuth, reactions.removeReaction('dislikes'))

  app.post('/commentaries', protectedByAuth, commentaries.createComment)
  app.get('/commentaries/:postId', protectedByAuth, commentaries.listCommentaries)
  app.put('/commentaries/:commentId', protectedByAuth, commentaries.updateComment)
  app.delete('/commentaries/:commentId', protectedByAuth, commentaries.deleteComment)

}
