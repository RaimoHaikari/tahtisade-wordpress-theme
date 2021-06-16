import axios from 'axios'

const baseUrl = 'http://localhost/tahtisade/wp-json';

/* 
 * Haetaan arvostelijat listaavalla sivulla esitettävät yhteenvetotiedot
 * 
 * http://localhost/tahtisade/wp-json/rmt/v1/reviewers?include=general
 */
const getGeneralListing = async () => {

    const response = await axios.get(`${baseUrl}/rmt/v1/reviewers?include=general`);
    return response.data

}


/* 
 * Haetaan yksittäisen arvostelijan perustiedot palvelimelta
 *
 * http://localhost/tahtisade/wp-json/rmt/v1/movies/2
 * http://localhost/tahtisade/wp-json/rmt/v1/reviewers/leenaVirtanen
 */
const getReviewerData = async (id) => {

    const response = await axios.get(`${baseUrl}/rmt/v1/reviewers/${id}`);
    return response.data

}

/*
 * Haetaan vertailuun valitun kriitikon arvostelut
 * -  samat elokuvat, jotka myös aktiivinen kriitikko on arvostellut
 */
const getColleagueData = async (id, compId) => {

    const response = await axios.get(`${baseUrl}/rmt/v1/reviewers/${id}?compId=${compId}`);
    return response.data

}

export default {
    getColleagueData,
    getGeneralListing,
    getReviewerData
}