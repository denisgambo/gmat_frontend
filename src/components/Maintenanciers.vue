<template>
    <div class="bg-light">
        <h2>Gestion des opérateurs de maintenance</h2>
    </div>
    <div class="">
        <div class="lis_btn">
            <button class="btn btn-success" @click="changeDisplay(1)">Ajouter un maintenancier</button>
            <button @click="changeDisplay(2)" class="btn btn-success"> Liste des maintenanciers</button>
        </div>
        <div class="list_maintenancier" v-if="display_list_maintenancier">
            <table border="1">
                <thead>
                    <tr>
                        <th colspan="6">Liste des maintenanciers</th>
                    </tr>
                    <tr>
                        <th>Numéro</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(maintenancier, index) in maintenanciers" :key="maintenancier._id">
                        <td>{{ index + 1 }}</td>
                        <td class="nom">{{ maintenancier.nom }}</td>
                        <td class="nom">{{ maintenancier.prenom }}</td>
                        <td class="nom">{{ maintenancier.telephone }}</td>
                        <td class="nom">{{ maintenancier.email }}</td>
                        <td class="d-flex">
                            <button @click="modifier(maintenancier)" type="button"
                                class="btn btn-success btn1">Modifier</button>
                            <button @click="removeMaintenancier(maintenancier._id)" type="button"
                                class="btn btn-secondary btn1">Supprimer</button>

                        </td>

                    </tr>
                </tbody>
            </table>
        </div>

        <AjouterMaintenancier v-if="display_maintenancier_form" />
        <ModifierMaintenancier :maint="a_modifier" v-if="display_modif" />
    </div>
</template>

<script>

import AjouterMaintenancier from './AjouterMaintenancier.vue'
import ModifierMaintenancier from './ModifierMaintenancier.vue'
import { getAllMaintenanciers, supprimerMaintenancier } from '@/api/maintenancier'
import Swal from 'sweetalert2'
import { testAdminUser } from '/auth/auth-guard-admin'
export default {
    name: "Maintenancier",
    components: {
        AjouterMaintenancier,
        ModifierMaintenancier
    },
    data() {
        return {
            maintenanciers: "",
            display_maintenancier_form: false,
            display_list_maintenancier: true,
            display_modif: false,
            a_modifier: {}
        }
    },

    async created() {
        this.maintenanciers = await getAllMaintenanciers()
    },
    methods: {
        changeDisplay(entree) {
            if (entree == 1) {
                this.display_maintenancier_form = true;
                this.display_list_maintenancier = false;
                this.display_modif = false
            } else if (entree == 2) {
                this.display_maintenancier_form = false;
                this.display_list_maintenancier = true;
                this.display_modif = false
            } else if (entree == 3) {
                this.display_maintenancier_form = false;
                this.display_list_maintenancier = false;
                this.display_modif = true
            }
        },
        modifier(maintenancier) {
            this.a_modifier = maintenancier
            this.changeDisplay(3)
        },

        async removeMaintenancier(id) {
            if (!testAdminUser()) {
                Swal.fire({
                    title: 'Danger',
                    text: 'Vous n\'avez pas les droits nécéssaires pour réaliser cette action',
                    icon: 'error',
                });
            }
            Swal.fire({
                title: "Supprimer le maintenancier ?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    try {
                        await supprimerMaintenancier(id); // Attendre la suppression du service
                        Swal.fire({
                            title: 'Réussi',
                            text: 'maintenancier supprimé avec succès',
                            icon: 'success',
                        });
                        this.list_services = await getAllMaintenanciers();
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
    padding: 5px;
}

.nom {
    text-align: left;
    padding-left: 5px;
}

th {
    background-color: #f2f2f2;
}

.lis_btn {
    /* display: flex; */
    width: 100%;
    /* position: fixed; */

}

.btn1 {
    width: 100px;
}



.btn {
    margin: 10px;
}

.list_maintenancier {
    width: 90%;
    margin: 10px auto;
}
</style>