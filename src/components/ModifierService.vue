<template>
    <table border="1">
        <thead>
            <tr>
                <th colspan="6">Modifer un service</th>
            </tr>

        </thead>
        <tbody>
            <tr>

                <td>
                    <form @submit.prevent="ModifService(service_modifier)">
                        <!-- <h2>Créer un service</h2> -->
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nom du service</label>
                            <input type="text" v-model="service_modifier.nom" class="form-control" id="nom"
                                aria-describedby="Nom">
                            <div id="nom" class="form-text">Entrez le nom du service.</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Modifier</button>
                    </form>
                </td>


            </tr>
        </tbody>
    </table>
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