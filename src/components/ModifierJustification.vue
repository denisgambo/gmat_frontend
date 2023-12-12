<template>
    <div class="container">
        <form @submit.prevent="ModifJustification(justification)">

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
                                <input v-model="justification.titre" type="text" id="inputNom" class="form-control"
                                    aria-describedby="nomHelpInline" required minlength="3">
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="inputNom" class="col-form-label">Description</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <textarea v-model="justification.description" type="text" id="inputDescription"
                                    class="form-control" aria-describedby="nomHelpInline" required minlength="3"></textarea>
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
import { ModifierJustification } from '@/api/justification';
import Swal from 'sweetalert2';

export default {
    name: "ModifierJustification",
    props: ["justif"],
    data() {
        return {
            justification: ""
        }
    },
    created() {
        this.justification = this.justif
    },
    methods: {
        async ModifJustification(justification) {
            if (justification.titre.length <= 3) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ titre doit avoir au moins 3 caractères.',
                    icon: 'error',
                });
                return;
            }



            try {
                const response = await ModifierJustification(justification._id, justification);
                Swal.fire({
                    title: 'Succès',
                    text: 'La justification a été modifiée avec succès.',
                    icon: 'success',
                });
                this.justification.titre = "",
                    this.justification.description = ""
                this.$router.push({ name: 'parametre' });


            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la modification de lajustication.',
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