<template>
    <div class="center">
        <div class="lis_btn">
            <button class="btn btn-success m-3" @click="changeDisplay(1)">Ajouter un service</button>
            <button @click="changeDisplay(2)" class="btn btn-success m-3"> Liste des services</button>
        </div>
        <div class="list_service" v-if="display_list_service">
            <table border="1">
                <thead>
                    <tr>
                        <th colspan="6">Liste des services</th>
                    </tr>
                    <tr>
                        <th>Numéro</th>
                        <th>Nom</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(service, index) in list_services" :key="service._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ service.nom }}</td>
                        <td>
                            <button @click="removeService(service._id)" type="button"
                                class="btn btn-danger">Supprimer</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>

        <AjouterService v-if="display_service_form" />


    </div>
</template>

<script>
import store from '@/store';

import { getAllServices, supprimerService } from '@/api/service';
import AjouterService from './AjouterService.vue';
import Swal from 'sweetalert2';
export default {
    name: "Service",
    components: {
        AjouterService
    },
    data() {
        return {
            list_services: "",
            display_list_service: false,
            display_service_form: false
        }
    },
    async created() {
        this.list_services = await getAllServices();
    },

    methods: {
        async removeService(id) {
            Swal.fire({
                title: "Supprimer le service ?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    try {
                        await supprimerService(id); // Attendre la suppression du service
                        Swal.fire({
                            title: 'Réussi',
                            text: 'Service supprimé avec succès',
                            icon: 'success',
                        });
                        this.list_services = await getAllServices();
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
        changeDisplay(entree) {
            if (entree == 1) {
                this.display_service_form = true;
                this.display_list_service = false;
            } else if (entree == 2) {
                this.display_service_form = false;
                this.display_list_service = true
            }
        }
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

.list_service {
    margin: 20px;
}
</style>