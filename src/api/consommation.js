import axios from "axios";
//Dernière consommation
async function getLastConsommation() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/consommation/lastconsommation`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createConsommation(consommationData) {
    try {
        const response = await axios.post(`http://159.89.166.117:3000/consommation`, consommationData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getConsommationByConsommable(consommableId) {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/consommation/parconsommable?consommableId=${consommableId}`);

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getConsommationByEquipement(equipementId) {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/consommation/parequipement?equipementId=${equipementId}`);

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { getLastConsommation, createConsommation, getConsommationByConsommable, getConsommationByEquipement };