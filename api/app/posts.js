const express = require('express');
const path = require("path");
const {nanoid} = require("nanoid");
const multer = require("multer");

const Post = require('../models/Post');
const config = require('../config');
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});
const router = express.Router();

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const postData = {
        title: req.body.title,
        user: req.user._id,
        description: req.body.description || null,
    };

    if (req.file) {
        postData.image = 'uploads/' + req.file.filename;
    }

    const post = new Post(postData);

    try {
        await post.generateDatetime();
        await post.save();
        res.send(post);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.aggregate().sort({datetime: -1});
        await Post.populate(posts, {path: "user", select: "username"});
        res.send(posts);
    } catch (e) {
        res.status(500).send({message: e.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate({path: "user", select: "username"});

        if (post) {
            res.send(post);
        } else {
            res.status(404).send({message: 'Post is not found'});
        }
    } catch (e) {
        res.status(500).send({message: e.message});
    }
});

module.exports = router;