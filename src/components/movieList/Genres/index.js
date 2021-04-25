import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import CheckBoxList from "./checkBoxList"
import TextButton from "./textButton"

import Togglable from "../../generalLayout/togglable"

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

    const x = [
        {
            title: "Valitse kaikki",
            clickHanler: function(){
                return dispatch(toggleGenres(true))
            }
        },
        {
            title: "Tyhjennnä valinnat",
            clickHanler: function(){
                return dispatch(toggleGenres(false))
            }
        }
    ]

    useEffect(() => {

        if(genreNames === null)
            dispatch(doSomeThing())

    }, [genreNames])

    /*
    *
    */
    return (
        <div>
            {
                genreNames
                ?   <Togglable buttonLabel="Genres">
                        <TextButton buttons = {x} />
                        <CheckBoxList
                            genres = {genreNames}
                            changeHanler = {changeHanler}
                        />
                    </Togglable>
                : "Lista puuttuu"
            }
        </div>
    );
};

export default Genres;