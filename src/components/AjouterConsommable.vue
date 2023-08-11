<template>
    <nav class="menu no-print">
        <MenuBar />
    </nav>
    <div class="container">
        <div class="lis_btn no-print">
            <button @click="changeDisplay(1)" class="btn1" type="button"> Ajouter un consommable</button>
            <button @click="changeDisplay(3)" class="btn1" type="button"> Stock des consommables</button>
            <button @click="changeDisplay(2)" class="btn1" type="button"> Ajouter une consommation</button>

            <button @click="changeDisplay(4)" class="btn1" type="button"> Historique des consommations</button>
        </div>

        <form id="inscription-form" action="#" method="POST" v-if="display_consommable_form"
            @submit.prevent="creerConsommable(nouvel_consommable)" enctype="multipart/form-data">
            <h3>Ajouter un consommable</h3>
            <div class="form-group">
                <label for="nom">Nom du consommable</label>
                <input v-model="nouvel_consommable.nom" type="text" id="nom" name="nom" required>
            </div>
            <div class="select">
                <div class="form-group">
                    <label for="categorie">Catégorie</label>
                    <select v-model="nouvel_consommable.categorie" name="categorie" id="">
                        <option value="">Pas de catégorie</option>
                        <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="adresse">Description</label>
                <textarea v-model="nouvel_consommable.description" id="description" name="description"></textarea>
            </div>

            <div class="form-group">
                <label for="prix_achat">Prix d'achat</label>
                <input v-model="nouvel_consommable.prix_achat" type="number" id="" name="prix_achat" disabled>
            </div>
            <div class="form-group">
                <label for="image_consommable">Image</label>
                <input type="file" id="image_consommable" @change="handleFileChange" name="image_consommable">
            </div>
            <div class="form-group">
                <label for="adresse">Observation</label>
                <textarea v-model="nouvel_consommable.observation" id="observation" name="observation"></textarea>
            </div>
            <div class="date">
                <div class="form-group">
                    <label for="quantite_en_stock">Quantité en stock</label>
                    <input v-model="nouvel_consommable.quantite_en_stock" type="number" id="" name="quantite_en_stock"
                        disabled>
                </div>

                <div class="form-group">
                    <label for="seuil_critique">Seuil critique</label>
                    <input v-model="nouvel_consommable.seuil_critique" type="number" id="" name="seuil_critique">
                </div>
            </div>
            <div class="code">
                <div class="form-group">
                    <label for="nom">Code QR</label>
                    <input v-model="nouvel_consommable.code_qr" type="text" id="" name="code_qr">
                </div>
                <div class="form-group">
                    <label for="nom">Code bar</label>
                    <input v-model="nouvel_consommable.code_bar" type="text" id="" name="code_bar">
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Ajouter">
            </div>
        </form>

        <!-- Création d'une nouvelle consommation -->
        <div class="addconso">
            <form id="inscription-form" action="#" method="POST" v-if="display_consommation_form" class="addconso">
                <h1>Ajouter une consommation</h1>
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
                            <textarea class="commentaire" v-model="nouvelle_consommation.description" id="description"
                                name="description"></textarea>
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

        <div class="list_consommables" v-if="display_list_consommable" id="list_consommables">
            <div class="recherche bg-transparent rounded no-print">
                <!-- Rechercher un équipement -->
                <nav class="navbar navbar-light ">
                    <form class="form-inline rounded">
                        <input v-model="search" class="form-control mr-sm-2 rounded" type="search" placeholder="Rechercher"
                            aria-label="Search">
                    </form>
                </nav>
            </div>
            <button @click="switchList(2)" class="voir no-print">vue liste</button>
            <button @click="switchList(1)" class="voir no-print">vue carte</button>
            <Entete class="entete" />
            <h2>Stock des consommables</h2>
            <table v-if="display_table" class="table table-bordered table-striped">
                <tr class="header">
                    <td>Consommables</td>

                    <td>Quantité en stock</td>
                    <!-- <td>Prix d'achat</td> -->
                    <td>Seuil critique</td>
                    <td>Description</td>
                    <td class="no-print">Actions</td>
                </tr>
                <tr v-for="cons in searchCons" :key="cons._id">
                    <td>{{ cons.nom }}</td>

                    <td>{{ cons.quantite_en_stock }}</td>
                    <!-- <td>{{ cons.prix_achat }}</td> -->
                    <td>{{ cons.seuil_critique }}</td>
                    <td>{{ cons.description }}</td>
                    <td class="d-flex no-print">
                        <button @click="gotoEditPage(cons._id)" class="btn btn-danger btn-sm no-print">Modifier
                        </button>
                        <button @click="SupprimerCons(cons._id, cons.quantite_en_stock)"
                            class="btn btn-danger btn-sm no-print">Supprimer
                        </button>
                    </td>
                </tr>
                <!--  <tr class="no-print">
                    <td>
                        <button type="button" v-print="'#list_consommables'">Imprimer</button>
                    </td>
                </tr> -->

            </table>
            <div class="no-print">

                <button class="btn btn-secondary" type="button" v-print="'#list_consommables'">Imprimer</button>

            </div>

            <div class="list-categories" v-if="display_card">


                <!--    <div class="single-categorie" v-for="eq in list_equipement" :key="eq._id">
                    <h4>{{ eq.nom }}</h4>
                    <button>Voir la liste des maintenances</button><br><br>
                    <button>Faire une maintenance</button>
                </div> -->

                <!--  <div class="single-categorie" v-for="eq in list_equipement" :key="eq._id">
                    <h4>{{ eq.nom }}</h4>
                    <button>Voir la liste des maintenances</button><br><br>
                    <button>Faire une maintenance</button>
                </div> -->

                <div class="card" style="width: 15rem;" v-for="cons in searchCons" :key="cons._id">
                    <img :src="cons.image_consommable" alt="..." v-if="cons.image_consommable">
                    <div class="card-body">
                        <h4>{{ cons.nom }}</h4>
                        <p>Quantité en stock: {{ cons.quantite_en_stock }}</p>

                        <!-- <button class="btn btn-secondary btn-sm">Voir la liste des maintenances</button><br><br>
                        <button class="btn btn-secondary btn-sm">Faire une maintenance</button> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="historique" v-if="display_historique">
            <HistoriqueConsommation />
        </div>
    </div>
