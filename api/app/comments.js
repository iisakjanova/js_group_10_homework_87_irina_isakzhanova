const express = require("express");

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

    try {
        await comment.save();
        res.send(comment);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;