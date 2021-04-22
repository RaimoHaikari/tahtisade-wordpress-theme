import React from 'react';

import TablePresentation from "../components/movieList/TablePresentation/generalTable"

import {
    getNumberOfPagesTotal,
    getPaginationLinks,
    getPresentedItemsList,
    getVisibleItems,
    revierListMockData
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
        { name: "Nimi", field: "name", sortable: true, searchable: true},
        { name: "Arvioiden keskiarvo", field: "starsAverage",  sortable: true, searchable: false},
        { name: "Arvioiden määrä", field: "numbOfRevies", sortable: true, searchable: false},
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
const displayReviewerList = (state, data) => {

    let loadedReviewerList  = revierListMockData;

    let reviewersToShow = getPresentedItemsList(
        loadedReviewerList,
        state.search, 
        state.sortingField, 
        state.sortingOrder
    )

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

   /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
   reviewersToShow = getVisibleItems(reviewersToShow, state.currentPage, state.itemsPerPage);

   let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        data: loadedReviewerList,
        headers: getHeaders(),
        loading: false,
        paginationLinks: paginationLinks,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: reviewersToShow
    }
}


const setCurretPage = (state, data) => {


    let newCurrentPage = data.page;


    // - päivitetään kävijälle näytettävä arvostelijalistaus
    let reviewersToShow = getPresentedItemsList(
        state.data,
        state.search, 
        state.sortingField, 
        state.sortingOrder
    )
    

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);
    

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    
    reviewersToShow = getVisibleItems(reviewersToShow, newCurrentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: reviewersToShow,
        paginationLinks: paginationLinks,
        currentPage: newCurrentPage
    };
    
}

/*
 * Asetetaan listaustyyppi
 *
 * Kriitikkoluettelo voidaan esittää (toistaiseksi) vain taulukkomuodossa, joten tilaan ei ole 
 * mitään muutettavaa. Action tarvitaan, jotaa voidaan käyttää GeneralTabs -komponettia
 * 
 */
const setDisplayType = (state, data) => {

    return {
        ...state
    }

}

/*
 * Hakutermin muutos
 */
const setSearchSettings = (state, data) => {

    let searchStr = data.str;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let reviewersToShow = getPresentedItemsList(
        state.data,
        searchStr, 
        state.sortingField, 
        state.sortingOrder
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    
    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    reviewersToShow = getVisibleItems(reviewersToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    /*
    */
    return {
        ...state,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        search: searchStr,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: reviewersToShow,
    }
}

/*
 * Lajittelujärjestyksen muutos
 */
const setSortingSettings = (state, data)  => {

    let newField = data.field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    let reviewersToShow = getPresentedItemsList(
        state.data,
        state.search, 
        newField, 
        newOrder
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    
    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    
    reviewersToShow = getVisibleItems(reviewersToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        paginationLinks: paginationLinks,
        sortingField: newField,
        sortingOrder: newOrder,
        currentPage: newCurrentPage,
        visibleData: reviewersToShow  
    }
}

/*
 * A C T I O N S
 */
export const loadMockData = () => {

    return (dispatch) => {

        dispatch({
            type: 'REVIEWERLIST_LOADING_START'
        })

        setTimeout(() => {

            dispatch({
                type: 'REVIEWERLIST_INITIALIZED',
                data: {}
            })

        }, 2000)

    }

}


const reviewersListReducer = (state = initialState, action) => {

    switch(action.type){

        case 'REVIEWERLIST_INITIALIZED':
            return displayReviewerList(state, action.data);

        case 'REVIEWERLIST_LOADING_START':
            return {
                ...state,
                loading: true
            };
            
        case 'REVIEWERLIST_SET_CURRENT_PAGE':

            return setCurretPage(state, action.data);

        case 'REVIEWERLIST_SET_DISPLAY_TYPE':

            return setDisplayType(state, action.data);


        case 'REVIEWERLIST_UPDATE_SEARCH':

            return setSearchSettings(state, action.data);


        case 'REVIEWERLIST_UPDATE_SORTING':

            return setSortingSettings(state, action.data);

        default:
            return state

    }    
}

export default reviewersListReducer;