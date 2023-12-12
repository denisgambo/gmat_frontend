import axios from "axios";

const API_URL = "http://159.89.166.117:3000/fournisseur";
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

async function getAllFournisseur() {
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
    console.error(error);
    throw error;
  }
}

async function supprimerFournisseur(id) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: headers,
    });
    return response.data; // Vous pouvez retourner des données supprimées ou un message de confirmation si nécessaire
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function ModifierFournisseur(id, fournisseur) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(`${API_URL}/${id}`, fournisseur, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getAllFournisseur, supprimerFournisseur, ModifierFournisseur };
