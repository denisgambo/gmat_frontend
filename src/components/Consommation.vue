<template>
    <div class="container">



        <!-- Création d'une nouvelle consommation -->
        <div class="addconso">
            <form id="inscription-form" action="#" method="POST" v-if="display_consommation_form" class="addconso">
                <h1>Faire un prelèvement</h1>
                <table>
                    <tr class="header">
                        <td>
                            <label for="equipement">Consommable concerné</label>
                        </td>

                        <td>
                            <label for="equipement">Equipement concerné</label>
                        </td>
                        <td>
                            <label for="quantite">Quantité utilisée</label>
                        </td>

                        <td>
                            <label for="description">Justification </label>
                        </td>
                        <td>
                            <label for="description">Horamètre </label>
                        </td>

                        <td>
                            <label for="date">Date</label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <select v-model="nouvelle_consommation.consommable" name="consommable" id="" required>
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="cons in listConsommable" :key="cons._id" :value="cons._id">{{ cons.nom }}: {{
                                    cons.quantite_en_stock }}
                                </option>
                            </select>
                            <span v-if="!isEquipementSelected" class="error-message">Champ obligatoire.</span>
                        </td>

                        <td>
                            <select v-model="nouvelle_consommation.equipement" name="equipement" id="" required>
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="eq in listEquipements" :key="eq._id" :value="eq._id">{{ eq.nom }}
                                </option>
                            </select>
                            <span v-if="!isEquipementSelected" class="error-message">Champ obligatoire.</span>
                        </td>
                        <td>
                            <input class="commentaire" type="number" v-model="nouvelle_consommation.quantite" id=""
                                name="quantite">
                        </td>

                        <td>
                            <select v-model="nouvelle_consommation.description" name="description" id="" required>
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="just in justifications" :key="just._id" :value="just.titre">{{ just.titre }}
                                </option>
                            </select>
                        </td>

                        <td>
                            <input class="commentaire" v-model="nouvelle_consommation.hora" type="number" id="" name="hora">
                        </td>

                        <td>
                            <input class="commentaire" v-model="nouvelle_consommation.date" type="date" id="" name="date">
                        </td>
                    </tr>
                </table>

                <div class="form-group">
                    <input @click.prevent="creerConsommation(nouvelle_consommation)" type="submit" value="Ajouter">
                </div>
            </form>
        </div>



    </div>
</template>


<script>
import print from 'vue3-print-nb'

import Swal from 'sweetalert2'
import axios from 'axios';
import { createConsommation } from '@/api/consommation';
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




        async creerConsommation(consommationData) {
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
/* .container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background: url("../assets/images/bacform.jpg");
    background-size: cover;
} */

form {
    width: 100%;
    margin: 0 auto;
    /* border: 1px blue solid; */
}

h1 {
    text-align: center;
}

/* .form-group {
    margin-bottom: 5px;
} */

label {
    display: block;
    font-weight: bold;
}

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
}

input[type="submit"] {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    margin-top: 5px;
}

.date {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 90%;
    margin-bottom: 20px;
    margin: 0 auto;
    width: 100%;
    margin-bottom: 5px;
}

.select {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 5px;
}

.code {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 5px;
}

.code>input {
    width: 50px;
}


table {
    border-collapse: collapse;
    width: 100%;
}

.addconso {
    width: 100%;
}

td {
    border: 1px solid black;
    padding: 10px;
    background-color: white;
}

.header {
    font-weight: bold;
    background-color: rgb(236, 231, 231) !important;
}




.card {
    margin: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;

}

.card>img {
    border-radius: 10px;
}

.list-categories {
    display: flex;
    flex-wrap: wrap;
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