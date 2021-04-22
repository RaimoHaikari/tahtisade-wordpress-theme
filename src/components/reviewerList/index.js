import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Countdown from "../Countdown"

import GeneralTabs from "../movieList/Tabs/generalTabs";

import {
    loadMockData
} from "../../reducers/reviewerListReducer";

const ReviewerList = () => {

    const dispatch = useDispatch();

    const {loading, visibleData} = useSelector(state => state.reviewers);

    const errorMsg = () => {

        return(
            null
        )
    }

    useEffect(() => {

        if(visibleData === null){
            dispatch(loadMockData())
        }

    }, [visibleData])

    return (
        <>
            {
               loading === true
               ? <Countdown />
               : visibleData === null
                    ? errorMsg()
                    : <GeneralTabs store="reviewers" />
           }
        </>
    );
};

export default ReviewerList;