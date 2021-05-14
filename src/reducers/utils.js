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
["Action","Adventure","Animation","Biography","Comedy","Crime","Documentary","Drama","Family","History","Horror","Mystery","Romance","Sci-Fi","Sport","Thriller","War"]
*/
export const genreNamesMockData = [
    {name: "Action", id: 5, display: false},
    {name: "Adventure", id: 1, display: false},
    {name: "Animation", id: 12, display: false},
    {name: "Biography", id: 18, display: false},
    {name: "Comedy", id: 2, display: true},
]

export const genreNamesMockDataPPP = [
    {name: "Action", id: 5, display: true},
    {name: "Adventure", id: 1, display: true},
    {name: "Animation", id: 12, display: true},
    {name: "Biography", id: 18, display: true},
    {name: "Comedy", id: 2, display: true},
    {name: "Crime", id: 6, display: true},
    {name: "Documentary", id: 9, display: true},
    {name: "Drama", id: 8, display: true},
    {name: "Family", id: 4, display: true},
    {name: "Fantasy", id: 3, display: true},
    {name: "History", id: 17, display: true},
    {name: "Horror", id: 15, display: true},
    {name: "Mystery", id: 10, display: true},
    {name: "Music", id: 20, display: true},
    {name: "Romance", id: 11, display: true},
    {name: "Sci-Fi", id: 16, display: true},
    {name: "Sport", id: 21, display: true},
    {name: "Short", id: 23, display: true},
    {name: "News", id: 22, display: true},
    {name: "Thriller", id: 7, display: true},
    {name: "War", id: 19, display: true},
    {name: "Western", id: 13, display: true}
]

