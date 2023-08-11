import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/anomalie';

//Toutes les anomalies
async function getAllAnomalies() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Créer une anomalies
async function createAnomalie(anomalie) {
    try {
        const response = await axios.post(`${API_URL}`, anomalie);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function supprimerAnomalie(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getAllAnomalies, createAnomalie, supprimerAnomalie };
