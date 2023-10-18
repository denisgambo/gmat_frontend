<template>
    <div class="">
        <form @submit.prevent="modifMaintenancier(maintenancier)">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input v-model="maintenancier.nom" type="text" class="form-control" id="nom" aria-describedby="nom">
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input v-model="maintenancier.prenom" type="prenom" class="form-control" id="prenom">
            </div>
            <div class="mb-3">
                <div class="form-group">
                    <label for="role">Genre :</label>
                    <input v-model="maintenancier.genre" type="radio" name="genre" value="homme" checked>Homme
                    <input v-model="maintenancier.genre" type="radio" name="genre" value="femme">Femme
                </div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email </label>
                <input v-model="maintenancier.email" type="email" class="form-control" id="email"
                    placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Telephone </label>
                <input v-model="maintenancier.telephone" type="text" class="form-control" id="telephone"
                    placeholder="67908638">
            </div>

            <button type="submit" class="btn btn-primary">Modifier</button>
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