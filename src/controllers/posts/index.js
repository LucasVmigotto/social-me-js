const createPost = require('./createPost')
const listPosts = require('./listPosts')
const getPost = require('./getPost')
const reportPosts = require('./reportPosts')
const auditPost = require('./auditPost')
const updatePost = require('./updatePost')
const deletePost = require('./deletePost')

module.exports = {
  createPost,
  listPosts,
  getPost,
  reportPosts,
  auditPost,
  updatePost,
  deletePost
}
