import React from 'react';
import moviesService from '../services/movies';

import Card from "../components/movieList/Card";
import TablePresentation from "../components/movieList/TablePresentation/generalTable"

import {genreNamesMockData} from "./utils";

import {
    SiFirst,
    SiLastpass
} from "react-icons/si"


const DISPLAYTYPE = [

    {
        name: 'Taulukko',
        active: true,
        content: <TablePresentation store='movies' />
    },
    {
        name: 'Kuvakkeet',
        active: false,
        content: <Card />
    }

];

/*
 * Desimaalifunktion pyöristämisessä käyettävä apufunktio
 *
 * Lähde:
 * ---------------------------------------------------------------------------------------------
 * How do you round to 1 decimal place in Javascript?
 * https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
 */
const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

/*
 * Keskiarvon laskeva funktio
 *
 * Lähde:
 * 
 * How to compute the sum and average of elements in an array?
 * - https://stackoverflow.com/questions/10359907/how-to-compute-the-sum-and-average-of-elements-in-an-array
 */
const average = arr => arr.reduce( (p, c ) => p + c, 0 ) / arr.length;

/*
 * Huom!
 * 
 * Jotta yhteistä, lajiteltavaa taulukkoa voi käyttää, pitää reducerin tarjota tämän
 * tyyppinen headers -taulukko.
 * 
 * @todo: Pitäisikö lukea palvelimelta
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "nimi", sortable: true, searchable: true },
        { name: "Arvosteluja yht.", field: "numberOfReviews",  sortable: true, searchable: false},
        { name: "Keskiarvo", field: "averageOfReviews",  sortable: false, searchable: false}
    ];
}

/*
 * allTheMovies: Alkuperäinen, kaikki elokuvat sisältävä lista
 * currentPage: Aktiivinen sivu. Koska elokuvia on paljon, näytetään kerralla vain osa. 
 * headers: Taulukkomuotoisen elokuvaluettelon otsikkorivi.
 * itemsPerPage: Montako elokuvaa kerrallaan enintään näyetään.
 * loading: ollaanko lukemassa tietoja palvelimelta
 * message: suoritettavaan toimenpiteeseen liittyvä, käyttäjälle esitettävä viesti
 * search: Hakutermi. Tiettyä elokuvaa voi etsiä syöttämällä sen nimen. 
 * sortingField: Minkä kentän mukaan taulukkomuotoinen esitys lajitellaan
 * sortingOrder: Lajittelu järjestys
 * totalItems: Ehdot täyttävien elokuvien lkm mahdollinen hakuterminja/tai genre-rajauksen aiheuttama suodatus huomioidaan 
 * visibleData: Listalla esitettävät elokuvat. Mitä jää jäljelle, kun hakuehdot kohdistetaan elokuvalistaan.
 */
const initialState = {
    allTheMovies: null,
    currentPage: 1,
    displayTypes: DISPLAYTYPE,
    headers: [], // Huom! Pitää olla jotta tieto voidaan esittää taulukossa
    genreNames: null,
    genreNamesLoading: false,
    itemsPerPage: 25,
    moviesLoading: false,
    message: 'Aloitustervehdys',
    maxNumberOfPaginationLinks: 5,
    paginationLinks: [],
    search: '',
    sortingField: '',
    sortingOrder: '',
    totalItems: 0,  // näytettävien objektien kokonaismäärä
    totalPages: 0,  // kuinka monta sivua tarvitaan, kun kerralla näytetään itemsPerPage objektia sivulla
    visibleData: null
}


/*
 * Montako sivua tarvitaan, että kaikki objektit saadaa esitettyä, kun yhdelle sivulle 
 * mahtuu korkeintaan [itemsPerPage] objektia
 * Sivutukseen tarvittava tieto
 */
const getNumberOfPagesTotal = (state, itemsTotal) => {

    //let pagesTotal = state.totalPages;
    let pagesTotal = 0;
    let itemsPerPage = state.itemsPerPage;

    if(itemsTotal > 0 && itemsPerPage > 0)
        pagesTotal = (Math.ceil(itemsTotal / itemsPerPage))

    return pagesTotal
}

/*
 * @todo: Joskus palauttaa allTehMoviesin nullina
 */ 
const getActiveMovies = (allTheMovies, genreNames) => {

    /*
    console.log("...... getActiveMovies......")
    console.log(allTheMovies)
    console.log(genreNames)    
    console.log("............................")
    */

    const activeGenres = genreNames
        .filter(g => g.display === true)
        .map(g => g.id)

    const activeMovies = allTheMovies
        .filter((movie) => {
            const gList = movie.genre;
            const found = gList.some(g => activeGenres.indexOf(g) >= 0)

            return found
        })
    
    return activeMovies
}