</template>


<script>
import print from 'vue3-print-nb'
import router from '@/router';

import Swal from 'sweetalert2'
import axios from 'axios';
import { createConsommation } from '@/api/consommation';
import { getCategoriesConsommable, createConsommable, getAllConsommables, supprimerConsommable } from '../api/consommable'
import { updateStock } from '@/api/approvisionnement';
import { getAllEquipements } from '@/api/equipement';
import MenuBar from './MenuBar.vue';
import Entete from './Entete.vue';
import HistoriqueConsommation from './HistoriqueConsommation.vue';
import { testAdminUser, testGestionnaireUser } from '/auth/auth-guard-admin';
export default {

    name: 'AjouterConsommable',
    components: {
        MenuBar,
        HistoriqueConsommation,
        Entete
    },

    data() {
        return {
            user: {},
            list_categorie: "",
            display_table: true,
            display_consommation_form: false,
            display_historique: false,
            display_consommable_form: false,
            display_list_consommable: true,
            display_card: false,
            listConsommable: "",
            listEquipements: "",
            search: "",
            consommableSearch: [],
            nouvel_consommable: {
                nom: "",
                description: "",
                prix_achat: 0,
                categorie: "",
                observation: "",
                quantite_en_stock: 0,
                code_bar: "",
                code_qr: "",
                image_consommable: "",
                seuil_critique: 0,
            },

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
    created() {
        this.chargerCategories();
        this.chargerConsommables();
        this.chargerEquipement();
        this.user = JSON.parse(localStorage.getItem('user'))
    },
    computed: {
        searchCons() {
            return this.consommableSearch.filter((consommable) => {
                return consommable.nom.toLowerCase().includes(this.search.toLocaleLowerCase())
            })
        },
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
        /*  async creerConsommable(consommableData) {
             // Vérifier si tous les champs sont saisis
             if (
                 !consommableData.nom ||
                 !consommableData.prix_achat ||
                 !consommableData.categorie
             ) {
                 Swal.fire({
                     title: 'Veuillez remplir tous les champs du consommable',
                     icon: 'error'
                 });
                 return;
             }
 
             try {
                 await createConsommable(consommableData);
                 Swal.fire({
                     title: 'Enregistré avec succès',
                     icon: 'success'
                 });
                 this.nouvel_consommable = {}; // Réinitialiser les valeurs du nouvel consommable
             } catch (error) {
                 console.log(error);
             }
         } */

        async creerConsommable(consommableData) {
            // Vérifier si tous les champs sont saisis
            if (
                !consommableData.nom ||
                !consommableData.seuil_critique ||
                !consommableData.categorie
            ) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs du consommable',
                    icon: 'error'
                });
                return;
            }

            try {
                // Créer un nouvel objet FormData pour les données du formulaire
                const formData = new FormData();
                formData.append('nom', consommableData.nom);
                formData.append('description', consommableData.description);
                formData.append('categorie', consommableData.categorie);
                formData.append('observation', consommableData.observation);
                formData.append('image_consommable', consommableData.image_consommable);
                formData.append('quantite_en_stock', consommableData.quantite_en_stock);
                formData.append('prix_achat', consommableData.prix_achat);
                formData.append('seuil_critique', consommableData.seuil_critique);
                formData.append('code_bar', consommableData.code_bar);
                formData.append('code_qr', consommableData.code_qr);

                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.post('http://127.0.0.1:3000/consommable', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                console.log(formData)

                // Vérifier la réponse de l'API
                if (response.status === 200) {
                    // Réinitialiser les champs du formulaire
                    this.nouvel_consommable = {};
                    this.nouvel_consommable.quantite_en_stock = 0;
                    // this.nouvel_equipement.description = '';
                    // Réinitialiser les autres champs...

                    // Afficher un message de succès
                    Swal.fire({
                        title: 'Succès',
                        text: 'Le consommable a été ajouté avec succès.',
                        icon: 'success',
                    });
                    this.listConsommable = await getAllConsommables();
                } else {
                    throw new Error('Une erreur s\'est produite lors de la création de du consommable.');
                }
            } catch (error) {
                console.log(error);
                // Afficher un message d'erreur
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création du consommable.',
                    icon: 'error',
                });
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
                console.log(data);
                this.changeStock(this.nouvelle_consommation, 0);
                Swal.fire({
                    title: 'Enregistré avec succès',
                    icon: 'success'
                });
                this.chargerMaintenanceWithAgregate();
                this.last_consommation = await getLastConsommation();
                // console.log("Nouvelle: ", this.nouvelle_consommation);
                // console.log(this.last_maintenance);
                this.chargerConsommables()
            } catch (error) {
                console.log(error);
            }
        }
        ,



        async chargerConsommables() {
            try {
                this.listConsommable = await getAllConsommables();
                this.consommableSearch = [...this.listConsommable]

                // console.log("Liste des consommables", this.listConsommable);
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
                // this.nouvelle_consommation = {};
                this.nouvelle_consommation.quantite = 1;
                this.nouvelle_consommation.quantite = 1;
            } catch (error) {

            }
        },
        test() {
            if (testAdminUser) {
                alert("Vous etes admin")
            } else {
                alert("Vous n'etes pas admin")
            }
        },

        // Supprimer un consommable
        async SupprimerCons(id, quantite) {
            let message = "Le consommable sera supprimé. Continuer?";
            if (!testAdminUser()) {
                Swal.fire({
                    title: 'Danger',
                    text: 'Vous n\'avez pas les droits nécéssaires pour réaliser cette action.',
                    icon: 'error',
                });
                return
            }
            if (quantite > 0) {
                Swal.fire({
                    title: 'Attention',
                    text: "Vous ne pouvez pas supprimer un consommable dont la quantite n'est pas nulle",
                    icon: 'error'
                });
                return
            }
            Swal.fire({
                title: message,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    try {
                        await supprimerConsommable(id); // Attendre la suppression de l'équipement
                        Swal.fire({
                            title: 'Réussi',
                            text: 'Consommable supprimé avec succès.',
                            icon: 'success',
                        });
                        this.chargerConsommables();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },

        changeDisplay(entre) {
            if (entre == 1) {
                if (this.user.role == "administrateur" || this.user.role == "financier" || this.user.role == "gestionnaire") {
                    this.display_consommable_form = true
                    this.display_consommation_form = false;
                    this.display_list_consommable = false;
                    this.display_historique = false;
                } else {
                    Swal.fire({
                        title: 'Attention',
                        text: "Vous n'avez pas les droits nécéssaires pour faire cette action",
                        icon: 'error'
                    });
                }

            } else if (entre == 2) {
                if (this.user.role == "administrateur" || this.user.role == "gestionnaire") {
                    this.display_consommation_form = true;
                    this.display_consommable_form = false;
                    this.display_list_consommable = false;
                    this.display_historique = false;
                } else {
                    Swal.fire({
                        title: 'Attention',
                        text: "Vous n'avez pas les droits nécéssaires pour faire cette action",
                        icon: 'error'
                    });
                }

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
        gotoEditPage(id) {
            router.push({ name: 'ModifierConsommable', params: { id } });
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            this.nouvel_consommable.image_consommable = file;
        },


    },

}
</script>

<style scoped>
.container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    /* background: burlywood !important; */
    background: url("../assets/images/bacform.jpg");
    background-size: cover;
}

form {
    width: 80%;
    margin: 0 auto;
    border: 1px blue solid;
}

h1 {
    text-align: center;
}

.btn {
    margin: 2px;
    /* height: 50px; */
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
    /* border: 1px solid black; */
    padding: 10px;
    background-color: white;
}

.header {
    font-weight: bold;
    background-color: rgb(236, 231, 231) !important;
}

.btn1 {
    background-color: rgb(146, 236, 146);
    height: 50px;
    width: 220px;
    margin-left: 40px;
    border-radius: 10px;
    margin-bottom: 30px;

}


.card {
    margin: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;

}

.card>img {
    border-radius: 10px;
    width: 15rem;
    height: 250px;
}

.list-categories {
    display: flex;
    flex-wrap: wrap;
}

.entete {
    display: none;
}

@media print {
    .no-print {
        display: none;
    }

    h2 {
        text-align: center;
    }

    button {
        display: none;
    }

    .entete {
        display: flex;
    }
}
</style>