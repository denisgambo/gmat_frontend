import axios from 'axios';

const API_URL = 'http://159.89.166.117:3000/categorie';
const API_URL2 = 'http://159.89.166.117:3000/categorieconsommable';


async function getCategories() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCats() {
    try {
        const response = await axios.get(`${API_URL}/tous`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCatsCons() {
    try {
        const response = await axios.get(`${API_URL2}/tous`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function ModifierCatEq(id, cat) {
    try {
        const response = await axios.put(`${API_URL}/modifier/${id}`, cat);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function ModifierCatCons(id, cat) {
    try {
        const response = await axios.put(`${API_URL2}/modifier/${id}`, cat);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllEquipements() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/equipement`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


//Nombre déquipements par catégorie

async function NombreEquipementByCat() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/equipement/nbrequipementbycat`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Nombre déquipements par catégorie

async function NombreEquipementByCatAndLoc() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/equipement/equipementswithcatandloc`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function NombreEquipementByCatAndLocIndispo() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/equipement/equipementindisponibles`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllEquipementsWithCat() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/equipement/equipementswithcat`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function createCategorie(categorieData) {
    try {
        const response = await axios.post(`${API_URL}`, categorieData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getEquipementByCategorie(categorieId) {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/equipement/equipementscategorie?categorieId=${categorieId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllLocalite() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/localisation`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createEquipement(equipementData) {
    try {
        const response = await axios.post('http://159.89.166.117:3000/equipement', equipementData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// axios.put(`http://159.89.166.117:3000/equipement/${id}`
//Modifier un équipement
async function updateEquipement(id, equipementData) {
    try {
const response = await axios.put(`http://159.89.166.117:3000/equipement/${id}`, equipementData, { headers: { 'Content-Type': 'multipart/form-data' } });
 return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// Fonction pour mettre à jour la disponibilite
async function updateDisponibilite(id, disponibilite) {
  try {
    const response = await axios.put(`http://159.89.166.117:3000/equipement/updatedisponibilite`, { id, disponibilite });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// supprimer un équipement
// supprimer un équipement
async function supprimerEquipement(id) {
  try {
    const response = await axios.delete(`http://159.89.166.117:3000/equipement/supprimer/${id}`); // Utiliser l'ID dans l'URL
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



export { getCategories, getEquipementByCategorie, getAllLocalite, createEquipement, createCategorie, getAllEquipements, getAllEquipementsWithCat, NombreEquipementByCat,NombreEquipementByCatAndLoc, NombreEquipementByCatAndLocIndispo , updateDisponibilite, supprimerEquipement, getEquipementById, updateEquipement,getCats, getCatsCons, ModifierCatEq, ModifierCatCons};