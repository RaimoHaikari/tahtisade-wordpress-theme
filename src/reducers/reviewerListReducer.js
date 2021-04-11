import React from 'react';

import TablePresentation from "../components/movieList/TablePresentation/generalTable"

import {
    getNumberOfPagesTotal,
    getPaginationLinks,
    getVisibleItems
} from "./utils";


const DISPLAYTYPE = [

    {
        name: 'Taulukko',
        active: true,
        content: <TablePresentation store='reviewers' />
    }
];

/*
 *
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "genre", sortable: true, searchable: true},
        { name: "Keskiarvo", field: "starsAverage",  sortable: true, searchable: false},
        { name: "Elokuvien määrä", field: "numberOfMovies",  sortable: true, searchable: false},
        { name: "Arvostelujen määrä", field: "numberOfReviews", sortable: true, searchable: false},
    ];
}

/*
 * Reduceri jonka avulla pidetään kirjaa onko äänestämisestä kertova viesti jo näkyvillä
 */
const initialState = {
    currentPage: 1,
    data: null,
    displayTypes: DISPLAYTYPE,
    headers: [], // Huom! Pitää olla jotta tieto voidaan esittää taulukossa
    itemsPerPage: 10,
    loading: false,
    maxNumberOfPaginationLinks: 5,
    paginationLinks: [],   
    search: '',
    sortingField: '',
    sortingOrder: '',
    visibleData: null,
}

/* 
 * T A P A H T U M I E N   K Ä S I T T E L Y
 */


const reviewersListReducer = (state = initialState, action) => {

    switch(action.type){

        default:
          return state

    }    
}

export default reviewersListReducer;