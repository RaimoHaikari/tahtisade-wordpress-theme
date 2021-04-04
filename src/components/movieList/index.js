import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Countdown from "../Countdown"
import FilmCountdown from "../FilmCountdown"

import TablePresentation from "./TablePresentation"
import Search from "../DT/Search";
import Pagination from "./Pagination"
import Tabs from "./Tabs"

import Card from "./Card"

import {
    bar,
    initializeMovies,
    updateSearchSetting
} from "../../reducers/movieListReducer";

const MovieList = () => {

    const dispatch = useDispatch();

    const {loading, visibleMovies} = useSelector(state => state.movies);

    const errorMsg = () => {

        console.log("Error message");

        return(
            <>
                Jotain meni vikaan.....
            </>
        )
    }

    useEffect(() => {

        if(visibleMovies === null){
            dispatch(initializeMovies())
            //dispatch(bar())
        }

    }, [visibleMovies])


    /* 
     *
     */
    return (
        <>
            {
               loading === true
               ? <Countdown />
               : visibleMovies === null
                    ? errorMsg()
                    : <Tabs />
           }
        </>
    );
};

export default MovieList;