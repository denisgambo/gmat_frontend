import axios from "axios";
const API_URL = "http://159.89.166.117:3000";
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}
async function createApprovisionnement(donnes) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}/approvisionnement`, donnes, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//dernier approvisionnement
async function getLastAppro() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/approvisionnement/last`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createLigneApprovisionnement(donnes) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}/ligneapp`, donnes, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Fonction pour mettre à jour la quantité en stock d'un consommable
async function updateStock(id, quantite, type) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/consommable/update`,
      {
        id,
        quantite,
        type,
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

//historique approvisionnements
async function historiqueAppro() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/approvisionnement`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export {
  createApprovisionnement,
  getLastAppro,
  createLigneApprovisionnement,
  updateStock,
  historiqueAppro,
};
