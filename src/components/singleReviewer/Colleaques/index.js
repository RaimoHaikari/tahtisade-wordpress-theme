import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    CONTAINER,
    CARD
} from "./elements"

import {
    loadColleagueData,
    updateCompListSorting,
    updateCompReviewer
} from '../../../reducers/singleReviewerReducer'

import {updateSearchSetting} from "../../../reducers/sharedReducer"

import RadioGroup from "../../generalLayout/RadioGroup"
// import Search from "../../DT/Search";
import Search from "../../generalLayout/search"

const Colleagues = () => {

    const dispatch = useDispatch();

    const {
        colleaguesListSortingOptions,
        colleaguesListSearchStr
    } = useSelector(state => state.singleReviewer);

    const changeHandler = (val) => {
        dispatch(updateCompListSorting(val))
    }

    const {id, colleaguesList} = useSelector(state => {
        
        let x = state.singleReviewer;

        return {
            colleaguesList: x.colleaguesList,
            id: x.reviewerData.id
        }
    });

    const clickHandler = (colleague) => {

        if(colleague.availeable)
            dispatch(updateCompReviewer(colleague.id))
        else
            dispatch(loadColleagueData(id, colleague.id))
    }

    return (
        <CONTAINER>

            <div>

                <Search 
                    changeHandler={(val) => dispatch(updateSearchSetting({
                        store: 'singleReviewer',
                        str: val,
                        target: 'secondary'
                    }))}
                    value = {colleaguesListSearchStr}
                />

            </div>

            <div>

                <RadioGroup 
                    title="Listan lajittelu"
                    options = {colleaguesListSortingOptions}
                    changeHandler={changeHandler}
                />

            </div>


            <div className="listWrapper">
            {
                colleaguesList.map((c, index) => {
                    return (
                        <CARD 
                            key={index}
                            className={c.active?'active':null}
                            onClick = {() => clickHandler(c)}
                        >
                            <h4>{c.name}</h4>
                            <p>
                                {
                                    c.count !== 1
                                    ? `${c.count} arvostelua` 
                                    : `${c.count} arvostelu`
                                }
                            </p>
                        </CARD>
                    )
                })
            }
            </div>

        </CONTAINER>
    );
};

export default Colleagues;