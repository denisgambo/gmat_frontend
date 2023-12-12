<template>
    <div class="container">
        <form @submit.prevent="AjouterJustification(nouvelle_justification)">

            <table border="1" class="justify-content-center">
                <thead>
                    <tr>
                        <th colspan="3">Ajouter une justication</th>
                    </tr>

                </thead>
                <tbody>


                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="inputNom" class="col-form-label">Titre</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <input v-model="nouvelle_justification.titre" type="text" id="inputNom" class="form-control"
                                    aria-describedby="nomHelpInline" required minlength="3">
                            </div>
                        </td>




                    </tr>



                    <tr class="">
                        <td class="">
                            <div class="col-auto">
                                <label for="inputDescription" class="col-form-label">Description</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <textarea v-model="nouvelle_justification.description" type="text" id="inputDescription"
                                    class="form-control" aria-describedby="descriptionHelpInline" minlength="10"
                                    required></textarea>
                            </div>
                        </td>

                    </tr>


                    <tr>
                        <td colspan="3" class="">
                            <div class="row g-3 align-items-center justify-content-around">
                                <div class="col-auto ">
                                    <button type="submit" class="btn btn-primary btn-lg ">Créer</button>
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
import { createJustification } from '@/api/justification';
import Swal from 'sweetalert2';

export default {
    name: "AjouterJustification",
    data() {
        return {
            nouvelle_justification: {
                titre: "",
                description: ""
            }
        }
    },
    methods: {
        async AjouterJustification(justification) {
            if (justification.titre.length <= 3) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ titre doit avoir au moins 3 caractères.',
                    icon: 'error',
                });
                return;
            }

            if (justification.description.length <= 10) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ decription doit avoir au moins 10 caractères.',
                    icon: 'error',
                });
                return;
            }

            try {
                const response = await createJustification(justification);
                Swal.fire({
                    title: 'Succès',
                    text: 'La justification a été créée avec succès.',
                    icon: 'success',
                });
                this.nouvelle_justification.titre = "";
                this.nouvelle_justification.description = "";
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de lajustication.',
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