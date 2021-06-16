import axios from 'axios'

const baseUrl = 'http://localhost/tahtisade/wp-json';

/* 
 * Haetaan genret listaavalla sivulla esitettävät yhteenvetotiedot
 *
 * http://localhost/tahtisade/wp-json/rmt/v1/genres?include=general
 */
const getGeneralListing = async () => {

    const response = await axios.get(`${baseUrl}/rmt/v1/genres?include=general`);
    return response.data

}


/* 
 * Haetaan yksittäisen genren perustiedot palvelimelta
 *
 * http://localhost/tahtisade/wp-json/rmt/v1/genres/8
 */
const getGenreData = async (id) => {

    const response = await axios.get(`${baseUrl}/rmt/v1/genres/${id}`);
    return response.data

}


export default {
    getGeneralListing,
    getGenreData
}