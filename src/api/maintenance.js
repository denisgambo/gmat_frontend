import axios from 'axios';

const API_URL = 'http://159.89.166.117:3000/operationmaintenance';

async function getAllMaintenance() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllMaintenanceWithAgregation() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/operationmaintenance/agregation2`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getMaintenanceByEquipement(equipementId) {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/operationmaintenance/agregationbyequipement`, equipementId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createMaintenance(MaintenanceData) {
    try {
        const response = await axios.post(`http://159.89.166.117:3000/operationmaintenance`, MaintenanceData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//Dernière maintenance
async function getLastMaintenance() {
    try {
        const response = await axios.get(`http://159.89.166.117:3000/operationmaintenance/lastmaintenance`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateMaintenance(operationId, consommationId) {
  try {
    const response = await axios.put(
      `http://159.89.166.117:3000/operationmaintenance/update`,
      { operationId, consommationId }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function AjouterDepense(maintenanceId, depense) {
    try {
const response = await axios.put(`http://159.89.166.117:3000/operationmaintenance/ajouter-depense/${maintenanceId}`, depense);
 return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}






export { getAllMaintenance, getAllMaintenanceWithAgregation, createMaintenance, getLastMaintenance, updateMaintenance, getMaintenanceByEquipement, AjouterDepense };