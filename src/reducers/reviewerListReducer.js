import React from 'react';
import reviewerService from '../services/reviewers'


import TablePresentation from "../components/movieList/TablePresentation/generalTable"

import {
    convertAverageToStars,
    displayStars,
    getNumberOfPagesTotal,
    getPaginationLinks,
    getPresentedItemsList,
    getVisibleItems,
    revierListMockData
} from "./utils";
import { max } from 'd3-array';


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
    itemsPerPage: 20,
    loading: false,
    numberOfReviews: {min:1, value:10, max: null},
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

    let loadedReviewerList  = data;
    let maxNumbOfReviews = -1;


    /*
     * Palvelimelta luetun datan esikäsittely
     *
     * lisätään tietueisiin 
     * - linkki kriitikon faktasivulle
     * - ikoneilla esitetty muoto arvosanojen keskiarvosta
     * 
     * Selvitetään annettujen arvostelujen enimmäismäärä
     */
    loadedReviewerList = loadedReviewerList.map(r => {

        let productPage = `reviewers/${r.id}`;
        let visualizedStars = convertAverageToStars(r['starsAverage'])

        if(parseInt(r.numbOfRevies) > maxNumbOfReviews)
            maxNumbOfReviews = parseInt(r.numbOfRevies)

        return {
            ...r,
            productPage: productPage,   // Linkki kriitikon tiedot esittävälle sivulle
            visualizedStars: visualizedStars
        }

    })

    /*
     * Päivitetään tarvittavien arvioiden lukumäärän asetusta säätelevä objekti
     */
    let newNumberOfReviews = {
        ...state.numberOfReviews,
        max: maxNumbOfReviews
    }

    /*
     *
     */
    let reviewersToShow = getFilteredItemsList(
        loadedReviewerList,
        state.search, 
        state.sortingField, 
        state.sortingOrder, 
        state.numberOfReviews.value
    )


    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon &
    * vaihdetaan tähdet numeroiden tilalle merkkaamaan keskiarvoa
    */
    reviewersToShow = prune(
        reviewersToShow, 
        state.currentPage, 
        state.itemsPerPage,
        'starsAverage', 
        'visualizedStars'
    )

   let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        data: loadedReviewerList,
        headers: getHeaders(),
        loading: false,
        numberOfReviews: newNumberOfReviews,
        paginationLinks: paginationLinks,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: reviewersToShow
    }
}

/*
 * Lisätään Aineiston lajittelusta ja mahdollisesta hakutermillä tapahtuvasta rajauksesta huolehtivaan
 * funktio-kutsuun tarvittavien arvostelujen määrää koskeva rajaus 
 */
const getFilteredItemsList = (items, search, sortingField, sortingOrder, numberOfReviewsNeeded) => {

    return getPresentedItemsList(
        items,
        search, 
        sortingField, 
        sortingOrder
    )
    .filter(r => r.numbOfRevies >= numberOfReviewsNeeded)   

}

/* 
 * Suodatetaan aineistosta selaimelle lähetettävä osuus
 */
const prune = (items, currentPage, itemsPerPage, key, value) => {

    let filtered = getVisibleItems(items, currentPage, itemsPerPage);

   /*
    * Jäljellä enään selaimelle lähtettävä osuus. Koska lajittelu on jo suoritettu, voidaan
    * keskiarvon sisältävään sarakke "täyttää" tähdillä
    */
   filtered = displayStars(filtered, key, value)
   
   return filtered

}

const setCurretPage = (state, data) => {

    let newCurrentPage = data.page;


    // - päivitetään kävijälle näytettävä arvostelijalistaus
    let reviewersToShow = getFilteredItemsList(
        state.data,
        state.search, 
        state.sortingField, 
        state.sortingOrder, 
        state.numberOfReviews.value
    )
    

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);
    
    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon &
     * vaihdetaan tähdet numeroiden tilalle merkkaamaan keskiarvoa
     */
    reviewersToShow = prune(
        reviewersToShow, 
        newCurrentPage, 
        state.itemsPerPage,
        'starsAverage', 
        'visualizedStars'
    )

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
 * Asetetaa uusi arvo sille kuinka monta arvostelua pitää vähintään olla, jotta arvostelijan
 * nimi esitetään listalla
 * 
 * @todo: T Ä N N E   J Ä Ä T I I N . . .
 */
const setMinNumberOfReviews = (state, data) => {

    let newValue = data.value


    /*
     * Päivitetään tarvittavien arvioiden lukumäärän asetusta säätelevä objekti
     */
    let newNumberOfReviews = {
        ...state.numberOfReviews,
        value: newValue
    }

    /*
     *
     */
    let reviewersToShow = getFilteredItemsList(
        state.data,
        state.search, 
        state.sortingField, 
        state.sortingOrder, 
        newValue
    )


    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon &
    * vaihdetaan tähdet numeroiden tilalle merkkaamaan keskiarvoa
    */
    reviewersToShow = prune(
        reviewersToShow, 
        state.currentPage, 
        state.itemsPerPage,
        'starsAverage', 
        'visualizedStars'
    )

   let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        numberOfReviews: newNumberOfReviews,
        paginationLinks: paginationLinks,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: reviewersToShow
    }

}

/*
 * Hakutermin muutos
 */
const setSearchSettings = (state, data) => {

    let searchStr = data.str;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let reviewersToShow = getFilteredItemsList(
        state.data,
        searchStr, 
        state.sortingField, 
        state.sortingOrder, 
        state.numberOfReviews.value
    )

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    let newCurrentPage = 1;

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon &
     * vaihdetaan tähdet numeroiden tilalle merkkaamaan keskiarvoa
     */
    reviewersToShow = prune(
        reviewersToShow, 
        newCurrentPage, 
        state.itemsPerPage,
        'starsAverage', 
        'visualizedStars'
    )

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

    /*
     *
     */
    let reviewersToShow = getFilteredItemsList(
        state.data,
        state.search, 
        newField, 
        newOrder, 
        state.numberOfReviews.value
    )

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = reviewersToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    
    let newCurrentPage = 1;

    // Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    //reviewersToShow = getVisibleItems(reviewersToShow, newCurrentPage, state.itemsPerPage);
    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon &
     * vaihdetaan tähdet numeroiden tilalle merkkaamaan keskiarvoa
     */
    reviewersToShow = prune(
        reviewersToShow, 
        newCurrentPage, 
        state.itemsPerPage,
        'starsAverage', 
        'visualizedStars'
    )    

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
                data: revierListMockData
            })

        }, 2000)

    }

}

export const loadData = () => {

    return async dispatch => {

        dispatch({
            type: 'REVIEWERLIST_LOADING_START'
        })

        const reviewers = await reviewerService.getGeneralListing();

        dispatch({
            type: 'REVIEWERLIST_INITIALIZED',
            data: reviewers
        })

    }

}

/*
 * Päivitetään arvoa kuinka monta arvostelua pitää vähintään olla,
 * jotta arvostelija huomioidaan nimilistassa
 */
export const updateMinNumbOfReviews = (val) => {

    return dispatch => {

        dispatch({
            type: 'REVIEWERLIST_UPDATE_NUMB_OF_REVIEWS',
            data: {
                value: val
            }
        })

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


        case 'REVIEWERLIST_UPDATE_NUMB_OF_REVIEWS':

            return setMinNumberOfReviews(state, action.data);

        case 'REVIEWERLIST_UPDATE_SEARCH':

            return setSearchSettings(state, action.data);


        case 'REVIEWERLIST_UPDATE_SORTING':

            return setSortingSettings(state, action.data);

        default:
            return state

    }    
}

export default reviewersListReducer;