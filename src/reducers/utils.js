import React from 'react';

import {
    SiFirst,
    SiLastpass
} from "react-icons/si"

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

export const genreListMockData = [
    { genre: "Comedy",numberOfMovies: 22,numberOfReviews: 86,starsAverage: 3.0697674418604652 },
    { genre: "Drama", numberOfMovies: 31, numberOfReviews: 150,starsAverage: 3.3633333333333333 },
    { genre: "Romance", numberOfMovies: 3, numberOfReviews: 19, starsAverage: 3.5 },
    { genre: "Animation",numberOfMovies: 6,numberOfReviews: 20,starsAverage: 3 },
    { genre: "Family",numberOfMovies: 7,numberOfReviews: 28,starsAverage: 2.7857142857142856 },
    { genre: "Biography",numberOfMovies: 7,numberOfReviews: 30,starsAverage: 3.3333333333333335 },
    { genre: "Thriller",numberOfMovies: 3,numberOfReviews: 23,starsAverage: 4.086956521739131 },
    { genre: "History",numberOfMovies: 3,numberOfReviews: 3,starsAverage: 3.8333333333333335 },
    { genre: "Adventure",numberOfMovies: 7,numberOfReviews: 20,starsAverage: 2.7 },
    { genre: "Action", numberOfMovies: 5, numberOfReviews: 22, starsAverage: 2.409090909090909 },
    { genre: "Crime", numberOfMovies: 6, numberOfReviews: 32, starsAverage: 2.90625 },
    { genre: "Documentary", numberOfMovies: 4, numberOfReviews: 5, starsAverage: 4.1 },
    { genre: "War", numberOfMovies: 3, numberOfReviews: 17, starsAverage: 4 },
    { genre: "Sport", numberOfMovies: 1, numberOfReviews: 6, starsAverage: 3.3333333333333335 },
    { genre: "Horror", numberOfMovies: 4, numberOfReviews: 11, starsAverage: 2.909090909090909 },
    { genre: "Sci-Fi", numberOfMovies: 2, numberOfReviews: 8, starsAverage: 3.375 },
    { genre: "Mystery", numberOfMovies: 2, numberOfReviews: 5, starsAverage: 2.8 }
];


/*
 * Montako sivua tarvitaan, että kaikki objektit saadaa esitettyä, kun yhdelle sivulle 
 * mahtuu korkeintaan [itemsPerPage] objektia
 * 
 * Sivutukseen tarvittava tieto
 */
export const getNumberOfPagesTotal = (state, itemsTotal) => {

    //let pagesTotal = state.totalPages;
    let pagesTotal = 0;
    let itemsPerPage = state.itemsPerPage;

    if(itemsTotal > 0 && itemsPerPage > 0)
        pagesTotal = (Math.ceil(itemsTotal / itemsPerPage))

    return pagesTotal
}

/*
 * Sivutuslinkkien alustus
 * - selvitetään mitkä sivut on pitää näyttää tulostettavassa Pagination listauksessa
 * - muotoillaan linkit.
 */
export const getPaginationLinks = (currentPage, maxNumberOfPaginationLinks, totalPages) => {
    
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
 * Sivulla näytettävät objektit, kun sivutus otetaan huomioon.
 */
export const getVisibleItems = (itemsUpToLevel, currentPage, itemsPerPage) => {

    return itemsUpToLevel.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
    );

}