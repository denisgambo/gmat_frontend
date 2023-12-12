
<template>
    <div class="bg-light">
        <h2>Gestion des fournisseurs</h2>
    </div>
    <div class="list_btn">
        <button @click="changeDisplay(1)" class="btn btn-success m-2"> Ajouter un fournisseur</button>
        <button @click="changeDisplay(2)" class="btn btn-success m-3"> Liste des fournisseurs</button>

    </div>
    <div class="container" v-if="dispay_form">

        <form @submit.prevent="createFournisseur" v-if="dispay_form">
            <table border="1" class="justify-content-center">
                <tbody>
                    <tr>
                        <th colspan="2">
                            <h1>Ajouter un fournisseur</h1>
                        </th>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="nom" class="form-label">Nom</label>
                        </td>
                        <td>
                            <input type="text" class="form-control" id="nom" v-model="fournisseur.nom" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="description" class="form-label">Description</label>
                        </td>
                        <td>
                            <textarea class="form-control" id="description" v-model="fournisseur.description"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="telephone" class="form-label">Téléphone</label>
                        </td>
                        <td>
                            <input type="tel" class="form-control" id="telephone" v-model="fournisseur.telephone">
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="email" class="form-label">Email</label>
                        </td>
                        <td>
                            <input type="email" class="form-control" id="email" v-model="fournisseur.email">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-center">
                            <button type="submit" class="btn btn-primary">Créer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>

    </div>

    <!-- Formulaire de modification -->
    <div class="container" v-if="dispay_modif_form">

        <form @submit.prevent="modification()" v-if="dispay_modif_form">
            <table border="1" class="justify-content-center">
                <tbody>
                    <tr>
                        <th colspan="2">
                            <h1>Ajouter un fournisseur</h1>
                        </th>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="nom" class="form-label">Nom</label>
                        </td>
                        <td>
                            <input type="text" class="form-control" id="nom" v-model="fournisseur_modif.nom" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="description" class="form-label">Description</label>
                        </td>
                        <td>
                            <textarea class="form-control" id="description"
                                v-model="fournisseur_modif.description"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="telephone" class="form-label">Téléphone</label>
                        </td>
                        <td>
                            <input type="tel" class="form-control" id="telephone" v-model="fournisseur_modif.telephone">
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="email" class="form-label">Email</label>
                        </td>
                        <td>
                            <input type="email" class="form-control" id="email" v-model="fournisseur_modif.email">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-center">
                            <button type="submit" class="btn btn-primary">Modifier</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>

    </div>
    <div class="container" v-if="display_list_fournisseurs">
        <!-- La liste des fournisseurs -->

        <div class="container" v-if="display_list_fournisseurs">
            <!-- La liste des fournisseurs -->
            <table border="1">
                <thead>
                    <tr>
                        <th colspan="6">Liste des fournisseurs</th>
                    </tr>
                    <tr>
                        <th scope="col">Numéro</th> <!-- Ajouter une colonne pour le numéro -->
                        <th scope="col">Nom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Utiliser une boucle v-for avec un index pour afficher les fournisseurs -->
                    <tr v-for="(fournisseur, index) in listFournisseurs" :key="fournisseur._id">
                        <!-- Afficher le numéro de la ligne en utilisant l'index + 1 -->
                        <td>{{ index + 1 }}</td>
                        <!-- Afficher les autres propriétés du fournisseur -->
                        <td class="nom">{{ fournisseur.nom }}</td>
                        <td class="nom">{{ fournisseur.description }}</td>
                        <td class="nom">{{ fournisseur.telephone }}</td>
                        <td class="nom">{{ fournisseur.email }}</td>
                        <td>
                            <button @click="modifFournisseur(fournisseur)" class="btn btn-success btn1">Modifier</button>
                            <button @click="supFournisseur(fournisseur._id)"
                                class="btn btn-secondary btn1">Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { getAllFournisseur, supprimerFournisseur } from "@/api/fournisseur";
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name: "Fournisseurs",
    data() {
        return {
            dispay_form: false,
            display_list_fournisseurs: true,
            dispay_modif_form: false,
            listFournisseurs: [],
            fournisseur: {
                nom: "",
                description: "",
                telephone: "",
                email: ""
            },
            fournisseur_modif: {
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
                this.listFournisseurs = await getAllFournisseur()
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

        async supFournisseur(id) {
            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir supprimer ce fournisseur ?',
                    text: 'Cette action est irréversible.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, supprimer !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    // L'utilisateur a confirmé la suppression
                    const response = await supprimerFournisseur(id);

                    // Suppression réussie
                    Swal.fire({
                        title: 'Supprimé!',
                        text: 'Le fournisseur a été supprimé avec succès.',
                        icon: 'success'
                    });
                    this.listFournisseurs = await getAllFournisseur()


                }
            }
            // Échec de la suppression

            catch (error) {
                console.error(error);
                // Gestion des erreurs
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Une erreur est survenue lors de la suppression du fournisseur.',
                    icon: 'error'
                });
            }
        },

        modifFournisseur(f) {
            this.fournisseur_modif = f
            console.log(this.fournisseur_modif)
            this.changeDisplay(3)
        },

        async modification() {
            try {
                const response = await supprimerFournisseur(this.fournisseur_modif._id, this.fournisseur_modif)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        },
        changeDisplay(entree) {
            if (entree == 1) {
                this.dispay_form = true
                this.display_list_fournisseurs = false
                this.dispay_modif_form = false
            } else if (entree == 2) {
                this.dispay_form = false
                this.display_list_fournisseurs = true
                this.dispay_modif_form = false
            } else if (entree == 3) {
                this.dispay_modif_form = true
                this.dispay_form = false
                this.display_list_fournisseurs = false
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

/* Tableau des utilisateurs */
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

.nom {
    text-align: left;
    padding-left: 5px;
}

th {
    background-color: #f2f2f2;
}

.lis_btn {
    /* display: flex; */
    width: 100%;
    /* position: fixed; */

}

.btn1 {
    width: 100px;
}



.btn {
    margin: 10px;
}
</style>
