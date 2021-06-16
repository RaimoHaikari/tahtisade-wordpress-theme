import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {
    initializeGenres,
    loadMockData
} from "../../reducers/genreListReducer"

import Countdown from "../Countdown";

import GeneralTabs from "../movieList/Tabs/generalTabs";

const GenreList = () => {

    const dispatch = useDispatch();

    const {loading, data} = useSelector(state => state.genres);

    useEffect(() => {

        if(data === null){
            dispatch(initializeGenres())
        }

    }, [data])

    /*
                    : <GeneralTable 
                        store='genres'
                    />
    */
    return (
        <>
            {
               loading === true
               ? <Countdown />
               : data === null
                    ? "alappas lataamaan aineistoa"
                    : <GeneralTabs store="genres" />
            }
        </>
    );
};

export default GenreList;