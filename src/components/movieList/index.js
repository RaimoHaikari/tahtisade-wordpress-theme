import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Countdown from "../Countdown"

import GeneralTabs from "../movieList/Tabs/generalTabs";

import {
    initializeMovies,
} from "../../reducers/movieListReducer";

const MovieList = () => {

    const dispatch = useDispatch();

    const {loading, visibleData} = useSelector(state => state.movies);

    const errorMsg = () => {

        console.log("Error message");

        return(
            null
        )
    }

    useEffect(() => {

        if(visibleData === null){
            dispatch(initializeMovies())
        }

    }, [visibleData])


    /* 
     *
     */
    return (
        <>
            {
               loading === true
               ? <Countdown />
               : visibleData === null
                    ? errorMsg()
                    : <GeneralTabs store="movies" />
           }
        </>
    );
};

export default MovieList;