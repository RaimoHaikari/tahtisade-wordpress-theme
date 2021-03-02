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

const getHeaders = () => {
    return [
        { name: "Nimi", field: "name", sortable: true },
        { name: "Arvosteluja yht.", field: "numberOfReviews",  sortable: true},
        { name: "Keskiarvo", field: "averageOfReviews",  sortable: false}
    ];
}

/*
 *
 */
const getInitialMovieList = () => {
    return [
        {name: 'Elämää kuoleman jälkeen',id: 1,poster: 'elamaaKuolemanJalkeen.jpg', ensiIlta: '6.3.2020', stars: [4, 3, 3, 4, 3]},
        {name: 'Emma.',id: 2,poster: 'emma.jpg', ensiIlta: '6.3.2020', stars: [4, 3, 3]},
        {name: 'Bombshell',id: 3,poster: 'bombshell.jpg', ensiIlta: ',7.2.2020', stars: [3, 2, 3, 3, 3]},
        {name: 'Birds of Prey',id: 4,poster: 'birdsOfPrey.jpg', ensiIlta: '7.2.2020', stars: [2, 3, 2]},
        {name: 'A Hidden Life',id: 5,poster: 'aHiddenLife.jpg', ensiIlta: '7.2.2020', stars: [4, 4, 2, 4]},
        {name: 'La Belle Époque',id: 6,poster: 'laBelleEpoque.jpg', ensiIlta: '13.3.2020', stars: [3, 3, 3, 2, 4, 5]},
        {name: 'Weathering with You',id: 7,poster: 'weatheringWithYou.jpg', ensiIlta: '13.3.2020', stars: [3, 3, 4, 3, 4, 4, 4, 4]},
        {name: 'Aika jonka sain',id: 8,poster: 'aikaJonkaSain.jpg', ensiIlta: '13.3.2020', stars: [3, 2, 3, 2, 2, 3, 4, 1]},
        {name: 'Mr. Jones',id: 9,poster: 'mrJones.jpg', ensiIlta: '13.3.2020', stars: [4, 4, 4, 4, 3, 3, 4, 4]},
        {name: 'The Cave',id: 10,poster: 'theCave.jpg', ensiIlta: '12.3.2020', stars: [5]},
    ];
}

const initialState = {
    headers: getHeaders(),
    loading: false,
    ovies: getInitialMovieList().map(m => {
        return {
            ...m,
            numberOfReviews: m.stars.length, 
            averageOfReviews: (m.stars.length===0?0:round(average( m.stars),2)),
        };
    }),
    allTheMovies: [],
    visibleMovies: [],
    message: 'Aloitustervehdys',
    sortingField: '',
    sortingOrder: ''
}

/*
 * 
 */
const getPresentedMovieList = (allTheMovies, sortingField, sortingOrder) => {

    let computedMovies = allTheMovies;

    // Lajittelu
    if(sortingField){
        const reversed = sortingOrder === "asc" ? 1 : -1;

        computedMovies = computedMovies.sort((a,b) => {

            let val;

            switch (sortingField) {
                case "name":
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
 */ 
const setSortingSettings = (state, data)  => {

    let newField = data.field;
    let newOrder = ((newField === state.sortingField) && (state.sortingOrder === "asc")) ? "desc" : "asc";

    // - päivitetään kävijälle näytettävä elokuvalistaus
    let moviesToShow = getPresentedMovieList(state.allTheMovies, newField, newOrder);

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
const displayMovieList = (state) => {

    let moviesToShow = getPresentedMovieList(state.allTheMovies, state.sortingField, state.sortingOrder);

    return {
        ...state,
        message: "Sovellus alustettu",
        visibleMovies: moviesToShow
    };  

}

/*
 * Luetaan yhteenveto talleteuista elokuvatiedoista
 */
const loadMovies = (state) => {

    let movies =  getInitialMovieList().map(m => {
        return {
            ...m,
            numberOfReviews: m.stars.length, 
            averageOfReviews: (m.stars.length===0?0:round(average( m.stars),2)),
        };
    });

    return {
        ...state,
        allTheMovies: movies,
        message: "Alustus käynnissä...."
    };

}

/* 
 * A C T I O N S
 */ 
export const updateSortingSetting = (val) => {

    return dispatch => {

        dispatch({
            type: 'MOVIELIST_UPDATE_SORTING',
            data: val
        })
    }
}

export const init = (len = 2) => {

    return async (dispatch, state) => {

        // testaa onko ajastin käytössä
        let timerRunning = state().timer.running;
        let timerId = state().timer.id;

        /*
         * Keskeytetään käynnissä oleva ajastettu prosessi
         */
        if(timerRunning) {
            clearTimeout(timerId);
            dispatch({type: 'CLEAR'});
        } 

        dispatch({
            type: 'INITIALIZING'
        })

        let timeoutId = setTimeout(function() {

            dispatch({type: 'TIMER_CLEAR'});
            dispatch({type: 'INITIALIZED'});

        }, len * 1000);

        // kirjataan timerin käynnistys muistiin
        dispatch({
            type: 'TIMER_START',
            data: {
                id: timeoutId
            }
        })

    }


}



const movieListReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'MOVIELIST_UPDATE_SORTING':
            return setSortingSettings(state, action.data);

        case 'INITIALIZED':

            return displayMovieList(state);

         
        case 'INITIALIZING':

            return loadMovies(state);

        default:
            return state;
    }
}

export default movieListReducer;