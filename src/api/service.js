import axios from 'axios';

const API_URL = 'http://159.89.166.117:3000/service';

//Tous les services
async function getAllServices() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Créer un service
async function createService(service) {
    try {
        const response = await axios.post(`${API_URL}`, service);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function ModifierService(id, service) {
    try {
        const response = await axios.put(`${API_URL}/modifier/${id}`, service);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function supprimerService(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getAllServices, createService, supprimerService, ModifierService };
