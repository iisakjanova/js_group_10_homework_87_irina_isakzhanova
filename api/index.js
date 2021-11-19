const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');

const users = require('./app/users');
const posts = require('./app/posts');
const comments = require('./app/comments');
const config = require('./config');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const port = 8000;

app.use('/users', users);
app.use('/posts', posts);
app.use('/comments', comments);

const run = async () => {
    await mongoose.connect(config.db.url);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    exitHook(() => {
        console.log('Exiting');
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));