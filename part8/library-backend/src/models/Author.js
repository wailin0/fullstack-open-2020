const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'author name too short']
    },
    born: {
        type: Number,
    }
})

module.exports = mongoose.model('Author', schema)