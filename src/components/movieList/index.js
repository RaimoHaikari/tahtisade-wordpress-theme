import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Countdown from "../Countdown"

import GeneralTabs from "../movieList/Tabs/generalTabs";

import {
    initializeMovies,
} from "../../reducers/movieListReducer";

const MovieList = () => {

    const dispatch = useDispatch();

    const {moviesLoading, genreNamesLoading, visibleData} = useSelector(state => state.movies);

    const errorMsg = () => {

        return(
            null
        )
    }

    useEffect(() => {

        if(visibleData === null){
            dispatch(initializeMovies())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleData])


    /* 

               loading === true
               ? <Countdown />
               : visibleData === null
                    ? errorMsg()
                    : <GeneralTabs store="movies" />

     */
    return (
        <>
            {
               (moviesLoading === true) || (genreNamesLoading === true)
               ? <Countdown />
               : visibleData === null
                    ? errorMsg()
                    : <GeneralTabs store="movies" />
           }
        </>
    );
};

export default MovieList;