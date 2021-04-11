import React from 'react';

import TablePresentation from "../components/movieList/TablePresentation/generalTable"

import {
    genreListMockData,
    getNumberOfPagesTotal,
    getPaginationLinks,
    getVisibleItems
} from "./utils";


const DISPLAYTYPE = [

    {
        name: 'Taulukko',
        active: true,
        content: <TablePresentation store='genres' />
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

/*
 * 
 *
 * Lähtökohtaisesti esitetään genrelista kokonaisuudessaan, jossa yhteydessä:
 * - mainitaan montako kyseisen genremäärityksen kokonaan/osaksi 
 *   on kantaan tallennettu
 * - ko. genremäärityksen omaavien elokuvien keskimääräinen arvosana
 * 
 * Listaa voidaan suodattaa hakusanan avulla.
 * 
 * Huom! Tässä vaiheessa ei vielä suoriteta sivutusta
 */
const getPresentedGenreList = (allTheGenres,  search ,sortingField, sortingOrder) => {

    let computedGenres = allTheGenres;

    /*
     * Haku
     * - kohdistuu nimeen
     */
    if(search) {

        computedGenres = computedGenres.filter(item => {

            return (
                item.genre.toLowerCase().includes(search.toLowerCase()) 
            )

        })

    }

    /*
     * Lajittelu
     */
    if(sortingField){
        const reversed = sortingOrder === "asc" ? 1 : -1;

        computedGenres = computedGenres.sort((a,b) => {

            let val;

            switch (sortingField) {
                case "genre":
                  val = reversed * a[sortingField].localeCompare(b[sortingField])
                  break;
                default:
                    val =  reversed * ((a[sortingField] > b[sortingField]) ? 1 : (a[sortingField] < b[sortingField]) ? -1 : 0)
              }

            return(val)
        })

    }

    return computedGenres;

}


const displayGenreList = (state, data) => {

    let loadedGenreList  = genreListMockData;

    let genresToShow = getPresentedGenreList(
        loadedGenreList,
        state.search, 
        state.sortingField, 
        state.sortingOrder
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

   /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
   genresToShow = getVisibleItems(genresToShow, state.currentPage, state.itemsPerPage)

   let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);
    
    return {
        ...state,
        data: loadedGenreList,
        headers: getHeaders(),
        loading: false,
        paginationLinks: paginationLinks,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: genresToShow
    }

}

/*
 * Asetetaan aktiivisen sivun sisältö.
 */
const setCurretPage = (state, data) => {

    let newCurrentPage = data.page;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let genresToShow = getPresentedGenreList(
        state.data,
        state.search, 
        state.sortingField, 
        state.sortingOrder
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);


    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    genresToShow = getVisibleItems(genresToShow, newCurrentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: genresToShow,
        paginationLinks: paginationLinks,
        currentPage: newCurrentPage
    };
    

}

/*
 * Asetetaan listaustyyppi
 *
 * Genreluettelo voidaan esittää taulukkomuodossa, joten
 * tilaan ei ole mitään muutettavaa. Action tarvitaan, jotaa
 * voidaan käyttää GeneralTabs -komponettia
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
    let genresToShow = getPresentedGenreList(
        state.data,
        searchStr, 
        state.sortingField, 
        state.sortingOrder
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    
    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    genresToShow = getVisibleItems(genresToShow, newCurrentPage, state.itemsPerPage);

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
        visibleData: genresToShow,
    }
}

/*
 * Lajittelujärjestyksen muutos
 */
const setSortingSettings = (state, data)  => {

    let newField = data.field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    let genresToShow = getPresentedGenreList(
        state.data,
        state.search, 
        newField, 
        newOrder
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = genresToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    
    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    
    genresToShow = getVisibleItems(genresToShow, newCurrentPage, state.itemsPerPage);

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        paginationLinks: paginationLinks,
        sortingField: newField,
        sortingOrder: newOrder,
        currentPage: newCurrentPage,
        visibleData: genresToShow  
    }
}

/*
    data: null,
    displayTypes: DISPLAYTYPE,
    headers: [], // Huom! Pitää olla jotta tieto voidaan esittää taulukossa
    loading: false,
    search: '',
    sortingField: '',
    sortingOrder: '',
    visibleData: null,

*/

/* 
 * A C T I O N S
 */ 
export const loadMockData = () => {

    return (dispatch, state) => {

        dispatch({
            type: 'GENRELIST_LOADING_START'
        })

        setTimeout(() => {

            dispatch({
                type: 'GENRELIST_INITIALIZED',
                data: {}
            })

        }, 2000)

    }

}

const genreListReducer = (state = initialState, action) => {

    switch(action.type){

        case 'GENRELIST_INITIALIZED':
            return displayGenreList(state, action.data);

        case 'GENRELIST_LOADING_START':
            return {
                ...state,
                loading: true
            };

        case 'GENRELIST_SET_CURRENT_PAGE':
            return setCurretPage(state, action.data);

        case 'GENRELIST_SET_DISPLAY_TYPE':
            return setDisplayType(state, action.data);

        case 'GENRELIST_UPDATE_SEARCH':
            return setSearchSettings(state, action.data);

        case 'GENRELIST_UPDATE_SORTING':
            return setSortingSettings(state, action.data);

        default:
          return state

    }    
}

export default genreListReducer;