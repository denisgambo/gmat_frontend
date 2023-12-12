import axios from "axios";

const API_URL = "http://159.89.166.117:3000/user"; // URL de base
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

async function getAllUser() {
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

async function createUser(user) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}/sinup`, user, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateUser(id, user) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(`${API_URL}/modifier/${id}`, user, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function supprimerUtilisateur(id) {
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

// Fonction pour bloquer ou débloquer un utilisateur
async function autorisation(id, autoriser) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/autorisation`,
      {
        id,
        autoriser,
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

async function getUserById(id) {
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

async function updatePassword(passwordUpdateData) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/updatepassword`,
      passwordUpdateData,
      {
        headers: headers,
      }
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  getAllUser,
  createUser,
  supprimerUtilisateur,
  autorisation,
  getUserById,
  updatePassword,
  updateUser,
};
