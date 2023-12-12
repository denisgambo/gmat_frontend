<template>
    <nav class="menu no-print">
        <MenuBar />
    </nav>
    <div class="bg-light titre">
        <h1>{{ titre }}</h1>
    </div>
    <div class="principal">
        <div class="menu_vertical">
            <nav class="navbar ">
                <ul class="navbar-nav">
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_categorie }">
                        <button @click="affichage('categorie')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Catégories consommable</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_consommable }">
                        <button @click="affichage('consommable')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Consommables</button>
                    </li>

                    <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_stock }">
                        <button @click="affichage('stock')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Stock</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_approvisionnement }">
                        <button @click="affichage('appro')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Approvisionnement</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_historique_appro }">
                        <button @click="affichage('hist_appro')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Historique Approvisionnement</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_consommation }">
                        <button @click="affichage('consommation')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Consommation</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_historique_conso }">
                        <button @click="affichage('hist_conso')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Historique consommation</button>
                    </li>

                </ul>
            </nav>


        </div>
        <div class="contenu">
            <div class="consommable" v-if="afficher_consommable">
                <div class="list_btn">
                    <button @click="afficher_consommable_form = !afficher_consommable_form"
                        class="btn btn-success m-2">Ajouter
                        un
                        consommable</button>
                    <button @click="afficher_consommable_form = !afficher_consommable_form"
                        class="btn btn-success m-2">Liste
                        des consommables</button>
                </div>

                <div class="afficher_list" v-if="afficher_consommable_form">

                    <div class="recherche bg-transparent rounded no-print">
                        <!-- Rechercher un équipement -->
                        <nav class="navbar navbar-light ">
                            <form class="form-inline rounded">
                                <input v-model="search" class="form-control mr-sm-2 rounded" type="search"
                                    placeholder="Rechercher" aria-label="Search">
                            </form>
                        </nav>
                    </div>
                    <button @click="switchList(2)" class="btn  btn-secondary m-2 no-print">vue liste</button>
                    <button @click="switchList(1)" class="btn  btn-secondary m-2 no-print">vue carte</button>


                    <h2>Stock des consommables</h2>
                    <div class="no-print">



                    </div>
                    <table v-if="display_table" id="list_consommables">
                        <button class="btn btn-secondary m-2" type="button" v-print="'#list_consommables'">Imprimer</button>
                        <Entete class="entete" />

                        <tr>
                            <th>Consommables</th>

                            <th>Quantité en stock</th>
                            <th>Seuil critique</th>
                            <th>Description</th>
                            <th class="no-print">Actions</th>
                        </tr>
                        <tr v-for="cons in searchCons" :key="cons._id">
                            <td>{{ cons.nom }}</td>

                            <td>{{ cons.quantite_en_stock }}</td>
                            <!-- <td>{{ cons.prix_achat }}</td> -->
                            <td>{{ cons.seuil_critique }}</td>
                            <td>{{ cons.description }}</td>
                            <td class="d-flex no-print">
                                <button @click="gotoEditPage(cons._id)" class="btn btn-success m-2 no-print">Modifier
                                </button>
                                <button @click="SupprimerCons(cons._id, cons.quantite_en_stock)"
                                    class="btn btn-secondary m-2 no-print">Supprimer
                                </button>
                            </td>
                        </tr>


                    </table>


                    <div class="list-categories" v-if="display_card">


                        <div class="card" style="width: 15rem;" v-for="cons in searchCons" :key="cons._id">
                            <img :src="cons.image_consommable" alt="..." v-if="cons.image_consommable">
                            <div class="card-body">
                                <h4>{{ cons.nom }}</h4>
                                <p>Quantité en stock: {{ cons.quantite_en_stock }}</p>


                            </div>
                        </div>
                    </div>


                </div>



                <form v-if="afficher_consommable" @submit.prevent="creerConsommable(nouvel_consommable)"
                    enctype="multipart/form-data">
                    <table border="1" class="justify-content-center">
                        <tbody>
                            <tr>
                                <th colspan="2">
                                    <h3>Ajouter un consommable</h3>
                                </th>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="categorie">Catégorie</label>
                                </td>
                                <td colspan="2" class="col-auto">

                                    <div class="form-group">
                                        <select v-model="nouvel_consommable.categorie" name="categorie"
                                            class="form-control">
                                            <option value="">Choisir la catégorie</option>
                                            <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom
                                            }}
                                            </option>
                                        </select>
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="nom">Nom du consommable</label>
                                </td>
                                <td>
                                    <input v-model="nouvel_consommable.nom" type="text" class="form-control" id="nom"
                                        name="nom" required>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="description">Description</label>
                                </td>
                                <td>
                                    <textarea v-model="nouvel_consommable.description" class="form-control" id="description"
                                        name="description"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="image_consommable">Image</label>
                                </td>
                                <td>
                                    <input type="file" class="form-control" id="image_consommable"
                                        @change="handleFileChange" name="image_consommable">
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="observation">Observation</label>
                                </td>
                                <td>
                                    <textarea v-model="nouvel_consommable.observation" class="form-control" id="observation"
                                        name="observation"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="seuil_critique">Seuil critique</label>

                                </td>

                                <td colspan="2">
                                    <div class="form-group">
                                        <input v-model="nouvel_consommable.seuil_critique" type="number"
                                            class="form-control" id="seuil_critique" name="seuil_critique">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="code">
                                        <div class="form-group">
                                            <label for="code_qr">Code QR</label>
                                            <input v-model="nouvel_consommable.code_qr" type="text" class="form-control"
                                                id="code_qr" name="code_qr">
                                        </div>
                                        <div class="form-group">
                                            <label for="code_bar">Code bar</label>
                                            <input v-model="nouvel_consommable.code_bar" type="text" class="form-control"
                                                id="code_bar" name="code_bar">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center">
                                    <div class="form-group">
                                        <input type="submit" class="btn btn-primary" value="Ajouter">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>


            </div>
            <div class="stock m-2" v-if="afficher_stock">
                <div class="recherche bg-transparent rounded no-print">
                    <!-- Rechercher un équipement -->
                    <nav class="navbar navbar-light ">
                        <form class="form-inline rounded">
                            <input v-model="search" class="form-control mr-sm-2 rounded" type="search"
                                placeholder="Rechercher" aria-label="Search">
                        </form>
                    </nav>
                </div>
                <!-- <button @click="switchList(2)" class="btn  btn-secondary m-2 no-print">vue liste</button> -->
                <!-- <button @click="switchList(1)" class="btn  btn-secondary m-2 no-print">vue carte</button> -->


                <h2>Stock des consommables</h2>
                <div class="no-print">



                </div>
                <table id="list_consommables">
                    <button class="btn btn-secondary m-2" type="button" v-print="'#list_consommables'">Imprimer</button>
                    <Entete class="entete" />

                    <tr>
                        <th>Consommables</th>

                        <th>Quantité en stock</th>
                        <th>Seuil critique</th>
                        <th>Description</th>
                        <!-- <th class="no-print">Actions</th> -->
                    </tr>
                    <tr v-for="cons in searchCons" :key="cons._id">
                        <td>{{ cons.nom }}</td>

                        <td>{{ cons.quantite_en_stock }}</td>
                        <!-- <td>{{ cons.prix_achat }}</td> -->
                        <td>{{ cons.seuil_critique }}</td>
                        <td>{{ cons.description }}</td>
                        <!-- <td class="d-flex no-print">
                            <button @click="gotoEditPage(cons._id)" class="btn btn-success m-2 no-print">Modifier
                            </button>
                            <button @click="SupprimerCons(cons._id, cons.quantite_en_stock)"
                                class="btn btn-secondary m-2 no-print">Supprimer
                            </button>
                        </td> -->
                    </tr>


                </table>


                <!-- <div class="list-categories" v-if="display_card">


                    <div class="card" style="width: 15rem;" v-for="cons in searchCons" :key="cons._id">
                        <img :src="cons.image_consommable" alt="..." v-if="cons.image_consommable">
                        <div class="card-body">
                            <h4>{{ cons.nom }}</h4>
                            <p>Quantité en stock: {{ cons.quantite_en_stock }}</p>


                        </div>
                    </div>
                </div> -->
            </div>

            <div class="historique" v-if="afficher_historique_conso">
                <h2>Historique des consommations</h2>
                <HistoriqueConsommation />
            </div>
            <div class="consommation" v-if="afficher_consommation">

                <Consommation />
            </div>
            <div class="historique_appro" v-if="afficher_historique_appro">
                <h2>Historique des approvisionnements</h2>

                <HistoriqueApprovisionnement />
            </div>

            <div class="appro" v-if="afficher_approvisionnement">
                <ApprovisionnementStock />


            </div>
            <div class="categorie" v-if="afficher_categorie">
                <AjouterCategorieConsommable />


            </div>

        </div>
    </div>
