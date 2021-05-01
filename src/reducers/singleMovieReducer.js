import React from 'react';

import moviesService from "../services/movies"

import {SingleMovieMockData} from "./utils";

import componentsService from '../components/singleMovie/ReviewsTable/';

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
 *{
criticId: "janneKaakko",
movieId: "2",
stars: "4.0",
link: "Aamulehti 6.3.2020",
publisher: "Aamulehti",
name: "Janne Kaakko"
},
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "name", sortable: true, searchable: false},
        { name: "Lähde", field: "link", sortable: false, searchable: false},
        { name: "Tähtiä", field: "stars", sortable: true, searchable: false}
    ];
}

const getMoreInfoLinks = (data) => {

    const externalLinks = [];

    if(data.imdb.length > 0) {
        externalLinks.push({
            name: 'imdb',
            link: `https://www.imdb.com/title/${data.imdb}/`,
            bgColor: 'black',
            color: 'white'
        })
    }

    if(data.kavi.length > 0){
        externalLinks.push({
            name: 'elonet',
            link: `https://elonet.finna.fi/Record/${data.kavi}`,
            bgColor: '#b90000',
            color: 'white'
        })       
    }

    return externalLinks;
}


/*
 * Lajitellaan arvostelulista 
 */
const getPresentedReviewsList = (allTheGenres,  sortingField, sortingOrder) => {

    let computedList = allTheGenres;
    const reversed = sortingOrder === "asc" ? 1 : -1;

    computedList = computedList.sort((a,b) => {

        let val;

        switch (sortingField) {
            case "name":

                let aName =  a[sortingField].split(" ");
                let bName = b[sortingField].split(" ");

                val = reversed * aName[aName.length-1].localeCompare(bName[bName.length-1])

                break;
            default:
                val =  reversed * ((a[sortingField] > b[sortingField]) ? 1 : (a[sortingField] < b[sortingField]) ? -1 : 0)
            }

        return(val)
    })

    
    
    return computedList;
}

/*
 * Muokataa yksittäisen arvostelun tiedoista taulukossa esitettävä versio,
 * jossa mm. tarvittaessa esitetän linkki alkuperäiseen arviointiin
 */
const getVisibleData = (data) => {

    let newData = data.map(d => {

        //let newName = <Title>{d.name}</Title>
        let newLink = validURL(d.link)
            ? componentsService.getSourceLink(d.publisher, d.link)
            : d.link;

        let newStars = componentsService.visualizeStars(d.stars)

        return {
            ...d,
            link: newLink,
            stars: newStars
        }
    });


    return newData;

}

/*
 *
 */
const displayMovieData = (state, data) => {

    let newData = data;

    // Käytetään samaa yleistaulukkoa, kuin erilaiset listat
    let reviews = getVisibleData(data.stars);


    let externalLinks = getMoreInfoLinks(newData);




    return {
        ...state,
        data: {
            ...newData,
            externalLinks: externalLinks
        },
        headers: getHeaders(),
        loading: false,
        visibleData: reviews
    };
}

/*
 * Päivitetään arvosteluluettelon esitys järjestystä
 */
const setSortingSettings = (state, data) => {

    let newField = data.field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    /*
     * Lajitellaan aineisto ja muokataan siitä taulukossa esitettävä versio
     */
    let reviews = getPresentedReviewsList(state.data.stars, newField, newOrder);
    reviews = getVisibleData(reviews);

    return {
        ...state,
        visibleData: reviews,
        sortingField: newField,
        sortingOrder: newOrder
    }
}

/*
 * Check if a JavaScript string is a URL
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 */
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}


/* 
 * A C T I O N S
 */ 
export const doSomeThing = (id) => {

    return (dispatch, state) => {

        dispatch({
            type: 'SINGLE_MOVIE_LOADING_START',
            data: {}
        })

        setTimeout(() => {

            let factSheet = SingleMovieMockData;

            dispatch({
                type: 'SINGLE_MOVIE_LOADING_END',
                data: factSheet
            })

        }, 500)

    }

}

/*
 * Haetaan aktiivisen elokuvan tiedot palvelimelta
 */
export const initializeMovie = (val) => {

    return async dispatch => {

        dispatch({
            type: 'SINGLE_MOVIE_LOADING_START',
            data: {}
        })

        const movie = await moviesService.getMovieDetails(val);
        
        dispatch({
            type: 'SINGLE_MOVIE_LOADING_END',
            data: movie
        })
    }
}

const singleMovieReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'SINGLE_MOVIE_LOADING_START':
            return {
                ...state,
                loading: true
            }

        case 'SINGLE_MOVIE_LOADING_END':
            return displayMovieData(state, action.data);

        case 'SINGLE_MOVIE_UPDATE_REVIEWS_SORTING':
            return setSortingSettings(state, action.data);

        default:
            return state;
    }
}

export default singleMovieReducer;