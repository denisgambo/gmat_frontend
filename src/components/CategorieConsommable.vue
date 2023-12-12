<template>
    <div class="container">

        <div v-if="display_list">
            <table border="1">
                <thead>
                    <tr>
                        <th colspan="6">Liste des catégories de consommable</th>
                    </tr>
                    <tr>
                        <th>Numéro</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cat, index) in list_cat" :key="cat._id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ cat.nom }}</td>
                        <td>{{ cat.description }}</td>
                        <td>

                            <div class="d-flex">
                                <button type="button" class="btn btn-success m-2" @click="modifier(cat)">Modifier</button>
                                <button type="button" class="btn btn-secondary m-2"
                                    @click="supprimer(cat._id)">Supprimer</button>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form" v-if="display_form">
            <form>
                <div class="mb-3">
                    <label for="nom" class="form-label">Nom</label>
                    <input v-model="a_modifier.nom" type="text" class="form-control" id="nom">
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input v-model="a_modifier.description" type="text" class="form-control" id="description">
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-success" @click="validerModification()">Modifier</button>
                </div>

            </form>
        </div>

    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { supprimerCategoriCons } from '@/api/consommable';
import { getCatsCons, ModifierCatCons } from '@/api/equipement';
export default {
    name: "CategorieConsommable",
    data() {
        return {
            list_cat: [],
            a_modifier: {},
            display_list: true,
            display_form: false
        }
    },
    created() {
        this.chargerCat()
    },
    methods: {
        async chargerCat() {
            try {
                this.list_cat = await getCatsCons()
                console.log(this.list_cat)
            } catch (error) {
                console.log(error)
            }
        },

        modifier(cat) {
            this.a_modifier = cat
            this.switchDisplay(2)
        },
        /*    supprimer(id) {
               try {
                   const response = supprimerCategoriCons(id)
               } catch (error) {
                   console.log(error)
               }
           }, */
        async supprimer(id) {
            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr ?',
                    text: 'Voulez-vous vraiment supprimer cet élément ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, supprimer !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    // Appel à votre fonction de suppression (supprimerCategorieEq()) ici
                    const response = await supprimerCategoriCons(id);

                    // Affichage d'un message de succès après la suppression réussie
                    Swal.fire({
                        title: 'Supprimé !',
                        text: 'L\'élément a été supprimé avec succès.',
                        icon: 'success',
                        timer: 2000, // Durée d'affichage du message de succès en millisecondes (2 secondes ici)
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    this.chargerCat()

                    console.log(response); // Afficher la réponse de la suppression dans la console si nécessaire
                }
            } catch (error) {
                console.error(error);
            }
        },


        async validerModification() {
            try {
                const response = await ModifierCatCons(this.a_modifier._id, this.a_modifier)
                Swal.fire({
                    title: 'Réussi',
                    text: 'Catégorie modifiée avec succès',
                    icon: 'success',
                });
                this.switchDisplay(1)
            } catch (error) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite',
                    icon: 'error',
                });
                console.log(error)
            }
        },

        switchDisplay(entree) {
            if (entree == 1) {
                this.display_list = true;
                this.display_form = false
            } else if (entree == 2) {
                this.display_list = false;
                this.display_form = true
            }
        }
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

th {
    background-color: #f2f2f2;
}
</style>

<!-- <style>

</style> -->