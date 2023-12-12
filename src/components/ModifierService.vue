<template>
    <div>


        <form @submit.prevent="ModifService(service_modifier)">
            <table border="1" class="justify-content-center">
                <thead>
                    <tr>
                        <th colspan="2">Modifier un service</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="col-auto">
                                <label for="nom" class="form-label">Nom du service</label>
                            </div>
                        </td>
                        <td>
                            <div class="col-auto">
                                <input v-model="service_modifier.nom" type="text" id="inputNom" class="form-control"
                                    aria-describedby="nomHelpInline" required minlength="3">
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
import { ModifierService } from '@/api/service'
import Swal from 'sweetalert2'
export default {
    name: "AjouterService",
    props: ["service"],
    data() {
        return {
            service_modifier: {

            }
        }
    },
    created() {
        this.service_modifier = this.service
        console.log(this.service_modifier)
    },
    methods: {
        async ModifService(service_modifier) {
            if (service_modifier.nom.length <= 2) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ nom doit avoir au moins 3 caractères.',
                    icon: 'error',
                });
                return;
            }

            try {
                const response = await ModifierService(service_modifier._id, service_modifier);
                Swal.fire({
                    title: 'Succès',
                    text: 'Le service a été modifié avec succès.',
                    icon: 'success',
                });
                this.service_modifier.nom = "";
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la modification du service.',
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
</style>