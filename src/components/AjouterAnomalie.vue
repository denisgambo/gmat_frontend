<template>
    <div class="container">
        <form @submit.prevent="AjouterAnomalie(nouvelle_anomalie)">

            <table border="1" class="justify-content-center">
                <thead>
                    <tr>
                        <th colspan="3">Ajouter une anomalie</th>
                    </tr>

                </thead>
                <tbody>

                    <div class="row g-3 align-items-center">
                        <tr>
                            <td>
                                <div class="col-auto">
                                    <label for="inputNom" class="col-form-label">Nom</label>
                                </div>
                            </td>
                            <td>
                                <div class="col-auto">
                                    <input v-model="nouvelle_anomalie.nom" type="text" id="inputNom" class="form-control"
                                        aria-describedby="nomHelpInline" required minlength="3">
                                </div>
                            </td>
                            <td>
                                <div class="col-auto">
                                    <span id="nomHelpInline" class="form-text">
                                        Doit comporter au moins 3 caractères.
                                    </span>
                                </div>
                            </td>
                            <!-- <td>
                                <div class="col-auto">
                                    <span id="nomHelpInline" class="form-text">
                                        Doit comporter au moins 3 caractères.
                                    </span>
                                </div>
                            </td -->


                        </tr>
                    </div>


                    <div class="row g-3 align-items-center">
                        <tr class="">
                            <td class="">
                                <div class="col-auto">
                                    <label for="inputDescription" class="col-form-label">Description</label>
                                </div>
                            </td>
                            <td>
                                <div class="col-auto">
                                    <input v-model="nouvelle_anomalie.description" type="text" id="inputDescription"
                                        class="form-control" aria-describedby="descriptionHelpInline" minlength="10"
                                        required>
                                </div>
                            </td>
                            <td>
                                <div class="col-auto">
                                    <span id="descriptionHelpInline" class="form-text">
                                        Doit comporter au moins 10 caractères.
                                    </span>
                                </div>
                            </td>
                        </tr>


                    </div>
                    <div class="row g-3 align-items-center ">
                        <tr>
                            <td colspan="3" class="">
                                <div class="row g-3 align-items-center justify-content-around">
                                    <div class="col-auto ">
                                        <button type="submit" class="btn btn-primary btn-lg ">Créer</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </div>

                </tbody>
            </table>



        </form>



    </div>
</template>

<script>
import { createAnomalie } from '@/api/anomalie';
import Swal from 'sweetalert2';

export default {
    name: "AjouterAnomalie",
    data() {
        return {
            nouvelle_anomalie: {
                nom: "",
                description: ""
            }
        }
    },
    methods: {
        async AjouterAnomalie(anomalie) {
            if (anomalie.nom.length <= 3) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ nom doit avoir au moins 3 caractères.',
                    icon: 'error',
                });
                return;
            }

            if (anomalie.description.length <= 10) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ decription doit avoir au moins 10 caractères.',
                    icon: 'error',
                });
                return;
            }

            try {
                const response = await createAnomalie(anomalie);
                Swal.fire({
                    title: 'Succès',
                    text: 'L\'anomalie a été créée avec succès.',
                    icon: 'success',
                });
                this.nouvelle_anomalie.nom = "";
                this.nouvelle_anomalie.description = "";
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de l\'anomalie.',
                    icon: 'error',
                });
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

.col-form-label {
    width: 100px;
}
</style>