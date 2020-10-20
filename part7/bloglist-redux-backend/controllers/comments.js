const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')


commentRouter.get('/:id/comments', async (req, res) => {
    const id = req.params.id
    const getBlogs = await Blog.findById(id).populate('comments')
    return res.json(getBlogs)
})

commentRouter.post('/:id/comments', async (req, res) => {
    const body = req.body
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({error: 'token missing or invalid'})
    }
    const id = req.params.id
    const blog =await Blog.findById(id)
    const comment = new Comment({
        message: body.message,
    })
    const commented = await comment.save()
    blog.comments = blog.comments.concat(commented._id)
    await blog.save()
    return res.status(201).json(commented.toJSON())
})

module.exports = commentRouter