<template>
    <div class="">
        <form @submit.prevent="AjouterMaintenancier(nouveau_maintenancier)">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input v-model="nouveau_maintenancier.nom" type="text" class="form-control" id="nom" aria-describedby="nom">
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input v-model="nouveau_maintenancier.prenom" type="prenom" class="form-control" id="prenom">
            </div>
            <div class="mb-3">
                <div class="form-group">
                    <label for="role">Genre :</label>
                    <input v-model="nouveau_maintenancier.genre" type="radio" name="genre" value="homme" checked>Homme
                    <input v-model="nouveau_maintenancier.genre" type="radio" name="genre" value="femme">Femme
                </div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email </label>
                <input v-model="nouveau_maintenancier.email" type="email" class="form-control" id="email"
                    placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Telephone </label>
                <input v-model="nouveau_maintenancier.telephone" type="text" class="form-control" id="telephone"
                    placeholder="67908638">
            </div>

            <button type="submit" class="btn btn-primary">Ajouter</button>
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
    width: 100%;
    margin: 10px auto;
    border: 1px blue solid;
}

form {
    background-color: rgba(0, 0, 0, 0.5);
    /* Fond noir avec une opacité de 0.7 */
    padding: 20px;
    border-radius: 8px;
}
</style>