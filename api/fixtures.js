const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const Comment = require("./models/Comment");
const Post = require("./models/Post");
const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.db.url);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, somebody] = await User.create({
        username: 'admin',
        password: 'test',
        token: nanoid(),
    }, {
        username: 'somebody',
        password: '12345',
        token: nanoid(),
    });

    const [post1, post2, post3] = await Post.create({
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aut beatae consectetur dignissimos eligendi eos eum harum in nisi nostrum optio porro, quis quo saepe sed similique suscipit tenetur?',
        image: 'fixtures/image1.jpg',
        datetime: new Date(),
        user: admin,
    },{
        title: 'Hello, world!',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aut beatae consectetur dignissimos eligendi eos eum harum in nisi nostrum optio porro, quis quo saepe sed similique suscipit tenetur?',
        image: 'fixtures/image2.jpg',
        datetime: new Date(),
        user: somebody,
    },{
        title: 'Accusantium, ad aut',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ad aut beatae consectetur dignissimos eligendi eos eum harum in nisi nostrum optio porro, quis quo saepe sed similique suscipit tenetur?',
        datetime: new Date(),
        user: admin,
    });

    await Comment.create({
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing suscipit tenetur?',
        post: post1,
        user: admin,
    },{
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        post: post2,
        user: somebody,
    },{
        content: 'eligendi eos eum harum in nisi nostrum optio porro, quis quo saepe sed similique.',
        post: post1,
        user: somebody,
    });

    await mongoose.connection.close();
};

run().catch(console.error);