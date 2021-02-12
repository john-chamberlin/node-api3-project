require('dotenv').config()
const express = require('express')
const server = express();
const cors = require('cors')
const userRouter = require('../api/users/users-router')
const postsRouter = require('../api/posts/posts-router')

const { logger } = require('./middleware/middleware')

server.use(express.json())
server.use(logger)
server.use(cors())
server.use('/api/users', userRouter)
server.use('/api/posts', postsRouter)



// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
