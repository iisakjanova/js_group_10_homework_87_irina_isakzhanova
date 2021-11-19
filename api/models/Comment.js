const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
});

CommentSchema.plugin(idValidator);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;