</template>


<script>
import print from 'vue3-print-nb'
import router from '@/router';

import Swal from 'sweetalert2'
import axios from 'axios';
import { getAllJustifications } from '@/api/justification';

import { createConsommation } from '@/api/consommation';
import { getCategoriesConsommable, createConsommable, getAllConsommables, supprimerConsommable } from '../api/consommable'
import { updateStock } from '@/api/approvisionnement';
import { getAllEquipements } from '@/api/equipement';
import MenuBar from './MenuBar.vue';
import Entete from './Entete.vue';
import HistoriqueConsommation from './HistoriqueConsommation.vue';
import { testAdminUser, testGestionnaireUser } from '/auth/auth-guard-admin';
import Consommation from './Consommation.vue';
import HistoriqueApprovisionnement from './HistoriqueApprovisionnement.vue';
import ApprovisionnementStock from './ApprovisionnementStock.vue';
import AjouterCategorieConsommable from './AjouterCategorieConsommable.vue';
export default {

    name: 'AjouterConsommable',
    components: {
        MenuBar,
        HistoriqueConsommation,
        Entete, Consommation,
        HistoriqueApprovisionnement,
        ApprovisionnementStock,
        AjouterCategorieConsommable
    },

    data() {
        return {
            titre: "Gestion des catégories de consommable",
            afficher_categorie: true,
            afficher_consommable: false,
            afficher_historique_conso: false,
            afficher_approvisionnement: false,
            afficher_historique_appro: false,
            afficher_consommation: false,
            afficher_stock: false,
            afficher_consommable_form: true,
            user: {},
            justifications: [],
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
                seuil_critique: 10,
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
    async created() {
        this.chargerCategories();
        this.chargerConsommables();
        this.chargerEquipement();
        this.user = JSON.parse(localStorage.getItem('user'))
        this.justifications = await getAllJustifications()
        setInterval(() => {
            this.Appel();
        }, 10000);
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
                // console.log(this.list_categorie)
            } catch (error) {
                console.log(error)
            }
        },
        affichage(option) {
            if (option == "categorie") {
                this.afficher_categorie = true
                this.afficher_consommable = false
                this.afficher_historique_conso = false
                this.afficher_approvisionnement = false
                this.afficher_historique_appro = false
                this.afficher_consommation = false
                this.afficher_stock = false
                this.titre = "Gestion des catégories de consommable"
            } else if (option == "consommable") {
                this.afficher_categorie = false
                this.afficher_consommable = true
                this.afficher_historique_conso = false
                this.afficher_approvisionnement = false
                this.afficher_historique_appro = false
                this.afficher_consommation = false
                this.afficher_stock = false
                this.titre = "Gestion  des consommables"
            } else if (option == "hist_conso") {
                this.afficher_categorie = false
                this.afficher_consommable = false
                this.afficher_historique_conso = true
                this.afficher_approvisionnement = false
                this.afficher_historique_appro = false
                this.afficher_consommation = false
                this.afficher_stock = false
                this.titre = "Historique des consommations"
            } else if (option == "appro") {
                this.afficher_categorie = false
                this.afficher_consommable = false
                this.afficher_historique_conso = false
                this.afficher_approvisionnement = true
                this.afficher_historique_appro = false
                this.afficher_consommation = false
                this.afficher_stock = false
                this.titre = "Faire un approvisionnement"
            } else if (option == "hist_appro") {
                this.afficher_categorie = false
                this.afficher_consommable = false
                this.afficher_historique_conso = false
                this.afficher_approvisionnement = false
                this.afficher_historique_appro = true
                this.afficher_consommation = false
                this.afficher_stock = false
            } else if (option == "consommation") {
                this.afficher_categorie = false
                this.afficher_consommable = false
                this.afficher_historique_conso = false
                this.afficher_approvisionnement = false
                this.afficher_historique_appro = false
                this.afficher_consommation = true
                this.afficher_stock = false
                this.titre = "Faire une consommation"
            } else if (option == "stock") {
                this.afficher_categorie = false
                this.afficher_consommable = false
                this.afficher_historique_conso = false
                this.afficher_approvisionnement = false
                this.afficher_historique_appro = false
                this.afficher_consommation = false
                this.afficher_stock = true
                this.titre = "Stock des consommables"
            }
        },



        async creerConsommable(consommableData) {
            // Vérifier si tous les champs sont saisis
            if (!consommableData.nom || !consommableData.seuil_critique || !consommableData.categorie) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs du consommable',
                    icon: 'error'
                });
                return;
            }

            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir créer ce consommable ?',
                    text: 'Voulez-vous vraiment ajouter ce consommable ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, ajouter le consommable !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
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

                    const response = await axios.post('http://159.89.166.117:3000/consommable', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                    if (response.status === 200) {
                        this.nouvel_consommable = {};
                        this.nouvel_consommable.quantite_en_stock = 0;

                        Swal.fire({
                            title: 'Succès',
                            text: 'Le consommable a été ajouté avec succès.',
                            icon: 'success'
                        });

                        this.listConsommable = await getAllConsommables();
                    } else {
                        throw new Error('Une erreur s\'est produite lors de la création du consommable.');
                    }
                }
            } catch (error) {
                console.log(error);

                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création du consommable.',
                    icon: 'error'
                });
            }
        }
        ,

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
        async Appel() {
            this.chargerCategories();
            this.chargerConsommables();
            this.chargerEquipement();
            this.user = JSON.parse(localStorage.getItem('user'))
            this.justifications = await getAllJustifications()
        },


    },

}
</script>

