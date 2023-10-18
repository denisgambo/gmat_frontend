<template>
    <div class="accueil_background m-3">
        <form @submit.prevent="setAccueilBackground(entreprise._id)">
            <table>
                <thead>
                    <th colspan="2"><label for="background_image_accueil">Image de fond à l'accueil</label></th>
                </thead>

                <tbody>
                    <tr>
                        <td>

                            <div class="form-group">
                                <input type="file" class="form-control" name="background_image_accueil" id="logo"
                                    @change="handleAccueilChange">
                            </div>

                        </td>
                        <td>
                            <button type="submit" class="btn btn-primary m-3">Envoyer</button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    <!-- Image de fond à l'accueil -->
    <div class="dashbord_background m-3">
        <form @submit.prevent="setDashbordBackground(entreprise._id)">
            <table>
                <thead>
                    <th colspan="2"><label for="background_image_accueil">Image de fond au tableau de bord</label></th>
                </thead>

                <tbody>
                    <tr>
                        <td>

                            <div class="form-group">
                                <input type="file" class="form-control" name="background_image_accueil"
                                    @change="handleDashbordChange">
                            </div>

                        </td>
                        <td>
                            <button type="submit" class="btn btn-primary m-3">Envoyer</button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>

<script>
import { getEntreprise } from '@/api/parametre';
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    name: "Images",
    data() {
        return {
            background_accueil: null,
            background_dashbord: null,
            entreprise: {}
        }
    },
    async created() {
        this.entreprise = await getEntreprise()
        console.log("id est", this.entreprise)

    },
    methods: {

        async setAccueilBackground(id) {
            try {
                const formData = new FormData(); // Create a new FormData object

                // Append form fields to the FormData object

                formData.append('background_image_accueil', this.background_accueil); // Append the selected logo file

                const response = await axios.put(`http://159.89.166.117:3000/entreprise/accueil/background/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                });


                Swal.fire({
                    title: 'Succès',
                    text: 'Image mise à jour avec succès.',
                    icon: 'success',
                });

                console.log(response.data);
                // Réinitialiser le formulaire après la création réussie

            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produit.', error,
                    icon: 'error',
                });
            }
        },


        // Image de fond du tableau de bord

        async setDashbordBackground(id) {
            try {
                const formData = new FormData(); // Create a new FormData object

                // Append form fields to the FormData object

                formData.append('background_image_accueil', this.background_dashbord); // Append the selected logo file

                const response = await axios.put(`http://159.89.166.117:3000/entreprise/dashbord/background/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                });

                Swal.fire({
                    title: 'Succès',
                    text: 'Image mise à jour avec succès.',
                    icon: 'success',
                });

                console.log(response.data);
                // Réinitialiser le formulaire après la création réussie

            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produit.', error,
                    icon: 'error',
                });
            }
        },
        handleAccueilChange(event) {
            this.background_accueil = event.target.files[0];
        },

        handleDashbordChange(event) {
            this.background_dashbord = event.target.files[0];
        },
    }

}
</script>

<style scoped>
/* tableau */
table {
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid black;
    padding: 1px;
    /* background-color: white; */
}

thead {
    font-weight: bold;
    background-color: rgb(236, 231, 231) !important;
}
</style>