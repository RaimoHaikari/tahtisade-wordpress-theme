import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import {
    CONTAINER,
    LABEL,
    INPUT
} from "./elements"

import {updateCompGenre} from "../../../reducers/singleGenreReducer"

const GenreList = () => {

    const dispatch = useDispatch()

    /* activeGenre*/
    const {data, id} = useSelector(state => {
        let a = state.singleGenre;

        return {
            id: a.activeGenre.id,
            data: a.data
        }
    });

    return (
        <CONTAINER>

            {
                data.map((d,index) => {
                    return (
                        <LABEL
                            htmlFor={`rb_${d.id}`}
                            className="radio"
                            disabled={d.id === id}
                            key={index}
                        >
                            <INPUT 
                                type="radio"
                                name='genreVertailu'
                                id={`rb_${d.id}`}
                                disabled={d.id === id}
                                className="radioInput"
                                onClick={() => dispatch(updateCompGenre(d.id))}
                            />
                            <div className="radioRadio"></div>
                            {d.name}
                        </LABEL>                        
                    )
                })
            }


        </CONTAINER>
    );

};

export default GenreList;