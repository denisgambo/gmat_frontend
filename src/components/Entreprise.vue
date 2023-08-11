<template>
    <div class="lis_btn">
        <button class="btn btn-success" @click="changeDisplay(1)">Informations de l'entreprise</button>
        <button @click="changeDisplay(2)" class="btn btn-success"> Gérer les images</button>
    </div>
    <div class="form" v-if="display_entreprise_form">
        <h2>Les informations de l'entreprise</h2> <br>
        <form @submit.prevent="createFournisseur(entreprise._id)">
            <div class="form-group">
                <label for="nom">Nom de l'entreprise :</label>
                <input type="text" class="form-control" id="nom" v-model="entreprise.nom" required>
            </div>
            <div class="form-group">
                <label for="description">Slogan :</label>
                <textarea class="form-control" id="description" v-model="entreprise.slogan"></textarea>
            </div>
            <div class="form-group">
                <label for="telephone">Téléphone :</label>
                <input type="text" class="form-control" id="telephone" v-model="entreprise.telephone">
            </div>
            <div class="form-group">
                <label for="email">Email :</label>
                <input type="email" class="form-control" id="email" v-model="entreprise.email">
            </div>

            <div class="form-group">
                <label for="logo">Logo </label>
                <input type="file" class="form-control" name="logo" id="logo" @change="handleLogoChange">
            </div>
            <button type="submit" class="btn btn-primary m-3">Créer</button>
        </form>
    </div>
    <div class="images" v-if="display_background_form">
        <Images />
    </div>
</template>

<script>
import { getEntreprise } from '@/api/parametre';
import Images from './Images.vue'
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    components: {
        Images
    },
    data() {
        return {
            entreprise: {
                nom: '',
                slogan: '',
                telephone: '',
                email: '',
                logo: null, // Add a property to store the selected logo file
            },
            display_entreprise_form: true,
            display_background_form: false
        };
    },
    async created() {
        this.entreprise = await getEntreprise();
        // console.log(this.entreprise)
    },
    methods: {
        async createFournisseur(id) {
            try {
                const formData = new FormData(); // Create a new FormData object

                // Append form fields to the FormData object
                formData.append('nom', this.entreprise.nom);
                formData.append('slogan', this.entreprise.slogan);
                formData.append('telephone', this.entreprise.telephone);
                formData.append('email', this.entreprise.email);
                formData.append('logo', this.entreprise.logo); // Append the selected logo file

                const response = await axios.put(`http://127.0.0.1:3000/entreprise/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                });

                Swal.fire({
                    title: 'Succès',
                    text: 'les données ont été modifiées avec succès.',
                    icon: 'success',
                });

                console.log(response.data);
                // Réinitialiser le formulaire après la création réussie
                this.entreprise = {
                    nom: '',
                    slogan: '',
                    telephone: '',
                    email: '',
                    logo: null,
                };
                this.entreprise = await getEntreprise()
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produit.', error,
                    icon: 'error',
                });
            }
        },
        // Handle the logo selection and update the entreprise object
        handleLogoChange(event) {
            this.entreprise.logo = event.target.files[0];
        },

        changeDisplay(entree) {
            if (entree == 1) {
                this.display_entreprise_form = true;
                this.display_background_form = false;
            } else if (entree == 2) {
                this.display_entreprise_form = false;
                this.display_background_form = true
            }
        }
    },
};
</script>

<style scoped>
.form {
    background-color: rgba(0, 0, 0, 0.5);
    /* Fond noir avec une opacité de 0.7 */
    padding: 20px;
    border-radius: 8px;
}

.lis_btn {
    /* display: flex; */
    width: 100%;
    /* position: fixed; */

}

.btn {
    margin: 20px;
}

/* Ajoutez ici vos styles personnalisés si nécessaire */
</style>
