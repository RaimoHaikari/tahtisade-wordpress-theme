import {SingleMovieMockData} from "./utils";

const initialState = {
    data: null,
    loading: false
}

const displayMovieData = (state, data) => {

    console.log("..........................");
    console.log(data);
    console.log("..........................");

    return {
        ...state,
        data: data,
        loading: false
    };
}

/* 
 * A C T I O N S
 */ 
export const doSomeThing = (id) => {

    return (dispatch, state) => {

        dispatch({
            type: 'SINGLE_MOVIE_LOADING_START',
            data: {}
        })

        setTimeout(() => {

            let factSheet = SingleMovieMockData;

            dispatch({
                type: 'SINGLE_MOVIE_LOADING_END',
                data: factSheet
            })

        }, 1000)

    }

}

const singleMovieReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'SINGLE_MOVIE_LOADING_START':
            return {
                ...state,
                loading: true
            }

        case 'SINGLE_MOVIE_LOADING_END':
            return displayMovieData(state, action.data);

        default:
            return state;
    }
}

export default singleMovieReducer;