<style scoped>
.titre {
    margin-top: 50px;
}

/* .afficher_list {
    width: 100% !important;
} */

.menu {
    z-index: 100;
}

.principal {
    display: flex;
}

.menu_vertical {
    background-color: #f1f1f1;
    flex: 0 0 15%;
    padding: 10px;
    margin: 0;
    border-radius: 10px;
    position: fixed;
    left: 0;
}

.contenu {
    width: 75%;
    margin: 10px 200px !important;
    /* position: right;
    right: 0; */
}

.historique,
.consommation,
.historique_appro {
    margin-top: 25px;
    margin-left: 100px;
}

.appro,
.stock,
.consommable {
    margin-left: 100px !important;
    width: 100%;

}

.categorie {
    width: 80%;
    margin: 0 auto;
}

.nav-link-active button {
    background-color: #555;
    /* Mettez ici la couleur que vous souhaitez pour le lien actif */
    color: white;
}

.menu_vertical .btn-menu_v {
    width: 100% !important;
}

.container {
    width: 80%;
    margin: 0 auto;
    padding: 10px;

    background-size: cover;
}

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


h1 {
    text-align: center;
}


label {
    display: block;
    font-weight: bold;
}


input[type="submit"]:hover {
    background-color: #45a049;
}






.code {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 5px;
}

.code>input {
    width: 50px;
}



.addconso {
    width: 100%;
}



/* .header {
    font-weight: bold;
    background-color: rgb(236, 231, 231) !important;
} */

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
    width: 100%;
}

.entete {
    display: none;
}

h2 {
    background-color: #f1f509;
    border-radius: 5px;
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