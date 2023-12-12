<template>
    <div class="">


        <form @submit.prevent="AjouterMaintenancier(nouveau_maintenancier)">
            <table border="1" class="justify-content-center">
                <thead>
                    <tr>
                        <th colspan="2">Ajouter un opérateur de maintenance</th>
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
                                <input v-model="nouveau_maintenancier.nom" type="text" id="inputNom" class="form-control"
                                    aria-describedby="nomHelpInline" required minlength="3">
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="nom" class="form-label">Prénom</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <input v-model="nouveau_maintenancier.prenom" type="text" id="inputPrenom"
                                    class="form-control" required minlength="3">
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="email" class="form-label">Email</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <input v-model="nouveau_maintenancier.email" type="email" id="inputEmail"
                                    class="form-control" required minlength="3">
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
                                <input type="text" v-model="nouveau_maintenancier.telephone" id="inputTelephone"
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


                                <input v-model="nouveau_maintenancier.genre" type="radio" name="genre" value="homme"
                                    checked>Homme
                                <input v-model="nouveau_maintenancier.genre" type="radio" name="genre" value="femme">Femme
                            </div>
                        </td>

                    </tr>

                    <tr>
                        <td colspan="3" class="">
                            <div class="row g-3 align-items-center justify-content-around">
                                <div class="col-auto ">
                                    <button type="submit" class="btn btn-primary btn-lg ">Ajouter</button>
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
import { createMaintenancier } from '@/api/maintenancier';
import Swal from 'sweetalert2';

export default {
    name: "AjouterMaintenancier",
    data() {
        return {
            nouveau_maintenancier: {
                nom: "",
                prenom: "",
                telephone: "",
                email: "",
                genre: ""
            }
        }
    },
    methods: {
        async AjouterMaintenancier(maintenancier) {
            if (maintenancier.nom.length <= 3) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ nom doit avoir au moins 3 caractères.',
                    icon: 'error',
                });
                return;
            }

            try {
                const response = await createMaintenancier(maintenancier);
                Swal.fire({
                    title: 'Succès',
                    text: 'Le maintenancier a été créé avec succès.',
                    icon: 'success',
                });
                this.nouveau_maintenancier = {};

            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création du maintenancier.',
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