import axios from "axios";

const API_URL = "http://159.89.166.117:3000/service";
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

//Tous les services
async function getAllServices() {
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

//Créer un service
async function createService(service) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}`, service, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function ModifierService(id, service) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(`${API_URL}/modifier/${id}`, service, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function supprimerService(id) {
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

export { getAllServices, createService, supprimerService, ModifierService };
