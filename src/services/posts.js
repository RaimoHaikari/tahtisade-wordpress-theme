import axios from 'axios'

const baseUrl = 'http://localhost/hks/wp-json';

/* 
 * Haetaan kaikki uutiset
 */
const getAll = async () => {

    const response = await axios.get(`${baseUrl}/wp/v2/posts`)
    return response.data

}

export default {
    getAll
}