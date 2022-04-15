const { protectedByAuth } = require('../security')
const { authMe } = require('../controllers/auth')

const user = require('../controllers/user')

module.exports = app => {

  app.post('/auth', authMe)

  app.post('/users', user.createUser)
  app.get('/users', protectedByAuth, user.listUsers)
  app.put('/users/:userId', protectedByAuth, user.updateUser)
  app.delete('/users/:userId', protectedByAuth, user.deleteUser)

}
