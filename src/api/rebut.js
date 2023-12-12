import axios from "axios";

const API_URL = "http://159.89.166.117:3000/rebut";
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

//Toutes les mises au rebut
async function getAllRebuts() {
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

//Créer une mise au rebut
async function createRebut(rebut) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}`, rebut, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getAllRebuts, createRebut };
