import axios from "axios";

const API_URL = "http://159.89.166.117:3000/entreprise";

async function getEntreprise() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUser(login, password) {
  try {
    const response = await axios.get("http://127.0.0.1:3000/user/login", {
      params: {
        login: login,
        mot_de_passe: password,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getEntreprise, getUser };
