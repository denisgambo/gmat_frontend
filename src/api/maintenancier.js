import axios from 'axios';

const API_URL = 'http://159.89.166.117:3000/maintenancier';

//Tous les services
async function getAllMaintenanciers() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Créer un service
async function createMaintenancier(maintenancier) {
    try {
        const response = await axios.post(`${API_URL}`, maintenancier);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function supprimerMaintenancier(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function ModifierMaintenancier(id, maintenancier) {
    try {
        const response = await axios.put(`${API_URL}/modifier/${id}`, maintenancier);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getAllMaintenanciers, createMaintenancier, supprimerMaintenancier, ModifierMaintenancier };
