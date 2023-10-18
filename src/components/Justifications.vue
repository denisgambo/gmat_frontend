<template>
    <div class="">
        <div class="lis_btn">
            <button class="btn btn-success" @click="changeDisplay(1)">Ajouter une justication</button>
            <button @click="changeDisplay(2)" class="btn btn-success"> Liste des justifications</button>
        </div>

        <div class="list_animalies" v-if="display_list_justifications">
            <table border="1" class="table">
                <thead>
                    <tr>
                        <th colspan="6">Liste des justifications</th>
                    </tr>
                    <tr>
                        <th>Numéro</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(justication, index) in justifications" :key="justication._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ justication.titre }}</td>
                        <td>{{ justication.description }}</td>
                        <td>
                            <button @click="removeJustification(justication._id)" type="button"
                                class="btn btn-danger">Supprimer</button>
                            <button @click="modifier(justication)" type="button" class="btn btn-secondary">Modifier</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <AjouterJustification v-if="display_justification_form" />
        <ModifierJustification :justif="a_modifier" v-if="display_mdofif" />

    </div>
</template>

<script>
import AjouterJustification from './AjouterJustification.vue';
import ModifierJustification from './ModifierJustification.vue';
import Swal from 'sweetalert2';
import { getAllJustifications, supprimerJustification } from '@/api/justification';

export default {
    name: "Justifications",
    components: {
        AjouterJustification,
        ModifierJustification
    },
    data() {
        return {
            justifications: [],
            a_modifier: {},
            display_list_justifications: true,
            display_justification_form: false,
            display_mdofif: false
        }
    },

    async created() {
        this.justifications = await getAllJustifications()
        console.log(this.justifications)
    },
    methods: {
        changeDisplay(entree) {
            if (entree == 1) {
                this.display_justification_form = true;
                this.display_list_justifications = false;
                this.display_mdofif = false
            } else if (entree == 2) {
                this.display_justification_form = false;
                this.display_list_justifications = true
                this.display_mdofif = false
            } else if (entree == 3) {
                this.display_justification_form = false;
                this.display_list_justifications = false
                this.display_mdofif = true
            }
        },
        modifier(justification) {
            this.a_modifier = justification
            this.changeDisplay(3)
        },
        async removeJustification(id) {
            Swal.fire({
                title: "Supprimer la justification ?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    try {
                        await supprimerJustification(id); // Attendre la suppression du service
                        Swal.fire({
                            title: 'Réussi',
                            text: 'justification supprimée avec succès',
                            icon: 'success',
                        });
                        this.anomalies = await getAllJustifications();
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