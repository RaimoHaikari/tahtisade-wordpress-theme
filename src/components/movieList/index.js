import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import TablePresentation from "./TablePresentation"


const MovieList = () => {

    const dispatch = useDispatch();

    const {loading, movies} = useSelector(state => state.movies);

    //console.log(movies);

    return (
        <>
            <TablePresentation />
        </>
    );
};

export default MovieList;