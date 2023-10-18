import axios from 'axios';

const API_URL = 'http://159.89.166.117:3000/categorieconsommable';

async function getCategoriesConsommable() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Tous les consommables
async function getAllConsommables() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/consommable`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Tous les consommables
async function getConsommablesCritique() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/consommable/critique`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getConsommableByCategorie(categorieConsommableId) {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/consommable/consommablescategorie?categorieId=${categorieConsommableId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createConsommable(consommableData) {
    try {
        const response = await axios.post(`http://159.89.166.117:3000/consommable`, consommableData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createCategorieConsommable(categorieData) {
    try {
        const response = await axios.post(`http://159.89.166.117:3000/categorieconsommable`, categorieData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Selectionner un consommable par id
async function getConsommableById(id) {
  try {
    const response = await axios.get(`http://159.89.166.117:3000/consommable/select/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// supprimer un équipement
async function supprimerConsommable(id) {
  try {
    const response = await axios.delete(`http://159.89.166.117:3000/consommable/supprimer/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getEquipementById(id) {
  try {
    const response = await axios.get(`http://159.89.166.117:3000/equipement/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getCategoriesConsommable, getConsommableByCategorie, createConsommable, createCategorieConsommable, getAllConsommables, getConsommableById, supprimerConsommable,getConsommablesCritique };