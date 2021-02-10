const express = require('express')
const router = express.Router();

const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware')

router.get('/', async (req, res) => {
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:id', validateUserId, async (req, res) => {
  const user = req.user
  res.status(200).json(user)
})

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    await Users.update(req.params.id, req.body)
    Users.getById(req.params.id).then(user => {
      res.status(200).json(user)
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to update user, make sure user is unique' })
  }
})

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await Users.remove(req.params.id)
    res.status(202).json(req.user)
  } catch (error) {
    res.status(500).json({
      message: 'Unable to delete user',
      error: error
    })
  }
})

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const userPosts = await Users.getUserPosts(req.params.id)
    res.status(200).json(userPosts)
  } catch (error) {
    res.status(500).json({
      message: 'failed to retrieve user posts',
      error: error
    })
  }
})

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await Posts.insert({
      text: req.body.text,
      user_id: req.params.id
    })
    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ message: 'failed to add post' })
  }
})


module.exports = router
// do not forget to export the router
