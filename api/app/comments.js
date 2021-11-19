const express = require("express");
const {ObjectId} = require("mongodb");

const auth = require("../middleware/auth");
const Comment = require("../models/Comment");

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const commentData = {
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
    };

    const comment = new Comment(commentData);

    const response = {
        ...comment._doc,
        user: {
            _id: req.user._id,
            username: req.user.username,
        },
    };

    try {
        await comment.save();
        res.send(response);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {
    const id = ObjectId(req.query.post);

    try {
        const comments = await Comment.aggregate([{$match: {post: id}}])
            .sort({_id: -1});
        await Comment.populate(comments, {path: "user", select: "username"});
        res.send(comments);
    } catch (e) {
        res.status(500).send({message: e.message});
    }
});

module.exports = router;