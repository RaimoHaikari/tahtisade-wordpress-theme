import postService from '../services/posts'

const initialState = {
    data: []
}

const processPostData = (state, data) => {

    console.log("..........................");
    console.log(data);
    console.log("..........................");

    return state;
}

/* 
 * A C T I O N S
 */ 
export const initializePosts = () => {

    return async dispatch => {
        const posts =  await postService.getAll();

        dispatch({
            type: 'INIT_POSTS',
            data: posts
        })
    }
}

const postsReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'INIT_POSTS':
            return processPostData(state, action.data);
        default:
            return state;
    }
}

export default postsReducer;