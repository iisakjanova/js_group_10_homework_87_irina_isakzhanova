const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: String,
    image: String,
    datetime: Date,
});

PostSchema.methods.generateDatetime = function () {
    this.datetime = new Date();
};

PostSchema.plugin(idValidator);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;