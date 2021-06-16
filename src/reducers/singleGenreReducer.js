import genreService from '../services/genres';

import {
    round
} from "./utils"

const DEFAULT_COMP_GENRE = 'tyhja'

/*
 * 
 */
const initialState = {
    activeGenre: {id: null, data: null},             // Vertailtavana olevan kriitikon id-tunnus
    compCenre: {id: null, data: null},
    data: null,
    loading: false,
    maxNumbOfStars: -1
}

/*
 * Genrekohtainen elokuvien määrä on tiedossa. 
 * Lasketaan lisäksi montako arviointia kunkin genren elokuvat ovat yhteenä saaneet
 */
const countNumberOfReviews = (data) => {

    return data.map(d => {

        let sum = 0;

        d.values.forEach(e => {
            sum = sum + e.total;
        })

        return {
            ...d,
            nOfReviews: sum
        };
    })
}

/* 
 * Lasketaan kuinka monta kunkin tähtimäärän arvostelua vertailtavat muut genret olisivat
 * saaneet, jos niistä olisi yhtä monta arvostelua kuin aktiivisen genren elokuvista on.
 */
const scaleStars = (aGenre, data) => {

    let nOfReviewsA = aGenre.nOfReviews;

    return data.map(d => {

        let nOfReviews = d.nOfReviews
        // Ei vertailu -vaihtoehdolla ei ole yhtään arvostelua...
        let ratio = nOfReviews!==0?nOfReviewsA / nOfReviews:1

        let scaled = d.values.map(val => {
            return {
                ...val,
                total: round(ratio * val.total, 0)
            }
        })

        return {
            ...d,
            ratio: ratio,
            scaled: scaled
        }
    })

}

/*
 * Käydään kaikki (skaalatut) genret läpi ja etsitään suurin yksittäisen tähtimäärän
 * saama arvostelu
 */
const findMaxNumbOfRevs = (data) => {

    let max = 0;

    data.forEach(d => {

        d.scaled.forEach(val => {

            if(val.total > max)
                max = val.total

        })
    })

    return max;
}

/*
 *
 */
const displayGenreData = (state, data) => {

    let newActiveId = data.id;                // - vertailuun valitun kriitikon id-tunnus
    let newData = data.set;       // - kriitikon antamat arvosanat, mikäli ne luettiin palvelimelta

    // - lasketaan arvostelujen määrät per genre
    newData = countNumberOfReviews(newData);


    let activeGenreData = getGenre(newActiveId, newData);

    // - skaalataan annettujen tähtien määrät vastamaan aktiivisen genren tähtien määrää....
    newData = scaleStars(activeGenreData, newData)

    let maxNumbOfStars = findMaxNumbOfRevs(newData)

    // - haetaan vertailtava genre
    let compGenreData = getGenre(DEFAULT_COMP_GENRE, newData);

    return {
        ...state,
        activeGenre: {id: newActiveId, data: activeGenreData},
        compCenre: {id: DEFAULT_COMP_GENRE, data: compGenreData},
        data: newData,
        loading: false,
        maxNumbOfStars: maxNumbOfStars
    };
}


/*
 * Erotetaan aineistosta aktiivisen genren tietue
 */
const getGenre = (id, data) => {

    let a = data.filter(d => {
        return d.id == id
    })

    return a[0]
}

/*
 * Vaihdetaan vertailtavana oleva genre
 */
const setCompGenre = (state, data) => {

    let newCompId = data.id;
    let compGenreData = getGenre(newCompId, state.data)

    return {
        ...state,
        compCenre: {id: newCompId, data: compGenreData},
    }

}

/* 
 * A C T I O N S
 */ 
export const doSomeThing = (genreId) => {

    return (dispatch, state) => {

        dispatch({
            type: 'SINGLE_GENRE_LOADING_START',
            data: {}
        })

        setTimeout(() => {

            let data = [];
            
            dispatch({
                type: 'SINGLE_GENRE_LOADING_END',
                data: {
                    id: genreId,
                    set: data
                }
            })
        

        }, 1500)

    }

}

/*
 * Haetaan aktiivisen elokuvan tiedot palvelimelta
 */
export const initializeReviewer = (genreId) => {

    return async dispatch => {

        dispatch({
            type: 'SINGLE_GENRE_LOADING_START',
            data: {}
        })
        
        const genre = await genreService.getGenreData(genreId);
        
        dispatch({
            type: 'SINGLE_GENRE_LOADING_END',
            data: {
                id: genreId,
                set: genre
            }
        })
    }
}

/*
 * 
 */
export const updateCompGenre = (val) => {

    return dispatch => {

        dispatch({
            type: 'SINGLE_GENRE_UPDATE_COMP_GENRE',
            data: {
                id: val
            }
        })
    }
}


const singleGenreReducer = (state = initialState, action) => {

    switch(action.type){

        case 'SINGLE_GENRE_LOADING_START':
            return {
                ...state,
                loading: true
            }

        case 'SINGLE_GENRE_LOADING_END':

            return displayGenreData(state, action.data);

        case 'SINGLE_GENRE_UPDATE_COMP_GENRE':
            return setCompGenre(state, action.data);

        default:
          return state

    }    
}

export default singleGenreReducer;