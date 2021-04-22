import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import CheckBoxList from "./checkBoxList"

import {
    doSomeThing,
    toggleGenres,
    updateSingleGenreVisibility
} from "../../../reducers/movieListReducer";

const Genres = ({}) => {

    const dispatch = useDispatch()

    const {genreNames} = useSelector(state => state.movies);

    const changeHanler = (val) => {
        dispatch(updateSingleGenreVisibility(val))
    }

    const bar = () => {
        return (
            <>
                {selectAll()}
                {selectNone()}
                {displayGenreList()}
            </>
        )
    }

    const selectAll = () => {
        return (
            <button
                onClick = {() => dispatch(toggleGenres(true))}
            >
                Valitse kaikki
            </button>
        )
    }


    const selectNone = () => {
        return (
            <button
                onClick = {() => dispatch(toggleGenres(false))}
            >
                Tyhjennä
            </button>
        )
    }

    const displayGenreList = () => {

        return (
            <CheckBoxList
                genres = {genreNames}
                changeHanler = {changeHanler}
            />
        )
    }

    useEffect(() => {

        if(genreNames === null)
            dispatch(doSomeThing())

    }, [genreNames])

    return (
        <div>
            {
                genreNames
                ? bar()
                : "Lista puuttuu"
            }
        </div>
    );
};

export default Genres;