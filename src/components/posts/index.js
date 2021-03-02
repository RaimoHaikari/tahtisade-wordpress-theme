import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"

import {initializePosts} from "../../reducers/postsReduces"

const PostsListing = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializePosts());
    }, [])

    return (
        <div>
            Senaste nyheter här
        </div>
    );
};

export default PostsListing;