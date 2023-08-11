import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/justification';

//Toutes les justifications
async function getAllJustifications() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Créer une justification
async function createJustification(justification) {
    try {
        const response = await axios.post(`${API_URL}`, justification);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function supprimerJustification(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getAllJustifications, createJustification, supprimerJustification };
