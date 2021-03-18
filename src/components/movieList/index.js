import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import TablePresentation from "./TablePresentation"
import Search from "../DT/Search";

import {
    updateSearchSetting
} from "../../reducers/movieListReducer";

const MovieList = () => {

    const dispatch = useDispatch();

    const {loading, movies} = useSelector(state => state.movies);



    return (
        <>
            <Search 
                onSearch={(val) => dispatch(updateSearchSetting({str: val}))}
            />
            <TablePresentation />
        </>
    );
};

export default MovieList;