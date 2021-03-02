import {
    applyMiddleware,
    combineReducers,
    createStore
} from "redux";

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";

import frontPageReducer from "./reducers/frontPageReducer";
import movieListReducer from "./reducers/movieListReducer";
import postsReducer from "./reducers/postsReduces";
import timerReducer from "./reducers/timerReducer";

const reducer = combineReducers({
    frontPage: frontPageReducer,
    movies: movieListReducer,
    posts: postsReducer,
    timer: timerReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;