/*
 * H A K U E H D O T  T Ä Y T T Ä V Ä T   E L O K U V A T
 * Palvelimelta on haettu yhteenvetotiedot kaikista kantaan tallennetuista elokuvista.
 * Poimintaan näistä käyttäjälle esitettävät elokuvat. Valintaan vaikuttaa mm.:
 * - onko jotain suodatettu
 * - kuinka elokuvat halutaan lajitella
 * 
 * Huom! Tässä vaiheessa ei vielä suoriteta sivutusta
 */
const getPresentedMovieList = (allTheMovies, currentPage, itemsPerPage, search ,sortingField, sortingOrder, genreNames) => {

    let computedMovies = allTheMovies;

    /*
     * Rajatus genremäärityksen perusteella
     * - käytössä vasta kun genreluettelo on ladattu
     */
    if(genreNames){
        computedMovies = getActiveMovies(computedMovies, genreNames) 
    }

    /*
     * Haku
     * - kohdistuu nimeen
     */
    if(search) {

        computedMovies = computedMovies.filter(item => {

            return (
                item.nimi.toLowerCase().includes(search.toLowerCase()) 
            )

        })

    }

    /*
     * Lajittelu
     */ 
    if(sortingField){
        const reversed = sortingOrder === "asc" ? 1 : -1;

        computedMovies = computedMovies.sort((a,b) => {

            let val;

            switch (sortingField) {
                case "nimi":
                  val = reversed * a[sortingField].localeCompare(b[sortingField])
                  break;
                default:
                    val =  reversed * ((a[sortingField] > b[sortingField]) ? 1 : (a[sortingField] < b[sortingField]) ? -1 : 0)
              }

            return(val)
        })
    }

    return computedMovies;

}

/*
 * R E A C T I O N S   T O W A R D S    A C T I O N S
 * 
 * Hakuehdon aiheuttamaan muutokseen reagointi:
 */
const setSearchSettings = (state, data) => {

    let searchStr = data.str;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies,
        state.currentPage, 
        state.itemsPerPage,
        searchStr, 
        state.sortingField, 
        state.sortingOrder,
        state.genreNames
    );

    /*
     * Resetoidaan currentPage
     */
    let newCurrentPage = 1;

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = moviesToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage)


    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        currentPage: newCurrentPage,
        search: searchStr,
        totalItems: itemsTotal,
        visibleData: moviesToShow,
        totalPages: pagesTotal,
        paginationLinks: paginationLinks
    }
}

/*
 * Asetetaan aktiivisen sivun sisältö.
 */
const setCurretPage = (state, data) => {

    let newCurrentPage = data.page;

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies, 
        newCurrentPage, 
        state.itemsPerPage,
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        state.genreNames
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = moviesToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: moviesToShow,
        paginationLinks: paginationLinks,
        currentPage: newCurrentPage
    };
}

/*
 * Asetetaan listaustyyppi
 *
 * Elokuvalistaus voidaan esittää joko taulukkomuodossa tai kuvakkeina.
 * 
 */
const setDisplayType = (state, data) => {

    let updatedTypes = state.displayTypes.map(type => {

        let newState = type.name === data.type?true:false;

        return {
            ...type,
            active: newState
        }
    })

    return {
        ...state,
        displayTypes: updatedTypes
    }

}

/*
 * Lajittelujärjestyksen muutos
 */
const setSortingSettings = (state, data)  => {

    let newField = data.field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies, 
        state.currentPage, 
        state.itemsPerPage,
        state.search, 
        newField, 
        newOrder,
        state.genreNames
    );

    let newCurrentPage = 1;

   /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, state.totalPages);

    return {
        ...state,
        sortingField: newField,
        sortingOrder: newOrder,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: moviesToShow 
    }
}

/*
 * Alustetaan listaus kantaan talletetuista genremäärityksistä
 */
const displayGenreList = (state, data) => {

    let newGenreNames = data

    let moviesToShow = getPresentedMovieList(
        state.allTheMovies,
        state.currentPage, 
        state.itemsPerPage, 
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        newGenreNames
    );


    let newCurrentPage = 1;

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = moviesToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

   /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        genreNames: newGenreNames,
        genreNamesLoading: false,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: moviesToShow 
    }
}

/*
 * Suodatetaan kaikki elokuvat sisältävästä listasta kävijälle näytettävät elokuvat
 * - missä järjestyksessä elokuvat listataan
 * 
 * @todo: Virhetilanteen käsittely puuttuupi
 */
