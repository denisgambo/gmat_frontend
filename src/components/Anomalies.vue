<template>
    <div class="">
        <div class="lis_btn">
            <button class="btn btn-success" @click="changeDisplay(1)">Ajouter une anomalie</button>
            <button @click="changeDisplay(2)" class="btn btn-success"> Liste des anomalies</button>
        </div>

        <div class="list_animalies" v-if="display_list_anomalies">
            <table border="1" class="table">
                <thead>
                    <tr>
                        <th colspan="6">Liste des anomalies</th>
                    </tr>
                    <tr>
                        <th>Numéro</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(anomalie, index) in anomalies" :key="anomalie._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ anomalie.nom }}</td>
                        <td>{{ anomalie.description }}</td>
                        <td>
                            <button @click="removeAnomalie(anomalie._id)" type="button"
                                class="btn btn-danger">Supprimer</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <AjouterAnomalie v-if="display_anomalie_form" />

    </div>
</template>

<script>

import { getAllAnomalies, supprimerAnomalie } from '@/api/anomalie';
import AjouterAnomalie from './AjouterAnomalie.vue';
import Swal from 'sweetalert2';

export default {
    name: "Anomalies",
    components: {
        AjouterAnomalie
    },
    data() {
        return {
            anomalies: [],
            display_list_anomalies: false,
            display_anomalie_form: false
        }
    },

    async created() {
        this.anomalies = await getAllAnomalies()
        console.log(this.anomalies)
    },
    methods: {
        changeDisplay(entree) {
            if (entree == 1) {
                this.display_anomalie_form = true;
                this.display_list_anomalies = false;
            } else if (entree == 2) {
                this.display_anomalie_form = false;
                this.display_list_anomalies = true
            }
        },
        async removeAnomalie(id) {
            Swal.fire({
                title: "Supprimer l'anomalie ?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    try {
                        await supprimerAnomalie(id); // Attendre la suppression du service
                        Swal.fire({
                            title: 'Réussi',
                            text: 'anomalie supprimée avec succès',
                            icon: 'success',
                        });
                        this.anomalies = await getAllAnomalies();
                    } catch (error) {
                        Swal.fire({
                            title: 'Erreur',
                            text: 'Une erreur s\'est produite',
                            icon: 'error',
                        });
                        console.log(error);
                    }
                }
            });
        },
    }
}
</script>

<style scoped>
/* Tableau des utilisateurs */
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}

.lis_btn {
    /* display: flex; */
    width: 100%;
    /* position: fixed; */

}

.btn {
    margin: 20px;
}

.list_animalies {
    margin: 20px;
}
</style>