export const SingleReviwerMockData = {

    reviews:[
        {criticID:"kristerUggedal",googleID:6,stars:3,link:"Hufvudstadsbladet 13.3.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"La Belle Époque"},
        {criticID:"kristerUggedal",googleID:15,stars:5,link:"Hufvudstadsbladet 24.1.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Taistelulähetit - 1917"},
        {criticID:"kristerUggedal",googleID:17,stars:3,link:"Hufvudstadsbladet 24.1.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Just Mercy"},
        {criticID:"kristerUggedal",googleID:19,stars:1,link:"Hufvudstadsbladet 3.1.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Cats (2019)"},
        {criticID:"kristerUggedal",googleID:12,stars:4,link:"Hufvudstadsbladet 6.3.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Les Misérables"},
        {criticID:"kristerUggedal",googleID:1,stars:3,link:"Hufvudstadsbladet 6.3.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Elämää kuoleman jälkeen"},
        {criticID:"kristerUggedal",googleID:20,stars:3,link:"Hufvudstadsbladet 14.2.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"The Peanut Butter Falcon"},
        {criticID:"kristerUggedal",googleID:21,stars:3,link:"Hufvudstadsbladet 14.2.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Heinähattu, Vilttitossu ja ärhäkkä koululainen"},
        {criticID:"kristerUggedal",googleID:5,stars:2,link:"Hufvudstadsbladet 7.2.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"A Hidden Life"},
        {criticID:"kristerUggedal",googleID:24,stars:4,link:"Hufvudstadsbladet 3.1.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Lasse - Best Man"},
        {criticID:"kristerUggedal",googleID:25,stars:2,link:"Hufvudstadsbladet 3.1.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Teräsleidit"},
        {criticID:"kristerUggedal",googleID:27,stars:3,link:"Hufvudstadsbladet 6.3.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Eteenpäin"},
        {criticID:"kristerUggedal",googleID:30,stars:2,link:"Hufvudstadsbladet 21.2.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Koiranpäivät"},
        {criticID:"kristerUggedal",googleID:32,stars:3,link:"Hufvudstadsbladet 28.2.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Erämaan kutsu"},
        {criticID:"kristerUggedal",googleID:34,stars:3,link:"Hufvudstadsbladet 28.2.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"The Invisible Man"},
        {criticID:"kristerUggedal",googleID:35,stars:4,link:"Hufvudstadsbladet 28.2.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"The Specials"},
        {criticID:"kristerUggedal",googleID:40,stars:1,link:"Hufvudstadsbladet 17.1.2020",publisher:"Hufvudstadsbladet",name:"Krister Uggeldahl",elokuvanNimi:"Bad Boys for Life"}
    ],
    reviewerData:{
        name:"Krister Uggeldahl"
    },
    defCompSet:[
        {googleID:1,count:4,stars:3.5},
        {googleID:5,count:3,stars:4},
        {googleID:6,count:5,stars:3.4},
        {googleID:12,count:6,stars:3.67},
        {googleID:15,count:7,stars:4.14},
        {googleID:17,count:5,stars:3},
        {googleID:19,count:5,stars:2},
        {googleID:20,count:5,stars:3.4},
        {googleID:21,count:3,stars:3},
        {googleID:24,count:2,stars:2.5},
        {googleID:25,count:5,stars:2.8},
        {googleID:27,count:1,stars:4},
        {googleID:30,count:2,stars:1.5},
        {googleID:32,count:3,stars:3},
        {googleID:34,count:3,stars:3.33},
        {googleID:35,count:3,stars:3.33},
        {googleID:40,count:2,stars:1.5}
    ],
    reviewerWithShardItems:[
        {id:"muutKriitikot",count:17,name:"Muut yhteensä"},
        {id:"timoAlho",count:3,name:"Timo Alho"},
        {id:"avola",count:6,name:"Pertti Avola"},
        {id:"martaBalaga",count:1,name:"Marta Balaga"},
        {id:"pekkaEronen",count:5,name:"Pekka Eronen"},
        {id:"lauraHallamaa",count:1,name:"Laura Hallamaa"},
        {id:"jussiHuhtala",count:1,name:"Jussi Huhtala"},
        {id:"heikkiIkonen",count:2,name:"Heikki Ikonen"},
        {id:"janneKaakko",count:1,name:"Janne Kaakko"},
        {id:"riittaLehtimäki",count:1,name:"Riitta Lehtimäki"},
        {id:"vpLehtonen",count:1,name:"Veli-Pekka Lehtonen"},
        {id:"heini lehtosalo",count:1,name:"Heini Lehtosalo"},
        {id:"jarnoLindemark",count:5,name:"Jarno Lindemark"},
        {id:"eijaNiskanen",count:1,name:"Eija Niskanen"},
        {id:"jussiUPellonpää",count:4,name:"Jussi U. Pellonpää"},
        {id:"tr",count:2,name:"T R"},
        {id:"miskaRantanen",count:1,name:"Miska Rantanen"},
        {id:"hwRehnstöm",count:5,name:"Henri Waltter Rehnström"},
        {id:"kariSalminen",count:2,name:"Kari Salminen"},
        {id:"juhoTyppo",count:1,name:"Juho Typpö"},
        {id:"päiviValotie",count:8,name:"Päivi Valotie"},
        {id:"jouniVikman",count:1,name:"Jouni Vikman"},
        {id:"jussiVirratvuori",count:6,name:"Jussi Virratvuori"},
        {id:"leenaVirtanen",count:1,name:"Leena Virtanen"},
        {id:"sannaWirratvuori",count:2,name:"Sanna Wirtavuori"},
        {id:"tuomoYrittiaho",count:2,name:"Tuomo Yrittiaho"}
    ]
}


export const SingleMovieMockData = {
    googleID:2,
    nimi:"Emma.",
    wiki:"Q65091224",
    imdb:"tt9214832",
    kavi:"kavi.elonet_elokuva_1613316",
    img:"emma.jpg",
    ensiIlta:"2020-03-06T00:00:00.000Z",
    reviews:[
        {criticID:"janneKaakko",googleID:2,stars:4,link:"Aamulehti 6.3.2020",publisher:"Aamulehti",name:"Janne Kaakko"},
        {criticID:"päiviValotie",googleID:2,stars:3,link:"Turun Sanomat 6.3.2020",publisher:"Turun Sanomat",name:"Päivi Valotie"},
        {criticID:"jouniVikman",googleID:2,stars:3,link:"https://www.episodi.fi/elokuvat/emma/",publisher:"Episodi",name:"Jouni Vikman"}
    ],
    actors:[
        {googleID:2,nimi:"Anya Taylor-Joy",kaviID:"elonet_henkilo_1530190"},
        {googleID:2,nimi:"Johnny Flynn",kaviID:"elonet_henkilo_1514907"},
        {googleID:2,nimi:"Bill Nighy",kaviID:"elonet_henkilo_230286"},
        {googleID:2,nimi:"Mia Goth",kaviID:"elonet_henkilo_1530647"},
        {googleID:2,nimi:"Myra McFadyen",kaviID:"elonet_henkilo_1544788"},
        {googleID:2,nimi:"Josh O'Connor",kaviID:"elonet_henkilo_1532752"}
    ],directors:[
        {googleID:2,nimi:"Autumn de Wilde",kaviID:"elonet_henkilo_1544786"}
    ],distributors:[
        {googleID:2,nimi:"Finnkino Oy",kaviID:"elonet_yhtio_710434"}
    ],
    genres:[
        {googleID:2,genre:"Comedy"},{googleID:2,genre:"Drama"}
    ]};

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
 * Suodatuksen yleisversio
 * 
 * - haku kohdistuu ainoastaan nimeen
 */
export const getPresentedItemsList = (allTheItems, search ,sortingField, sortingOrder) => {

    let computedItems = allTheItems;

    /*
     * Haku
     * - kohdistuu nimeen
     */
    if(search) {

        computedItems = computedItems.filter(item => {

            return (
                item.name.toLowerCase().includes(search.toLowerCase()) 
            )

        })

    }

    /*
     * Lajittelu
     */
    if(sortingField){
        const reversed = sortingOrder === "asc" ? 1 : -1;

        computedItems = computedItems.sort((a,b) => {

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

    return computedItems;    
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

/*
 * Desimaalifunktion pyöristämisessä käyettävä apufunktio
 *
 * Lähde:
 * ---------------------------------------------------------------------------------------------
 * How do you round to 1 decimal place in Javascript?
 * https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
 */
export const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export const revierListMockData = [
    {id:"pekkaEronen",name:"Pekka Eronen","starsAverage":3,"numbOfRevies":9},
    {id:"janneKaakko",name:"Janne Kaakko","starsAverage":3.3333333333333335,"numbOfRevies":6},
    {id:"leenaVirtanen",name:"Leena Virtanen","starsAverage":3,"numbOfRevies":4},
    {id:"juhoTyppo",name:"Juho Typpö","starsAverage":2.8,"numbOfRevies":5},
    {id:"avola",name:"Pertti Avola","starsAverage":3,"numbOfRevies":12},
    {id:"kristerUggedal",name:"Krister Uggeldahl","starsAverage":2.8823529411764706,"numbOfRevies":17},
    {id:"päiviValotie",name:"Päivi Valotie","starsAverage":2.7142857142857144,"numbOfRevies":14},
    {id:"jarnoLindemark",name:"Jarno Lindemark","starsAverage":3.3333333333333335,"numbOfRevies":9},
    {id:"timoAlho",name:"Timo Alho","starsAverage":3.3636363636363638,"numbOfRevies":11},
    {id:"saraEH",name:"Sara Ehnholm Hielm","starsAverage":3.6666666666666665,"numbOfRevies":6},
    {id:"heikkiIkonen",name:"Heikki Ikonen","starsAverage":3.2222222222222223,"numbOfRevies":9},
    {id:"miskaRantanen",name:"Miska Rantanen","starsAverage":3.3333333333333335,"numbOfRevies":3},
    {id:"hwRehnstöm",name:"Henri Waltter Rehnström","starsAverage":3,"numbOfRevies":9},
    {id:"jussiUPellonpää",name:"Jussi U. Pellonpää","starsAverage":3.0833333333333335,"numbOfRevies":12},
    {id:"tr",name:"T R","starsAverage":3.25,"numbOfRevies":4},
    {id:"anttiSelkokari",name:"Antti Selkokari","starsAverage":3.6666666666666665,"numbOfRevies":3},
    {id:"kariSalminen",name:"Kari Salminen","starsAverage":3.1333333333333333,"numbOfRevies":15},
    {id:"aa",name:"A A","starsAverage":2.5,"numbOfRevies":2},
    {id:"riittaLehtimäki",name:"Riitta Lehtimäki","starsAverage":4.8,"numbOfRevies":5},
    {id:"vpLehtonen",name:"Veli-Pekka Lehtonen","starsAverage":3.5,"numbOfRevies":2},
    {id:"jussiVirratvuori",name:"Jussi Virratvuori","starsAverage":4,"numbOfRevies":10},
    {id:"hannaHyväri",name:"Hanna Hyväri","starsAverage":3,"numbOfRevies":1},
    {id:"tuomoYrittiaho",name:"Tuomo Yrittiaho","starsAverage":2.5,"numbOfRevies":4},
    {id:"martinaMolisMelberg",name:"Martina Moliis-Mellberg","starsAverage":2.75,"numbOfRevies":8},
    {id:"lauraHallamaa",name:"Laura Hallamaa","starsAverage":2,"numbOfRevies":1},
    {id:"sannaWirratvuori",name:"Sanna Wirtavuori","starsAverage":4,"numbOfRevies":4},
    {id:"heini lehtosalo",name:"Heini Lehtosalo","starsAverage":4,"numbOfRevies":3},
    {id:"riikkaOksanen",name:"Riikka Oksanen","starsAverage":4.5,"numbOfRevies":1},
    {id:"susannaKarhapää",name:"Susanna Karhapää","starsAverage":2,"numbOfRevies":1},
    {id:"olli-mattiOinonen",name:"Olli-Matti Oinonen","starsAverage":5,"numbOfRevies":1},
    {id:"sebastianGranskog",name:"Sebastian Granskog","starsAverage":4,"numbOfRevies":1},
    {id:"ek",name:"E K","starsAverage":4,"numbOfRevies":1},
    {id:"hannuLiekso",name:"Hannu Liekso","starsAverage":1,"numbOfRevies":1},
    {id:"jussiHuhtala",name:"Jussi Huhtala","starsAverage":3.5,"numbOfRevies":2},
    {id:"jesseRaatikainen",name:"Jesse Raatikainen","starsAverage":4,"numbOfRevies":1},
    {id:"jouniVikman",name:"Jouni Vikman","starsAverage":3.5,"numbOfRevies":2},
    {id:"martaBalaga",name:"Marta Balaga","starsAverage":2,"numbOfRevies":2},
    {id:"mariaLättilä",name:"Maria Lättilä","starsAverage":2,"numbOfRevies":2},
    {id:"eijaNiskanen",name:"Eija Niskanen","starsAverage":4.125,"numbOfRevies":4}
]