import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/fournisseur';

async function getAllFournisseur() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getAllFournisseur };
