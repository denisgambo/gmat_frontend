import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/user';

async function getAllUser() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function createUser(user) {
    try {
        const response = await axios.post(`${API_URL}/sinup`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function supprimerUtilisateur(id) {
  try {
    const response = await axios.delete(`http://127.0.0.1:3000/user/supprimer/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Fonction pour bloquer ou débloquer un utilisateur
async function autorisation(id, autoriser) {
  try {
    const response = await axios.put(`http://127.0.0.1:3000/user/autorisation`, { id, autoriser });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/user/${id}`); // Utiliser l'ID dans l'URL
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


async function updatePassword(passwordUpdateData) {
    try {
        const response = await axios.put(`http://127.0.0.1:3000/user/updatepassword`, passwordUpdateData);
        return response.data.message;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export { getAllUser, createUser, supprimerUtilisateur, autorisation,getUserById, updatePassword };