const displayMovieList = (state, data) => {

    let loadedMovieList = data.map(d => {

        let genres = d.genre.map(g => g.genreId)

        return {
            ...d,
            genre: genres,
            numberOfReviews: d.stars.length,
            averageOfReviews: (d.stars.length===0?0:round(average(d.stars),2))
        }
    })

    let moviesToShow = getPresentedMovieList(
        loadedMovieList,
        state.currentPage, 
        state.itemsPerPage, 
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        state.genreNames
    );

    /*
     * Sivutukseen tarvittava tieto
     */
    let itemsTotal = moviesToShow.length;
    let pagesTotal = getNumberOfPagesTotal(state, itemsTotal);

    /*
     * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
     */
    moviesToShow = getVisibleMovies(moviesToShow, state.currentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(state.currentPage, state.maxNumberOfPaginationLinks, pagesTotal);

    return {
        ...state,
        allTheMovies: loadedMovieList,
        headers: getHeaders(),
        message: "Sovellus alustettu",
        paginationLinks: paginationLinks,
        totalItems: itemsTotal,
        totalPages: pagesTotal,
        visibleData: moviesToShow,
        moviesLoading: false
    };  

}

/*
 * Sivutuslinkkien alustus
 * - selvitetään mitkä sivut on pitää näyttää tulostettavassa Pagination listauksessa
 * - muotoillaan linkit.
 */
const getPaginationLinks = (currentPage, maxNumberOfPaginationLinks, totalPages) => {
    
    let indexes = getPaginationIndexes(currentPage, maxNumberOfPaginationLinks, totalPages);

    indexes = indexes.map((index,i) => {

        let linkLabel = index;
        let linkIindex = index;
        let linkClass = "numb";

        /*
         * Korjataan tarvittaessa ensimmäinen linkki osoittamaan ensimmäiselle sivulle
         */
        if((i) === 0){
            if(index > 1) {
                linkIindex = 1
                linkLabel = <SiFirst />
                linkClass = "btn prev"
            }
        }

        /*
         * Korjataan tarvittaessa viimeinen linkki osoittamaan viimeiselle sivulle
         */
        if((i+1) === maxNumberOfPaginationLinks){
            if(index < totalPages) {
                linkIindex = totalPages
                linkLabel = <SiLastpass />
                linkClass = "btn next"
            }
        }

        /* Aktiivisen sivun korostus */
        if(index === currentPage)
            linkClass="numb active"


        return {
            className: linkClass,
            index: linkIindex,
            label: linkLabel
        }
    })


    return indexes
}

/*
 * Lasketaan sivutuslinkeissä esitettävien sivut.
 * - linkkien muodostamisen ensimmäinen vaihe
 */
const getPaginationIndexes = (currentPage, maxNumberOfPaginationLinks, totalPages) => {

    let alaRaja = 1;
    let vasen = true;           // Onko "vasemmalla tilaa"
    let ylaRaja = totalPages;
    let oikea = true;           // Onko "oikealla tilaa"

    let i = 0;
    let j = 1;                  // Kytkin jonka avulla laskurin arvoa käännetään positivisen ja negatiivisen välillä
    let index = currentPage;

    let indexes = [];

    let valmis = false

    do {
        index = index + (i * j);

        // lisätään sivu, mikäli indeksi taulukon sisällä
        if((index >= alaRaja) && (index <= ylaRaja))
            indexes.push(index)

        /*
         * Onko taulukossa vielä pienempiä / suurempia indeksejä
         */
        if(index === alaRaja)
            vasen = false;

        if(index === ylaRaja)
            oikea = false;

        /*
         * Jatketaanko silmukkaa
         * - riittävä määrä sivuja kasassa
         */
        if(indexes.length === maxNumberOfPaginationLinks)
            valmis = true;
        

        /*
         * Sivulle mahtuu enemmän objekteja, kuin mitä kantaan on talletettu.
         * Ei siis tarvetta sivutukselle.
         * - numberOfItems > totalPages
         */
        if(vasen===false & oikea===false)
            valmis = true;

        // päivitetään laskurit
        j *= -1;
        i++;

    }
    while(valmis !== true)
    //while(i < maxNumberOfPaginationLinks && valmis !== true)

    return indexes.sort((a,b) => a - b);
}

/*
 * Muutetaan yksittäisen genren näkyvyyttä elokuvalistauksessa
 */
const setSingleGenreState = (state, data) => {

    // - genrelistauksen päivitys
    let newGenreNames = state.genreNames.map(g => {

        let newDisplay = g.display

        if(g.id === data){
            newDisplay = !newDisplay
        }

        return {
            ...g,
            display: newDisplay
        };
    })

    // elokuvalista vastaamaan genre-suodatusta
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies,
        state.currentPage, 
        state.itemsPerPage, 
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        newGenreNames
    );

    let newCurrentPage = 1;

   /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, state.totalPages);

    return {
        ...state,
        genreNames: newGenreNames,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: moviesToShow
    }
}

