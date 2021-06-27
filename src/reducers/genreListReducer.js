import React from 'react';

import TablePresentation from "../components/movieList/TablePresentation/generalTable"

import genresService from '../services/genres';

import {
    genreListMockData,
    getNumberOfPagesTotal,
    getPaginationLinks,
    getVisibleItems,
    round,
    SunburstMockData
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
    itemsPerPage: 25,
    loading: false,
    maxNumberOfPaginationLinks: 5,
    paginationLinks: [],   
    search: '',
    sunburst: {
        data: null,
        loading: false,
        width: 500,
        height: 500
    },
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

    let loadedGenreList  = data.genres;

    /*
     * averageOfReviews: (d.stars.length===0?0:round(average(d.stars),2))
     */
    loadedGenreList = loadedGenreList.map(g => {

        let productPage = `genres/${g.id}`;

        // starsAverage: (d.stars.length===0?0:round(average(d.stars),2))

        return {
            ...g,
            starsAverage: round(g.starsAverage,2),
            productPage: productPage,   // Linkki genren tiedot esittävälle sivulle
        }

    })

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
 * 
 */
const flattenGenres = (arr, names) => {

    let a = []

    arr.forEach(element => {

        let movie = element.movieId
        //let genre = element.genreId
        let name = element.name

        let b = a.findIndex(x => x.id === movie)

        if (b !== -1) {
            let nArr = a[b].genres.concat(name)

            a[b] = {
                ...a[b],
                genres: nArr
            }
            
        } else {

            a.push(
                {
                    id: movie,
                    genres: [name]
                }
            )

        }


    });

    return a;
}

const permutator = (inputArr) => {

    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
}

const addPermutations = (arr) => {

    let a = arr.map(m => {
        let permutations = permutator(m.genres);

        return {
            ...m,
            permutations: permutations
        }
    })

    return a
}

const compare = ( a, b ) => {

    if ( a.permutation < b.permutation ){
        return -1;
    }
    if ( a.permutation > b.permutation ){
        return 1;
    }
    return 0;
}

const extractDoubles = (arr) => {

    let unos = []
    let doubles = [];
    let triples = [];

    arr.forEach(elem => {

        if(elem.genres.length == 1){

            unos.push({
                parent: `lumiere`,
                permutation: `${elem.genres[0]}`,
                name: elem.genres[0]
            })
        }

        if(elem.genres.length == 2){

            elem.permutations.forEach(p => {

                doubles.push({
                    parent: `${p[0]}`,
                    permutation: `${p[0]}-${p[1]}`,
                    name: `${p[1]}`
                })

            })

        }

        if(elem.genres.length == 3){

            elem.permutations.forEach(p => {

                triples.push({
                    parent: `${p[0]}-${p[1]}`,
                    permutation: `${p[0]}-${p[1]}-${p[2]}`,
                    name: `${p[2]}`
                })

            })

        }
    })

    return {
        unos: unos,
        doubles: doubles.sort(compare),
        triples: triples.sort(compare)
    }

}

/*
 * 
 */
const countOccurances = (arr) => {

    let a = []

    arr.forEach(element => {

        let b = a.findIndex(x => x.permutation === element.permutation)


        if (b !== -1) {
            
            let newSize = a[b].size + 1

            a[b] = {
                ...element,
                size: newSize
            }
            
        } else {

            a.push(
                {
                    ...element,
                    size: 1
                }
            )

        }

    });

    return a;

}

/*
 * {parent: "lumiere", permutation: "8", size: 12}
 * {parent: "1", permutation: "1-8", size: 1}
 * 
 * let b = a.findIndex(x => x.permutation === element.permutation)
 */
const combineArray = (parent, child) => {

    child.forEach(element => {

        let b = parent.findIndex(x => x.permutation === element.parent)

        if (b !== -1) {
            let nArr;

            if(parent[b].children)
                nArr = parent[b].children.concat(element)
            else
                nArr = [element]

            let updatedObject = {
                ...parent[b],
                children: nArr
            }

            parent[b] = updatedObject
            
        } else {

            let x = element.parent.split("-")

            parent.push(
                {
                    parent: x.length > 1 ? x[0] : 'lumiere',
                    permutation: element.parent,
                    children: [element]
                }
            )

        }
    });

}


const displaySunburst = (state, data) => {

    console.log("............ sb ..............")
    console.log(data.sbData.instances)
    //console.log(data.sbData.names)

    let genreNames = data.sbData.names

    let flattened = flattenGenres(data.sbData.instances)
    let permutated = addPermutations(flattened)

    let {unos, doubles, triples} = extractDoubles(permutated)

    let unosTimes = countOccurances(unos)
    let doubleTimes = countOccurances(doubles)
    let tripleTimes = countOccurances(triples)
    

    combineArray(doubleTimes, tripleTimes)
    combineArray(unosTimes, doubleTimes)

    let fooBar = {
        name: "Genres", 
        children: unosTimes      
    }

    console.log(fooBar)
    console.log(SunburstMockData)


    let sunburstData = SunburstMockData

    return {
        ...state,
        sunburst: {
            ...state.sunburst,
            data: fooBar,
            loading: false
        },                
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
export const loadMockDataBAK = () => {

    return (dispatch, state) => {

        dispatch({
            type: 'GENRELIST_SUNBURST_LOADING_START'
        })

        setTimeout(() => {

            dispatch({
                type: 'GENRELIST_SUNBURST_INITIALIZED',
                data: {
                   sbData: SunburstMockData
                }
            })

        }, 1000)

    }

}

/*
 * Haetaan lajityyppien saamien arvostelujen yhteenvetotiedot palvelimelta
 */
export const loadMockData = (val) => {

    return async dispatch => {

        dispatch({
            type: 'GENRELIST_SUNBURST_LOADING_START'
        })
        
        const pairs = await genresService.getPermutations()

        dispatch({
            type: 'GENRELIST_SUNBURST_INITIALIZED',
            data: {
                sbData: pairs
            }
        })
    }
}




/*
 * Haetaan lajityyppien saamien arvostelujen yhteenvetotiedot palvelimelta
 */
export const initializeGenres = (val) => {

    return async dispatch => {

        dispatch({
            type: 'GENRELIST_LOADING_START',
            data: {}
        })
        
        const genres = await genresService.getGeneralListing()

        dispatch({
            type: 'GENRELIST_INITIALIZED',
            data: {
                genres: genres
            }
        })
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

        case 'GENRELIST_SUNBURST_INITIALIZED':
            return displaySunburst(state, action.data);

        case 'GENRELIST_SUNBURST_LOADING_START':
        
            return {
                ...state,
                sunburst: {
                    ...state.sunburst,
                    loading: true
                },                
            }

        case 'GENRELIST_UPDATE_SEARCH':
            return setSearchSettings(state, action.data);

        case 'GENRELIST_UPDATE_SORTING':
            return setSortingSettings(state, action.data);

        default:
          return state

    }    
}

export default genreListReducer;