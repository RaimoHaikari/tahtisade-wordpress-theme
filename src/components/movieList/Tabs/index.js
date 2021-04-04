import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import {updateDisplayType } from "../../../reducers/movieListReducer";

import {
    TAB,
    BUTTON,
    CONTAINER
} from './elements'

/*
 * How TO - Tabs
 * https://www.w3schools.com/howto/howto_js_tabs.asp
 */
const Tabs = () => {

    const dispatch = useDispatch();

    const {displayTypes} = useSelector(state => state.movies);

    const getTabContent = () => {
        return (
            <>
            {
                displayTypes.map((d, i) => {

                    return(
                        <CONTAINER
                            key={i}
                            visible={d.active}
                            className="tapsukkaKontti"
                        >
                            {d.content}
                        </CONTAINER>
                    )
                })
            }
            </>
        )
    }

    const getTabLinks = () => {
        return(
            <TAB className="tapsukka">
                {
                    displayTypes.map((d,i) => {
                        return (
                            <BUTTON
                                key={i}
                                onClick={() => dispatch(updateDisplayType({type: d.name}))}
                                active = {d.active}
                            >
                                {d.name}
                            </BUTTON>
                        )
                    })
                }
            </TAB>
        )
    }


    return (
        <>
            { getTabLinks() }
            { getTabContent() }
        </>
    );

};

export default Tabs;