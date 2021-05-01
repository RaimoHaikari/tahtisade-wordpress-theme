import axios from 'axios'

const baseUrl = 'http://localhost/tahtisade/wp-json';

/* 
 * Haetaan elokuvat listaavalla sivulla esitettävät yhteenvetotiedot
 */
const getGeneralListing = async () => {

    const response = await axios.get(`${baseUrl}/rmt/v1/movies?include=general`);
    return response.data

}

/* 
 * Haetaan yksittäisen elokuvan tiedot palvelimelta
 *
 * http://localhost/tahtisade/wp-json/rmt/v1/movies/2
 */
const getMovieDetails = async (id) => {

    const response = await axios.get(`${baseUrl}/rmt/v1/movies/${id}`);
    return response.data

}

export default {
    getGeneralListing,
    getMovieDetails
}