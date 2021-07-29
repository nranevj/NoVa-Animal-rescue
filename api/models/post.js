const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
    date:{type: Date,required: true, default: Date.now()},
    postImage:{type: String},
    shortdesc:{type: String},
    longdesc:{type: String}
})

module.exports = mongoose.model('Post', postSchema)