import moviesService from '../services/movies';

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
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

/*
 * @todo: Pitäisikö lukea palvelimelta
 */
const getHeaders = () => {
    return [
        { name: "Nimi", field: "nimi", sortable: true },
        { name: "Arvosteluja yht.", field: "numberOfReviews",  sortable: true},
        { name: "Keskiarvo", field: "averageOfReviews",  sortable: false}
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
 * visibleMovies: Listalla esitettävät elokuvat. Mitä jää jäljelle, kun hakuehdot kohdistetaan elokuvalistaan.
 */
const initialState = {
    allTheMovies: [],
    currentPage: 3,
    headers: [],
    itemsPerPage: 4,
    loading: false,
    message: 'Aloitustervehdys',
    search: '',
    sortingField: '',
    sortingOrder: '',
    totalItems: 0, // näytettävien objektien kokonaismäärä
    visibleMovies: []
}

/*
 * Palvelimelta on haettu yhteenvetotiedot kaikista kantaan tallennetuista elokuvista.
 * Poimintaan näistä käyttäjälle esitettävät elokuvat. Valintaan vaikuttaa mm.:
 * - onko jotain suodatettu
 * - kuinka elokuvat halutaan lajitella
 */
const getPresentedMovieList = (allTheMovies, currentPage, itemsPerPage, search ,sortingField, sortingOrder) => {

    let computedMovies = allTheMovies;

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


    return computedMovies.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
    );
    


    //return computedMovies;

}

/*
 * R E A C T I O N S   T O W A R D S    A C T I O N S
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
        state.sortingOrder
    );

    return {
        ...state,
        search: searchStr,
        totalItems: moviesToShow.length,
        visibleMovies: moviesToShow
    }
}

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
        newOrder
    );

    return {
        ...state,
        sortingField: newField,
        sortingOrder: newOrder,
        visibleMovies: moviesToShow 
    }
}

/*
 * Suodatetaan kaikki elokuvat sisältävästä listasta kävijälle näytettävät elokuvat
 * - missä järjestyksessä elokuvat listataan
 */
const displayMovieList = (state, data) => {

    let loadedMovieList = data.map(d => {

        return {
            ...d,
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
        state.sortingOrder
    );

    return {
        ...state,
        allTheMovies: loadedMovieList,
        headers: getHeaders(),
        message: "Sovellus alustettu",
        totalItems: moviesToShow.length,
        visibleMovies: moviesToShow
    };  

}

/* 
 * A C T I O N S
 */ 
export const updateSearchSetting = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_UPDATE_SEARCH',
            data: val
        })
    }
}

export const updateSortingSetting = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_UPDATE_SORTING',
            data: val
        })
    }
}

export const initializeMovies = () => {

    return async dispatch => {
        const movies =  await moviesService.getGeneralListing();

        dispatch({
            type: 'INITIALIZED',
            data: movies
        })
    }
}

const movieListReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'MOVIELIST_UPDATE_SORTING':
            return setSortingSettings(state, action.data);

        case 'INITIALIZED':
            return displayMovieList(state, action.data);

        case 'MOVIELIST_UPDATE_SEARCH':
            return setSearchSettings(state, action.data);

        default:
            return state;
    }
}

export default movieListReducer;