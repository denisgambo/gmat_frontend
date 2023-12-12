import axios from "axios";

const API_URL = "http://159.89.166.117:3000/demande_achat";
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

//Toutes les anomalies
async function getAllDemande() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllLignesDemande() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/lignes_demandes`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Créer une anomalies
async function createDemande(demande) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}`, demande, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createLigneDemande(ligne) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}/lignedemande`, ligne, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* async function supprimerAnomalie(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
} */

/* async function ModifierAnnomalie(id, annomalie) {
    try {
        const response = await axios.put(`${API_URL}/modifier/${id}`, annomalie);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
} */

async function Validation(id, validation_status) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/validation`,
      {
        id,
        validation_status,
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

async function Traitement(id, validation_status) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/validation`,
      {
        id,
        validation_status,
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

export {
  createDemande,
  createLigneDemande,
  getAllDemande,
  getAllLignesDemande,
  Validation,
  Traitement,
};
