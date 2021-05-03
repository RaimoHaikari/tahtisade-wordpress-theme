import React from 'react';

import {SingleReviwerMockData} from "./utils";


/*
headers,search, sortingField, sortingOrder, visibleData
*/
const initialState = {
    data: null,
    headers: [],
    sortingField: '',
    sortingOrder: '',
    visibleData: null,
    loading: false
}

/*
 *
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "name", sortable: true, searchable: false},
        { name: "Lähde", field: "link", sortable: false, searchable: false},
        { name: "Tähtiä", field: "stars", sortable: true, searchable: false}
    ];
}

/*
 *
 */
const displayReviewerData = (state, data) => {

    console.log(data)

    return {
        ...state,
        data: [],
        loading: false,
        visibleData: []
    };
}

/* 
 * A C T I O N S
 */ 
export const doSomeThing = (id) => {

    return (dispatch, state) => {

        dispatch({
            type: 'SINGLE_REVIEWER_LOADING_START',
            data: {}
        })

        setTimeout(() => {

            let factSheet = SingleReviwerMockData;

            dispatch({
                type: 'SINGLE_REVIEWER_LOADING_END',
                data: factSheet
            })

        }, 1500)

    }

}

/*
 * Haetaan aktiivisen elokuvan tiedot palvelimelta
 */
export const initializeReviewer = (val) => {

    return async dispatch => {

        dispatch({
            type: 'SINGLE_REVIEWER_LOADING_START',
            data: {}
        })

//const movie = await moviesService.getMovieDetails(val);
        
        dispatch({
            type: 'SINGLE_REVIEWER_LOADING_END',
            data: movie
        })
    }
}

const singleReviewerReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'SINGLE_REVIEWER_LOADING_START':
            return {
                ...state,
                loading: true
            }

        case 'SINGLE_REVIEWER_LOADING_END':
            return displayReviewerData(state, action.data);

        //case 'SINGLE_REVIEWER_UPDATE_REVIEWS_SORTING':
        //    return setSortingSettings(state, action.data);

        default:
            return state;
    }
}

export default singleReviewerReducer;