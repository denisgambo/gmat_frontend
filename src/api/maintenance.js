import axios from "axios";

const API_URL = "http://159.89.166.117:3000/operationmaintenance";
function getToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
}

async function getAllMaintenance() {
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

async function getAllMaintenanceWithAgregation() {
  const token = getToken();
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(`${API_URL}/agregation2`, {
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getMaintenanceByEquipement(equipementId) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(
      `${API_URL}/agregationbyequipement`,
      equipementId,
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

async function createMaintenance(MaintenanceData) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(`${API_URL}`, MaintenanceData, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//Dernière maintenance
async function getLastMaintenance() {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${API_URL}/lastmaintenance`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateMaintenance(operationId, consommationId) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/update`,
      {
        operationId,
        consommationId,
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

async function AjouterDepense(maintenanceId, depense) {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.put(
      `${API_URL}/ajouter-depense/${maintenanceId}`,
      depense,
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
  getAllMaintenance,
  getAllMaintenanceWithAgregation,
  createMaintenance,
  getLastMaintenance,
  updateMaintenance,
  getMaintenanceByEquipement,
  AjouterDepense,
};
