const { protectedByAuth } = require('../security')
const { authMe } = require('../controllers/auth')

const users = require('../controllers/users')
const posts = require('../controllers/posts')
const comments = require('../controllers/comments')

module.exports = app => {

  app.post('/auth', authMe)

  app.post('/users', users.createUser)
  app.get('/users', protectedByAuth, users.listUsers)
  app.put('/users/:userId', protectedByAuth, users.updateUser)
  app.delete('/users/:userId', protectedByAuth, users.deleteUser)

  app.post('/posts', protectedByAuth, posts.createPost)
  app.get('/posts', protectedByAuth, posts.listPosts)
  app.put('/posts/:postId', protectedByAuth, posts.updatePost)
  app.delete('/posts/:postId', protectedByAuth, posts.deletePost)

  app.post('/comments', protectedByAuth, comments.createComment)
  app.get('/comments/:postId', protectedByAuth, comments.listComments)
  app.put('/comments/:commentId', protectedByAuth, comments.updateComment)
  app.delete('/comments/:commentId', protectedByAuth, comments.deleteComment)

}
