const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  console.log(`${req.method} request made to '${req.url}' at ${Date.now()}`)
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({ message: `no user found with id ${id}` })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(404).json({ message: 'Missing user data' })
  } else if (!req.body.name) {
    res.status(404).json({ message: 'Please include name of user' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(404).json({ message: 'must include text field' })
  } else {
    next()
  }
}

async function validatePostId(req, res, next) {
  const { id } = req.params
  try {
    const post = await Posts.getById(id)
    if (!post) {
      res.status(404).json({ message: `no post found with id ${id}` })
    } else {
      req.post = post
      next()
    }
  } catch (err) {
    res.status(500).json({ message: `error retrieving post with id ${id}` })
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
}
// do not forget to expose these functions to other modules