/*
 * Kytketään tai sammutetaan kaikki genrelistauksen objetit
 */
const toggleGenreList = (state, data) => {

    let newGenreNames = state.genreNames.map(g => {
        return {
            ...g,
            display: data
        }
    })


    // elokuvalista vastaamaan genre-suodatusta
    let moviesToShow = getPresentedMovieList(
        state.allTheMovies,
        state.currentPage, 
        state.itemsPerPage, 
        state.search, 
        state.sortingField, 
        state.sortingOrder,
        newGenreNames
    );

    let newCurrentPage = 1;

   /*
    * Suodatetaan sivulla näytettävät elokuvat, kun sivutus otetaan huomioon
    */
    moviesToShow = getVisibleMovies(moviesToShow, newCurrentPage, state.itemsPerPage)

    let paginationLinks = getPaginationLinks(newCurrentPage, state.maxNumberOfPaginationLinks, state.totalPages);

    return {
        ...state,
        genreNames: newGenreNames,
        currentPage: newCurrentPage,
        paginationLinks: paginationLinks,
        visibleData: moviesToShow
    }
}

/*
 * Sivulla näytettävät elokuvat, kun sivutus otetaan huomioon.
 */
const getVisibleMovies = (moviesUpToLevel, currentPage, itemsPerPage) => {

    return moviesUpToLevel.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
    );

}


/* 
 * A C T I O N S


        const movies = await moviesService.getGeneralListing();

        dispatch({
            type: 'INITIALIZED',
            data: movies
        })


 */ 
export const doSomeThing = () => {

    return (dispatch, state) => {

        dispatch({
            type: 'MOVIELIST_GENRENAMES_LOADING_START',
            data: {}
        })

        setTimeout(() => {

            let gNames = genreNamesMockData;

            dispatch({
                type: 'MOVIELIST_GENRENAMES_LOADING_END',
                data: gNames
            })

        }, 1000)

    }

}

/*
 * - kytke loading päälle
 * - hae elokuvat
 * - muokkaa vastaus tai totea virhe
 * - kytke loading off
 */
export const initializeMovies = () => {

    return async dispatch => {

        dispatch({
            type: 'LOADING_START',
            data: {}
        })

        const movies = await moviesService.getGeneralListing();

        dispatch({
            type: 'INITIALIZED',
            data: movies
        })
    }
}

/*
 * @tooo: voidaan poistaa 9.4.2021. Dispatchaus siirretty sharedReduceriin
 */
export const toggleGenres = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_TOGGLE_GENRES',
            data: val
        })
    }
}

/*
 * @todo: Voi poista, kun generalTabs on käytettävissä
 */
export const updateDisplayType = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_SET_DISPLAY_TYPE',
            data: val
        })
    }
}

/*
 * @todo: Voidaan poistaa, kun sharedReducer käytössä
 */
export const updateSearchSetting = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_UPDATE_SEARCH',
            data: val
        })
    }
}

/*
 * @tooo: voidaan poistaa 9.4.2021. Dispatchaus siirretty sharedReduceriin
 */
export const updateSortingSetting = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_UPDATE_SORTING',
            data: val
        })
    }
}

/*
 * @tooo: voidaan poistaa 9.4.2021. Dispatchaus siirretty sharedReduceriin
 */
export const updateSingleGenreVisibility = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_UPDATE_SINGLE_GENRE',
            data: val
        })
    }
}

const movieListReducer = (state = initialState, action) => {

    switch(action.type) {

        /*
         * dispatch tapahtuu sharedReducerissa
         */
        case 'MOVIELIST_UPDATE_SORTING':
            return setSortingSettings(state, action.data);

        case 'INITIALIZED':
            return displayMovieList(state, action.data);

        case 'MOVIELIST_UPDATE_SEARCH':
            return setSearchSettings(state, action.data);

        case 'MOVIELIST_UPDATE_SINGLE_GENRE':
            return setSingleGenreState(state, action.data);

        case 'MOVIELIST_SET_CURRENT_PAGE':
            return setCurretPage(state, action.data);

        case 'MOVIELIST_SET_DISPLAY_TYPE':
            return setDisplayType(state, action.data);

        case 'LOADING_START':

            return {
                ...state,
                moviesLoading: true
            }
    
        case 'MOVIELIST_GENRENAMES_LOADING_END':

            return displayGenreList(state, action.data);

        case 'MOVIELIST_GENRENAMES_LOADING_START':

            return {
                ...state,
                genreNamesLoading: true
            }

        case 'MOVIELIST_TOGGLE_GENRES':
            return toggleGenreList(state, action.data);

        default:
            return state;
        }
}

export default movieListReducer;