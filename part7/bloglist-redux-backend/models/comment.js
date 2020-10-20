const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Blog'
    }
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Comment', commentSchema)