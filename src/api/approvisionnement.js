import axios from "axios";
async function createApprovisionnement(donnes, user) {
    try {
        const response = await axios.post(`http://127.0.0.1:3000/approvisionnement`, donnes);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//dernier approvisionnement
async function getLastAppro() {
    try {
        const response = await axios.get(`http://127.0.0.1:3000/approvisionnement/last`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createLigneApprovisionnement(donnes) {
    try {
        const response = await axios.post(`http://127.0.0.1:3000/ligneapp`, donnes);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fonction pour mettre à jour la quantité en stock d'un consommable
async function updateStock(id, quantite, type) {
  try {
    const response = await axios.put(`http://127.0.0.1:3000/consommable/update`, { id, quantite, type });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


//historique approvisionnements
async function historiqueAppro() {
    try {
        const response = await axios.get(`http://127.0.0.1:3000/approvisionnement`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export{createApprovisionnement, getLastAppro, createLigneApprovisionnement, updateStock, historiqueAppro}