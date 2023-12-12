import axios from "axios";
const API_URL = "http://159.89.166.117:3000";

function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}
//Dernière consommation
async function getLastConsommation() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/consommation/lastconsommation`,
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

async function createConsommation(consommationData) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      `${API_URL}/consommation`,
      consommationData,
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

async function getConsommationByConsommable(consommableId) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/consommation/parconsommable?consommableId=${consommableId}`,
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

async function getConsommationByEquipement(equipementId) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/consommation/parequipement?equipementId=${equipementId}`,
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
  getLastConsommation,
  createConsommation,
  getConsommationByConsommable,
  getConsommationByEquipement,
};
