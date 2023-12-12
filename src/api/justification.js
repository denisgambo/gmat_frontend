import axios from "axios";

const API_URL = "http://159.89.166.117:3000/justification";

function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

//Toutes les justifications
async function getAllJustifications() {
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

//Créer une justification
async function createJustification(justification) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}`, justification, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function supprimerJustification(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: headers,
    }); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function ModifierJustification(id, justification) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/modifier/${id}`,
      justification,
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
  getAllJustifications,
  createJustification,
  supprimerJustification,
  ModifierJustification,
};
