import axios from 'axios';

axios.defaults.baseURL = "https://cors.io/?https://api.datamuse.com/";

const responseBody = (response) => response.data;

const requests = {
    get: (url) =>axios.get(url).then(responseBody)
}

const Words = {
    rhymeList: (word) => requests.get(`words?rel_rhy=${word}`),
    synonymList: (word) => requests.get(`words?ml=${word}`)
}

export default Words;