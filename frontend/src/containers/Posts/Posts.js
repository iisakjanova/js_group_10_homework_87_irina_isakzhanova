import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";

import Post from "../../components/Post/Post";
import {getPosts} from "../../store/actions/postsActions";
import Preloader from "../../components/UI/Preloader/Preloader";


const Posts = ({history}) => {
    const posts = useSelector(state => state.posts.posts);
    const loading = useSelector(state => state.posts.fetchLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const getFullPostHandler = (id) => {
        history.push(`/posts/${id}`);
    };

    return (
        <>
            <Preloader loading={loading} />
            <Grid container direction="column" spacing={2}>
                {posts.length > 0
                    ?
                    posts.map(post => (
                        <Post
                            key={post._id}
                            post={post}
                            onGetFullPost={getFullPostHandler}
                        />
                    ))
                    :
                    null
                }
            </Grid>
        </>
    );
};

export default Posts;