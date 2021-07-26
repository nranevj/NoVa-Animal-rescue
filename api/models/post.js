const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    image: {
        type: String,
        required: true
    },
    shortdesc:{
        type: String,
        required: true
    },
    longdesc:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)