const express = require('express')
const router = express.Router();

const Posts = require('./posts-model')
const { validatePostId } = require('../middleware/middleware')

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'failed to retrieve posts' })
  }
})

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post)
})

module.exports = router

// do not forget to export the router
