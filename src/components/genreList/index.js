import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {
    loadMockData
} from "../../reducers/genreListReducer"

import Countdown from "../Countdown";

import GeneralTabs from "../movieList/Tabs/generalTabs";

const GenreList = () => {

    const dispatch = useDispatch();

    const {loading, data} = useSelector(state => state.genres);

    useEffect(() => {

        if(data === null){
            dispatch(loadMockData())
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