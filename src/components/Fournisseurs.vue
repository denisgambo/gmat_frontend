Je m'excuse encore une fois. Voici le code sous forme de script:

<template>
    <div class="list_btn">
        <button @click="changeDisplay(1)" class="btn btn-secondary m-2"> Ajouter un fournisseur</button>
        <button @click="changeDisplay(2)" class="btn btn-secondary m-3"> Liste des fournisseurs</button>

    </div>
    <div class="container" v-if="dispay_form">
        <h1>Créer un fournisseur</h1>
        <form @submit.prevent="createFournisseur" class="form">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" v-model="fournisseur.nom" required>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" v-model="fournisseur.description"></textarea>
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" v-model="fournisseur.telephone">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="fournisseur.email">
            </div>
            <button type="submit" class="btn btn-primary">Créer</button>
        </form>
    </div>
    <div class="container" v-if="display_list_fournisseurs">
        <!-- La liste des fournisseurs -->

        <div class="container" v-if="display_list_fournisseurs">
            <!-- La liste des fournisseurs -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th colspan="5">Liste des fournisseurs</th>
                    </tr>
                    <tr>
                        <th scope="col">#</th> <!-- Ajouter une colonne pour le numéro -->
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Utiliser une boucle v-for avec un index pour afficher les fournisseurs -->
                    <tr v-for="(fournisseur, index) in listFournisseurs" :key="fournisseur._id">
                        <!-- Afficher le numéro de la ligne en utilisant l'index + 1 -->
                        <td>{{ index + 1 }}</td>
                        <!-- Afficher les autres propriétés du fournisseur -->
                        <td>{{ fournisseur.nom }}</td>
                        <td>{{ fournisseur.description }}</td>
                        <td>{{ fournisseur.telephone }}</td>
                        <td>{{ fournisseur.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { getAllFournisseur } from "@/api/fournisseur";
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name: "Fournisseurs",
    data() {
        return {
            dispay_form: false,
            display_list_fournisseurs: true,
            listFournisseurs: [],
            fournisseur: {
                nom: "",
                description: "",
                telephone: "",
                email: ""
            }
        };
    },
    async created() {
        this.listFournisseurs = await getAllFournisseur()
    },
    methods: {
        async createFournisseur() {
            try {
                const response = await axios.post("http://159.89.166.117:3000/fournisseur", this.fournisseur);
                Swal.fire({
                    title: 'Succès',
                    text: 'Le fournisseur a été créé avec succès.',
                    icon: 'success',
                });
                this.fournisseur = {
                    nom: "",
                    description: "",
                    telephone: "",
                    email: ""
                };
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite.',
                    icon: 'error',
                });
            }
        },
        changeDisplay(entree) {
            if (entree == 1) {
                this.dispay_form = true
                this.display_list_fournisseurs = false
            } else if (entree == 2) {
                this.dispay_form = false
                this.display_list_fournisseurs = true
            }
        }
    }
};
</script>

<style scoped>
.form {
    background-color: rgba(0, 0, 0, 0.5);
    /* Fond noir avec une opacité de 0.7 */
    padding: 20px;
    border-radius: 8px;
}
</style>
