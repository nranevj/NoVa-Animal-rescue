const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String,required: true},
    date:{type: Date,required: true, default: Date.now()},
    postImage:{type: String,required: true},
    shortdesc:{type: String,required: true},
    longdesc:{type: String,required: true}
})

module.exports = mongoose.model('Post', postSchema)