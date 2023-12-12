<template>
    <!-- Création d'une nouvelle consommation -->
    <div class="addconso">

        <form v-if="display_consommation_form" class="m-3">
            <table border="1" class="bg-light">
                <thead>
                    <tr>
                        <th colspan="2">Faire un prelèvement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="col-auto">
                            <label for="equipement">Equipement</label>
                        </td>
                        <td>
                            <select class="form-control" v-model="nouvelle_consommation.equipement" name="equipement" id=""
                                required>
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="eq in listEquipements" :key="eq._id" :value="eq._id">{{ eq.nom }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="consommable">Consommable</label>
                        </td>
                        <td>


                            <select class="form-control" v-model="nouvelle_consommation.consommable" name="consommable"
                                id="" required>
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="cons in listConsommable" :key="cons._id" :value="cons._id">{{ cons.nom }}: {{
                                    cons.quantite_en_stock }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="quantite">Quantité utilisée</label>
                        </td>
                        <td class="col-auto">
                            <input class="form-control" type="number" v-model="nouvelle_consommation.quantite" id=""
                                name="quantite">
                        </td>
                    </tr>

                    <tr>
                        <td class="col-auto">
                            <label for="description">Justification </label>
                        </td>
                        <td class="col-auto">
                            <select class="form-control" v-model="nouvelle_consommation.description" name="description"
                                id="" required multiple>
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="just in justifications" :key="just._id" :value="just.titre">{{ just.titre }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="hora">Horamètre </label>
                        </td>
                        <td class="col-auto">
                            <input class="form-control" v-model="nouvelle_consommation.hora" type="number" id=""
                                name="hora">
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="date">Date</label>
                        </td>
                        <td class="col-auto">
                            <input class="form-control" v-model="nouvelle_consommation.date" type="date" id="" name="date">
                        </td>
                    </tr>


                </tbody>

                <div class="form-group">
                    <input class="btn btn-primary m-3" @click.prevent="creerConsommation(nouvelle_consommation)"
                        type="submit" value="Ajouter">
                </div>
            </table>


        </form>
    </div>
</template>


<script>
import print from 'vue3-print-nb'

import Swal from 'sweetalert2'
import axios from 'axios';
import { createConsommation, getLastConsommation } from '@/api/consommation';
import { getCategoriesConsommable, getAllConsommables } from '../api/consommable'
import { updateStock } from '@/api/approvisionnement';
import { getAllEquipements } from '@/api/equipement';
import MenuBar from './MenuBar.vue';
import HistoriqueConsommation from './HistoriqueConsommation.vue';
import { getAllJustifications } from '@/api/justification';
export default {

    name: 'AjouterConsommable',
    components: {
        MenuBar,
        HistoriqueConsommation
    },

    data() {
        return {
            list_categorie: "",
            display_table: true,
            display_consommation_form: true,
            display_historique: false,
            display_consommable_form: false,
            display_list_consommable: true,
            display_card: false,
            listConsommable: "",
            listEquipements: "",
            user: {},
            justifications: [],


            nouvelle_consommation: {
                equipement: "",
                consommable: "",
                quantite: 0,
                date: "",
                description: "",
                hora: 0,
            },

        }
    },

    directives: {
        print
    },
    async created() {
        this.chargerCategories();
        this.chargerConsommables();
        this.chargerEquipement();
        this.user = JSON.parse(localStorage.getItem("user"));
        this.justifications = await getAllJustifications()
    },

    methods: {
        async chargerCategories() {
            try {
                this.list_categorie = await getCategoriesConsommable();
                console.log(this.list_categorie)
            } catch (error) {
                console.log(error)
            }
        },




        /*  async creerConsommation(consommationData) {
             // Vérifier si tous les champs sont saisis
             if (
                 !consommationData.equipement ||
                 !consommationData.consommable ||
                 !consommationData.quantite ||
                 !consommationData.date ||
                 !consommationData.description
             ) {
                 Swal.fire({
                     title: 'Veuillez remplir tous les champs de la consommation',
                     icon: 'error'
                 });
                 return;
             }
 
             // Vérifier si la quantité est supérieure à 0
             if (consommationData.quantite <= 0) {
                 Swal.fire({
                     title: 'La quantité doit être supérieure à 0',
                     icon: 'error'
                 });
                 return;
             }
             consommationData.utilisateur = {
                 nom: this.user.nom,
                 prenom: this.user.prenom,
                 role: this.user.role
             }
             try {
                 const data = await createConsommation(consommationData);
                 // console.log(data);
                 this.changeStock(this.nouvelle_consommation, 0);
                 Swal.fire({
                     title: 'Enregistré avec succès',
                     icon: 'success'
                 });
                 this.chargerMaintenanceWithAgregate();
                 this.last_consommation = await getLastConsommation();
                 // console.log("Nouvelle: ", this.nouvelle_consommation);
                 // console.log(this.last_maintenance);
                 await this.chargerConsommables()
             } catch (error) {
                 console.log(error);
             }
         } */
        async creerConsommation(consommationData) {
            // Vérifier si tous les champs sont saisis
            if (!consommationData.equipement || !consommationData.consommable || !consommationData.quantite || !consommationData.date || !consommationData.description) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de la consommation',
                    icon: 'error'
                });
                return;
            }

            // Vérifier si la quantité est supérieure à 0
            if (consommationData.quantite <= 0) {
                Swal.fire({
                    title: 'La quantité doit être supérieure à 0',
                    icon: 'error'
                });
                return;
            }

            consommationData.utilisateur = {
                nom: this.user.nom,
                prenom: this.user.prenom,
                role: this.user.role
            };

            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir enregistrer ?',
                    text: 'Voulez-vous vraiment créer cette consommation ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, enregistrer !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    const data = await createConsommation(consommationData);
                    this.changeStock(this.nouvelle_consommation, 0);

                    Swal.fire({
                        title: 'Enregistré avec succès',
                        icon: 'success'
                    });

                    // this.chargerMaintenanceWithAgregate();
                    this.last_consommation = await getLastConsommation();
                    await this.chargerConsommables();
                } else {
                    // L'utilisateur a annulé l'enregistrement
                    console.log('L\'enregistrement de la consommation a été annulé.');
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de l\'enregistrement de la consommation.',
                    icon: 'error'
                });
            }
        }

        ,



        async chargerConsommables() {
            try {
                this.listConsommable = await getAllConsommables();
                console.log("Liste des consommables", this.listConsommable);
            } catch (error) {
                console.log(error);
            }
        },

        async chargerEquipement() {
            try {
                this.listEquipements = await getAllEquipements();
                // console.log("Equipements: ", this.listEquipements);
            } catch (error) {
                console.log(error);
            }
        },

        async changeStock(nouvelle_consommation) {
            try {
                await updateStock(nouvelle_consommation.consommable, nouvelle_consommation.quantite, 0);
                this.nouvelle_consommation = {}
            } catch (error) {

            }
        },

        changeDisplay(entre) {
            if (entre == 1) {
                this.display_consommable_form = true
                this.display_consommation_form = false;
                this.display_list_consommable = false;
                this.display_historique = false;
            } else if (entre == 2) {
                this.display_consommation_form = true;
                this.display_consommable_form = false;
                this.display_list_consommable = false;
                this.display_historique = false;
            } else if (entre == 3) {
                this.display_list_consommable = true;
                this.display_consommation_form = false;
                this.display_consommable_form = false;
                this.display_historique = false;
            } else {
                this.display_historique = true
                this.display_list_consommable = false;
                this.display_consommation_form = false;
                this.display_consommable_form = false;
            }
        },
        switchList(entree) {
            if (entree == 1) {
                this.display_card = true;
                this.display_table = false;
            } else if (entree == 2) {
                this.display_card = false;
                this.display_table = true;
            }
        },

        calcul_quantite() {
            this.ligne_approvisionnement.prix_totale = this.ligne_approvisionnement.quantite * this.ligne_approvisionnement.prix_unitaire;
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            this.nouvel_consommable.image_consommable = file;
        },


    },

}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 80%;
    margin: auto;
}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

th {
    background-color: #f2f2f2;
}

/* .contenu {
    width: 80%;
    justify-content: start;
} */

/* form {
    width: 100%;
    margin: 0 auto;
} */

.titre {
    color: white;
}



h1 {
    text-align: center;
}



label {
    display: block;
    font-weight: bold;
}

/* 
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],

textarea {
    width: 80%;
    padding: 1px;
    border: 1px solid #f07777;
    border-radius: 4px;
    margin: 0 auto;
} */

/* input[type="submit"] {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
} */

input[type="submit"]:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    margin-top: 5px;
}


.header {
    font-weight: bold;
    background-color: rgb(236, 231, 231) !important;
}










@media print {
    .no-print {
        display: none;
    }

    h2 {
        text-align: center;
    }
}
</style>