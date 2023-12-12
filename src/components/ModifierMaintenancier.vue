<template>
    <div>
        <form @submit.prevent="modifMaintenancier(maintenancier)">

            <table border="1" class="justify-content-center">
                <thead>
                    <tr>
                        <th colspan="3">Modifier un opérateur de maintenance</th>
                    </tr>

                </thead>
                <tbody>

                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="nom" class="form-label">Nom</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <input v-model="maintenancier.nom" type="text" id="inputNom" class="form-control"
                                    aria-describedby="nomHelpInline" required minlength="3">
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="inputNom" class="col-form-label">Prénom</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <textarea v-model="maintenancier.prenom" type="text" id="inputprenom" class="form-control"
                                    aria-describedby="nomHelpInline" required minlength="3"></textarea>
                            </div>
                        </td>

                    </tr>

                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="inputNom" class="col-form-label">Email</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <input type="text" v-model="maintenancier.email" id="inputEmail" class="form-control"
                                    required minlength="3">
                            </div>
                        </td>

                    </tr>


                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="inputTelephone" class="col-form-label">Téléphone</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <input type="text" v-model="maintenancier.telephone" id="inputTelephone"
                                    class="form-control" required minlength="3">
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="inputGenre" class="col-form-label">Genre</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">


                                <input v-model="maintenancier.genre" type="radio" name="genre" value="homme" checked>Homme
                                <input v-model="maintenancier.genre" type="radio" name="genre" value="femme">Femme
                            </div>
                        </td>

                    </tr>



                    <tr>
                        <td colspan="3" class="">
                            <div class="row g-3 align-items-center justify-content-around">
                                <div class="col-auto ">
                                    <button type="submit" class="btn btn-primary btn-lg ">Appliquer</button>
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>



        </form>
    </div>
</template>

<script>
import { ModifierMaintenancier } from '@/api/maintenancier';
import Swal from 'sweetalert2';

export default {
    name: "AjouterMaintenancier",
    props: ["maint"],
    data() {
        return {
            maintenancier: {

            }
        }
    },
    created() {
        this.maintenancier = this.maint
    },
    methods: {
        async modifMaintenancier(maintenancier) {
            console.log(maintenancier)
            if (maintenancier.nom.length <= 3) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ nom doit avoir au moins 3 caractères.',
                    icon: 'error',
                });
                return;
            }

            try {
                const response = await ModifierMaintenancier(maintenancier._id, maintenancier);
                Swal.fire({
                    title: 'Succès',
                    text: 'Le maintenancier a été modifié avec succès.',
                    icon: 'success',
                });
                this.maintenancier = {};

            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la modification du maintenancier.',
                    icon: 'error',
                });
            }
        }
    }
}
</script>

<style scoped>
form {
    width: 95%;
    margin: 10px auto;
    /* border: 1px blue solid; */
}



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
</style>