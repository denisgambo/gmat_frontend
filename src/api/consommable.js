import axios from "axios";

const API_URL = "http://159.89.166.117:3000/categorieconsommable";
const API_URL2 = "http://159.89.166.117:3000/consommable";
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

async function getCategoriesConsommable() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
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
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL2}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Tous les consommables
async function getConsommablesCritique() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL2}/critique`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getConsommableByCategorie(categorieConsommableId) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL2}/consommablescategorie?categorieId=${categorieConsommableId}`,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createConsommable(consommableData) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL2}`, consommableData, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createCategorieConsommable(categorieData) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}`, categorieData, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Selectionner un consommable par id
async function getConsommableById(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL2}/select/${id}`, {
      headers: headers,
    }); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// supprimer un équipement
async function supprimerConsommable(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.delete(`${API_URL2}/supprimer/${id}`, {
      headers: headers,
    }); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// async function getEquipementById(id) {
//   try {
//     const response = await axios.get(
//       `http://159.89.166.117:3000/equipement/${id}`
//     ); // Utiliser l'ID dans l'URL
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

async function supprimerCategoriCons(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.delete(`${API_URL}/supprimer/${id}`, {
      headers: headers,
    }); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  getCategoriesConsommable,
  getConsommableByCategorie,
  createConsommable,
  createCategorieConsommable,
  getAllConsommables,
  getConsommableById,
  supprimerConsommable,
  getConsommablesCritique,
  supprimerCategoriCons,
};
