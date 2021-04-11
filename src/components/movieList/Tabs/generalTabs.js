import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import {updateDisplayType} from "../../../reducers/sharedReducer";

import {
    TAB,
    BUTTON,
    CONTAINER
} from './elements'

/*
 * How TO - Tabs
 * https://www.w3schools.com/howto/howto_js_tabs.asp
 */
const GeneralTabs = ({store}) => {

    const dispatch = useDispatch();

    const {displayTypes} = useSelector(state => state[store]);

    const getTabContent = () => {

        return (
            <>
            {
                displayTypes.map((d, i) => {
                    
                    return(
                        <CONTAINER
                            key={i}
                            visible={d.active}
                        >
                            {d.content}
                        </CONTAINER>
                    )
                })
            }
            </>
        )
    }

    /*
     *  
     */
    const getTabLinks = () => {
        return(
            <TAB>
                {
                    displayTypes.map((d,i) => {
                        return (
                            <BUTTON
                                key={i}
                                onClick={() => dispatch(updateDisplayType({
                                    type: d.name,
                                    store: store
                                }))}
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


    /*
    */
    return (
        <>
            { getTabLinks() }
            { getTabContent() }
        </>
    );

};

export default GeneralTabs;