import axios from "axios";

const API_URL = "http://159.89.166.117:3000";

function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

async function supprimerCatEquipement(id) {
  try {
    const response = await axios.delete(`${API_URL}/supprimer/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getCategories() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/categorie`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getCats() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/categorie/tous`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getCatsCons() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/categorieconsommable/tous`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function ModifierCatEq(id, cat) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/categorie/modifier/${id}`,
      cat,
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
async function ModifierCatCons(id, cat) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/categorieconsommable/modifier/${id}`,
      cat,
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

async function getAllEquipements() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/equipement`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//equipements au rebut

async function getAllEquipementsAuRebut() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/equipement/au_rebut`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Nombre déquipements par catégorie

async function NombreEquipementByCat() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/equipement/nbrequipementbycat`,
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

//Nombre déquipements par catégorie

async function NombreEquipementByCatAndLoc() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/equipement/equipementswithcatandloc`,
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

async function NombreEquipementByCatAndLocIndispo() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/equipement/equipementindisponibles`,
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

async function getAllEquipementsWithCat() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/equipement/equipementswithcat`,
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
async function createCategorie(categorieData) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}/categorie`, categorieData, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getEquipementByCategorie(categorieId) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/equipement/equipementscategorie?categorieId=${categorieId}`,
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

async function getAllLocalite() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `http://159.89.166.117:3000/localisation`,
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

async function createEquipement(equipementData) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
  try {
    const response = await axios.post(
      "${API_URL}/equipement",
      equipementData,

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
// axios.put(`http://159.89.166.117:3000/equipement/${id}`
//Modifier un équipement
async function updateEquipement(id, equipementData) {
  const token = getToken();
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${API_URL}/equipement/${id}`,
      equipementData,
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
// Fonction pour mettre à jour la disponibilite
async function updateDisponibilite(id, disponibilite) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/equipement/updatedisponibilite`,
      {
        id,
        disponibilite,
      },
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

// supprimer un équipement
// supprimer un équipement
async function supprimerEquipement(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.delete(
      `${API_URL}/equipement/supprimer/${id}`,
      {
        headers: headers,
      }
    ); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getEquipementById(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: headers,
    }); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function supprimerCategorieEq(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.delete(
      `${API_URL}/categorie/supprimer/${id}`,
      {
        headers: headers,
      }
    ); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* async function supprimerCategoriCons(id) {
  try {
    const response = await axios.delete(`${API_URL}/supprimer/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
} */

export {
  getCategories,
  getEquipementByCategorie,
  getAllLocalite,
  createEquipement,
  createCategorie,
  getAllEquipements,
  getAllEquipementsWithCat,
  NombreEquipementByCat,
  NombreEquipementByCatAndLoc,
  NombreEquipementByCatAndLocIndispo,
  updateDisponibilite,
  supprimerEquipement,
  getEquipementById,
  updateEquipement,
  getCats,
  getCatsCons,
  ModifierCatEq,
  ModifierCatCons,
  getAllEquipementsAuRebut,
  supprimerCategorieEq,
};
