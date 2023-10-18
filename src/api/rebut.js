import axios from 'axios';

const API_URL = 'http://159.89.166.117:3000/rebut';

//Toutes les mises au rebut
async function getAllRebuts() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Créer une mise au rebut
async function createRebut(rebut) {
    try {
        const response = await axios.post(`${API_URL}`, rebut);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}






export { getAllRebuts, createRebut };
