import {
    applyMiddleware,
    combineReducers,
    createStore
} from "redux";

import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";

import frontPageReducer from "./reducers/frontPageReducer";
import movieListReducer from "./reducers/movieListReducer";
import genreListReducer from "./reducers/genreListReducer";
import postsReducer from "./reducers/postsReduces";
import reviewersListReducer from "./reducers/reviewerListReducer"
import sharedReducer from "./reducers/sharedReducer";
import singleGenreReducer from "./reducers/singleGenreReducer";
import singleMovieReducer from "./reducers/singleMovieReducer";
import singleReviewerReducer from "./reducers/singleReviewerReducer";
import timerReducer from "./reducers/timerReducer";

const reducer = combineReducers({
    frontPage: frontPageReducer,
    movies: movieListReducer,
    singleMovie: singleMovieReducer,
    genres: genreListReducer,
    posts: postsReducer,
    reviewers: reviewersListReducer,
    singleGenre: singleGenreReducer,
    singleReviewer: singleReviewerReducer,
    shared: sharedReducer,
    timer: timerReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store;
