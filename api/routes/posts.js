const express = require('express');
const cors = require('cors');  //Browser can accept cross origin requests
const router = express.Router();
const Post = require('../models/post'); //Importing a model
const mongoose = require('mongoose');
const multer = require('multer');
const { uuid } = require('uuidv4');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + uuid());
    }
})

const fileFilter = (req, file, cb) =>{
    //Reject a file if it is not of jpeg or png type
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

//Get all posts sorted by date in descending order
router.get('/', cors(), async (req, res) => {
    const posts = await Post.find().sort([['date',-1]]).exec((err, docs) => {
        if(err){
            console.log(err);
        }
        else{
            Object.keys(docs).forEach(function(doc) {
                if(docs[doc].postImage){
                    let image = docs[doc].postImage;
                    docs[doc].postImage = req.protocol + '://' + req.get('host') + '/' + image.replace(/.*\//,"");
                }
            });
            res.status(200).json(docs);   
        } 
    });
})

//Create a new post
router.post('/', cors(), upload.single('postImage'), async (req, res) => {
    const post =  new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        postImage: req.file.path,
        shortdesc: req.body.shortdesc,
        longdesc: req.body.longdesc
     });

     try{
       const newPost = await post.save();
       res.status(201).json(newPost);
     }
     catch(err){
       res.status(400).json({ message: err.message });
    }
})

//Update a post (one or more attributes)
router.patch('/:id', cors(), (req, res) => {
    const filter = { '_id' : req.params.id};
    const update = req.body;
    Post.findOneAndUpdate(filter, { $set : update }, {new : true}, (err, doc) => {
        if(err){
            res.status(204).send(err); 
        }
        else{
            res.status(200).json(doc);   
        } 
    })
})

//Delete a post
router.delete('/:id', cors(), (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, doc) => {
        if(err){
            res.status(204).send(err);
        }
        else{
            res.status(200).send("Post deleted successfully");   
        } 
    })
})

module.exports = router 