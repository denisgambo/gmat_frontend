const API_URL = 'http://159.89.166.117:3000/connexion';

import axios from "axios";
async function createConnexion(user) {
    try {
        const response = await axios.post(`${API_URL}/connexion`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createDeconnexion(user) {
    try {
        const response = await axios.post(`${API_URL}/deconnexion`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Toutes les justifications
async function getAllConnexion() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { createConnexion, createDeconnexion, getAllConnexion};
