import axios from 'axios'

const baseUrl = 'http://localhost/tahtisade/wp-json';

/* 
 * Haetaan elokuvat listaavalla sivulla esitettävät yhteenvetotiedot
 */
const getGeneralListing = async () => {

    const response = await axios.get(`${baseUrl}/rmt/v1/movies?include=general`);
    return response.data

}

export default {
    getGeneralListing
}