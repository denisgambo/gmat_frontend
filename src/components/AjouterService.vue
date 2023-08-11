<template>
    <table border="1">
        <thead>
            <tr>
                <th colspan="6">Ajouter un service</th>
            </tr>

        </thead>
        <tbody>
            <tr>

                <td>
                    <form @submit.prevent="AjouterService(nouveau_service)">
                        <!-- <h2>Créer un service</h2> -->
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Nom du service</label>
                            <input type="text" v-model="nouveau_service.nom" class="form-control" id="nom"
                                aria-describedby="Nom">
                            <div id="nom" class="form-text">Entrez le nom du service.</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </form>
                </td>


            </tr>
        </tbody>
    </table>
    <!--  <form @submit.prevent="AjouterService(nouveau_service)">
        <h2>Créer un service</h2>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Nom du service</label>
            <input type="text" v-model="nouveau_service.nom" class="form-control" id="nom" aria-describedby="Nom">
            <div id="nom" class="form-text">Entrez le nom du service.</div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form> -->
</template>

<script>
import { createService } from '@/api/service'
import Swal from 'sweetalert2'
export default {
    name: "AjouterService",
    data() {
        return {
            nouveau_service: {
                nom: ""
            }
        }
    },
    methods: {
        async AjouterService(service) {
            if (service.nom.length <= 2) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Le champ nom doit avoir au moins 3 caractères.',
                    icon: 'error',
                });
                return;
            }

            try {
                const response = await createService(service);
                Swal.fire({
                    title: 'Succès',
                    text: 'Le service a été créé avec succès.',
                    icon: 'success',
                });
                this.nouveau_service.nom = "";
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création du service.',
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