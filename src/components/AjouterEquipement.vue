<template>
    <div class="menu">
        <MenuBar />
    </div>
    <div class="bg-light">
        <h2>Gestion des équipements</h2>
    </div>
    <div>
        <div class="lis_btn">
            <button @click="changeDisplay(1)" class="btn btn2 btn-success m-3" type="button"> Ajouter un equipement</button>
            <button @click="changeDisplay(2)" class="btn btn2 btn-success m-3" type="button"> La liste des
                équipements</button>
            <button @click="changeDisplay(3)" class="btn btn2 btn-success m-3" type="button"> Mise au rebut</button>

        </div>


        <form enctype="multipart/form-data" v-if="display_equipement_form" @submit.prevent="creerEquipement()">
            <table border="1" class="justify-content-center">
                <tbody>
                    <tr>
                        <th colspan="2">
                            <h3>Ajouter un équipement</h3>
                        </th>
                    </tr>
                    <!--   <tr>
                        <td colspan="2">
                            <div class="error_message" v-if="error_message">
                                {{ error_message }}
                            </div>
                        </td>
                    </tr> -->
                    <tr>
                        <td class="label">
                            <label for="categorie">Catégorie</label><br>
                        </td>
                        <td>
                            <select v-model="nouvel_equipement.categorie" class="form-control" id="categorie">
                                <option value="Pas de catégorie" selected disabled>Choisir une catégorie</option>
                                <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="nom">Nom de l'équipement <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.nom" type="text" class="form-control" id="nom" required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="select">
                                <div class="form-group">
                                    <label for="service">Service</label>
                                    <select v-model="nouvel_equipement.service" class="form-control" id="service">
                                        <option v-for="service in services" :key="service._id" :value="service.nom">{{
                                            service.nom }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="localite">Localité <small class="ob">*</small></label>
                                    <select v-model="nouvel_equipement.localite" class="form-control" id="localite">
                                        <option v-for="local in list_localite" :key="local._id" :value="local._id">{{
                                            local.nom }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="disponibilite">Disponibilité <small class="ob">*</small></label><br>
                                    <input v-model="nouvel_equipement.disponibilite" type="radio" value="true" checked>Oui
                                    <input v-model="nouvel_equipement.disponibilite" type="radio" value="false">Non
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="code_inventaire">Code inventaire <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.code_inventaire" type="text" class="form-control"
                                id="code_inventaire" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="numero_serie">Numéro de série</label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.numero_serie" type="text" class="form-control"
                                id="numero_serie">
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="marque">Marque <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.marque" type="text" class="form-control" id="marque" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="description">Description <small class="ob">*</small></label>
                        </td>
                        <td>
                            <textarea v-model="nouvel_equipement.description" class="form-control" id="description"
                                required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="reference">Référence <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.reference" type="text" class="form-control" id="reference"
                                required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="form-group">
                                <label for="observation">Observation</label>
                                <textarea v-model="nouvel_equipement.observation" class="form-control"
                                    id="observation"></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="date">
                            <div class="form-group">
                                <label for="date_acquisition">Date d'acquisition</label>
                                <input v-model="nouvel_equipement.date_acquisition" type="date" class="form-control"
                                    id="date_acquisition">
                            </div>
                            <div class="form-group">
                                <label for="date_mise_en_service">Date de mise en service</label>
                                <input v-model="nouvel_equipement.date_mise_en_service" type="date" class="form-control"
                                    id="date_mise_en_service">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="form-group">
                                <label for="image_equipement">Image</label>
                                <input type="file" class="form-control" id="image_equipement" @change="handleFileChange"
                                    name="image_equipement">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="code">
                                <div class="form-group">
                                    <label for="code_qr">Code QR</label>
                                    <input v-model="nouvel_equipement.code_qr" type="text" class="form-control"
                                        id="code_qr">
                                </div>
                                <div class="form-group">
                                    <label for="code_bar">Code bar</label>
                                    <input v-model="code_bar" type="text" class="form-control" id="code_bar">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-center">
                            <div class="form-group">
                                <div class="error_message" v-if="error_message"></div>
                                <input type="submit" class="btn btn-primary" value="Ajouter">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>



        <div class="list_equipement" v-if="display_list_equipement">

            <div class="recherche bg-transparent rounded">
                <div class="search_setting">
                    Rechercher par:


                    <select v-model="search_setting" name="search_setting" id="search_setting">
                        <option value="nom" selected>Choisir un critère</option>
                        <option value="nom">Nom</option>
                        <option value="categorie">Catégorie</option>
                        <option value="service">Service</option>
                        <option value="localite">Localite</option>
                    </select>
                </div>
                <!-- Rechercher un équipement -->
                <nav class="navbar navbar-light " v-if="search_setting == 'nom'">
                    <form class="form-inline rounded">
                        <input v-model="search" class="form-control mr-sm-2 rounded" type="search"
                            placeholder="Rechercher par nom" aria-label="Search">
                    </form>
                </nav>

                <!-- Rechercher un équipement par localité -->
                <nav class="navbar navbar-light " v-if="search_setting == 'localite'">
                    <form class="form-inline rounded">
                        <input v-model="input_localite" class="form-control mr-sm-2 rounded" type="search"
                            placeholder="Rechercher par localité" aria-label="Search">
                    </form>
                </nav>
                <!-- Rechercher un équipement par service -->
                <nav class="navbar navbar-light " v-if="search_setting == 'service'">
                    <form class="form-inline rounded">
                        <input v-model="input_service" class="form-control mr-sm-2 rounded" type="search"
                            placeholder="Rechercher par service" aria-label="Search">
                    </form>
                </nav>

                <!-- Rechercher un équipement par catégorie -->
                <nav class="navbar navbar-light " v-if="search_setting == 'categorie'">
                    <form class="form-inline rounded">
                        <input v-model="input_categorie" class="form-control mr-sm-2 rounded" type="search"
                            placeholder="Rechercher par catégorie" aria-label="Search">
                    </form>
                </nav>
                <button @click="cancelSeach()" v-if="search || input_categorie || input_service || input_localite">Annuler
                    la recherche</button>
            </div>
            <button @click="switchList(2)" class="btn btn-secondary btn-sm m-2">vue liste</button>
            <button @click="switchList(1)" class="btn btn-secondary btn-sm m-2">vue carte</button>
            <div v-if="display_table" id="list_equipement" class="container1">

                <Entete class="entete" />

                <table border="1">

                    <tr>
                        <th colspan="12" class=""> Liste des équipements: {{ searchEq.length }}</th>
                    </tr>
                    <tr>
                        <th>N°</th>
                        <th class="nom_eq" colspan="2">Nom</th>
                        <th>categorie</th>
                        <th>Marque</th>
                        <th>Code inventaire</th>
                        <th>Référence</th>
                        <th>Localité</th>
                        <th>Service</th>
                        <th>Description</th>
                        <th>Dispo</th>
                        <th class="no_print">Actions</th>

                    </tr>

                    <tbody>
                        <tr v-for="(equipement, i) in searchEq" :key="equipement._id">
                            <td>{{ i + 1 }}</td>

                            <td class="nom_eq" colspan="2">{{ equipement.nom }}</td>
                            <td>{{ equipement.categorie }}</td>
                            <td>{{ equipement.marque }}</td>
                            <td>{{ equipement.code_inventaire }}</td>
                            <td>{{ equipement.reference }}</td>
                            <td>{{ equipement.localite }}</td>
                            <td>{{ equipement.service }}</td>
                            <td>{{ equipement.description }}</td>
                            <td>
                                <span v-if="equipement.disponibilite">Oui</span>
                                <span v-if="!equipement.disponibilite">Non</span>
                            </td>
                            <td class="d-flex no_print">

                                <button class="btn btn-sm m-2 no_print"
                                    @click="changerDisponibilite(equipement._id, equipement.disponibilite)"
                                    title="changer la disponibilité">

                                    <i class="fas fa-wrench"></i>
                                    {{ disponibilite(equipement.disponibilite) }}

                                </button>


                                <button @click="SupprimerEq(equipement._id)" class="btn btn-sm m-2 no_print"
                                    title="Supprimer">
                                    <i class="fas fa-trash-alt"></i>
                                    <!-- supprimer -->
                                </button>



                                <button @click="gotoEditPage(equipement._id)" class="btn btn-sm m-2"
                                    title="Modifier l'équipement">
                                    <i class="fas fa-edit"></i>
                                    <!-- modifier -->
                                </button>


                                <button @click="MettreAuRebut(equipement._id, equipement)" class="btn btn-sm m-2 no_print"
                                    title="Déclasser">
                                    <i class="fas fa-power-off"></i>


                                </button>

                            </td>



                        </tr>

                    </tbody>
                </table>
                <div class="justify-content-center">
                    <button type="button" v-print="'#list_equipement'" class="btn btn-secondary">Imprimer</button>
                </div>
            </div>

            <div class="list-categories" v-if="display_card">




                <div class="card" style="width: 15rem;" v-for="eq in searchEq" :key="eq._id">
                    <img :src="eq.image_equipement" class="image de l'équipement" alt=".image de l'équipement"
                        v-if="eq.image_equipement">
                    <div class="card-body">
                        <h4>{{ eq.nom }}</h4>


                    </div>
                </div>
            </div>
        </div>
        <div class="rebut m-3" v-if="display_rebut">
            <!-- Liste des équipement au rebut -->
            <div id="list_equipement_au_rebut" class="m-3">

                <Entete class="entete" />

                <table border="1">

                    <!-- <thead> -->
                    <tr class="header">
                        <th colspan="11" class=""> Liste des équipements au rebut</th>
                    </tr>
                    <tr>
                        <th colspan="2">Nom</th>
                        <th>categorie</th>
                        <th>Marque</th>
                        <th>Code inventaire</th>
                        <th>Référence</th>
                        <th>Localité</th>
                        <th>Service</th>
                        <th>Description</th>
                        <th>Au rebut</th>
                        <th class="header no_print">Actions</th>

                    </tr>
                    <!-- </thead> -->
                    <tbody>
                        <tr v-for="equipement in list_equipement_rebut" :key="equipement._id">
                            <td colspan="2">{{ equipement.nom }}</td>
                            <td>{{ equipement.categorie }}</td>
                            <td>{{ equipement.marque }}</td>
                            <td>{{ equipement.code_inventaire }}</td>
                            <td>{{ equipement.reference }}</td>
                            <td>{{ equipement.localite }}</td>
                            <td>{{ equipement.service }}</td>
                            <td>{{ equipement.description }}</td>
                            <td>
                                <span v-if="equipement.au_rebut">Au rebut</span>
                            </td>
                            <td class="d-flex no_print">


                                <button @click="MettreAuRebut(equipement._id, equipement)"
                                    class="btn btn-danger btn-sm no_print">Réclasser
                                </button>



                            </td>
                        </tr>

                    </tbody>
                </table>
                <div class="justify-content-center">
                    <button type="button" v-print="'#list_equipement_au_rebut'"
                        class="btn btn-secondary m-2">Imprimer</button>
                </div>
            </div>

            <!-- Historique des mises au rebut -->
            <table border="1">

                <!-- <thead> -->
                <tr class="header">
                    <th colspan="11" class=""> Historique des mises au rebut</th>
                </tr>
                <tr>
                    <th colspan="2">Equipement</th>
                    <th>categorie</th>
                    <th>Date</th>
                    <th>Raison</th>
                    <th>type</th>

                    <td class="header no_print">Actions</td>

                </tr>
                <!-- </thead> -->
                <tbody>
                    <tr v-for="rebut in list_rebut" :key="rebut._id">
                        <td colspan="2">{{ rebut.equipement.nom }}</td>
                        <td>{{ rebut.equipement.categorie }}</td>
                        <td>{{ rebut.date }}</td>
                        <td>{{ rebut.raison }}</td>
                        <td>{{ rebut.type }}</td>



                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Entete from './Entete.vue';
import Swal from 'sweetalert2'
import axios from 'axios';
import print from 'vue3-print-nb'
import router from '@/router';
import { updateEquipement, getAllEquipementsWithCat, supprimerEquipement, updateDisponibilite, getAllEquipementsAuRebut } from '@/api/equipement';
import { getAllLocalite } from '@/api/equipement';
import { getCategories } from '@/api/equipement';
import { getAllServices } from '@/api/service';
import { createRebut, getAllRebuts } from '@/api/rebut'
import MenuBar from './MenuBar.vue';
import { testAdminUser, testGestionnaireUser } from '/auth/auth-guard-admin';
export default {
    name: 'AjouterEquipement',
    components: {
        MenuBar,
        Entete
    },
    data() {
        return {
            error_message: "",
            search: "",
            input_service: "",
            input_localite: "",
            search_setting: "nom",
            services: "",
            input_categorie: "",
            display_table: false,
            display_card: true,
            list_categorie: [],
            list_localite: [],
            list_equipement: [],
            list_equipement_rebut: [],
            list_rebut: [],
            equipementSearch: [],
            display_equipement_form: false,
            display_list_equipement: true,
            display_rebut: false,
            user: "",
            nouvel_equipement: {
                nom: '',
                numero_serie: "",
                description: '',
                reference: '',
                categorie: '',
                localite: '',
                service: '',
                disponibilite: true,
                au_rebut: false,
                code_inventaire: '',
                marque: '',
                observation: '',
                date_acquisition: '',
                date_mise_en_service: '',
                image_equipement: null,
                code_bar: '',
                code_qr: ''
            }
        };
    },
    directives: {
        print
    },
    async created() {
        this.charger_categories();
        this.chargerEquipement();
        this.chargerServices();
        this.user = JSON.parse(localStorage.getItem("user"))
        this.chargerRebut()
        this.chargerEquipementRebut()
        // Exécuter Appel toutes les 1 minute (60 000 millisecondes)
        setInterval(() => {
            this.Appel();
        }, 10000);

    },
    computed: {
        defaultDate() {
            const today = new Date();
            const year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            // Formatez le mois et le jour pour avoir 2 chiffres (ex : '03' au lieu de '3')
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }

            // Retournez la date au format 'yyyy-mm-dd'
            return `${year}-${month}-${day}`;
        },
        searchEq() {

            return (this.equipementSearch.filter((equipement) => {
                return equipement.nom.toLowerCase().includes(this.search.toLocaleLowerCase()) && equipement.categorie.toLocaleLowerCase().includes(this.input_categorie.toLocaleLowerCase()) && equipement.localite.toLocaleLowerCase().includes(this.input_localite.toLocaleLowerCase()) && equipement.service.toLocaleLowerCase().includes(this.input_service.toLocaleLowerCase())
            }))
        },
    },

    methods: {


        async charger_categories() {
            try {
                this.list_categorie = await getCategories();
                this.list_localite = await getAllLocalite();
            } catch (error) {
                console.log(error);
            }
        },
        async chargerRebut() {
            try {
                this.list_rebut = await getAllRebuts()
                console.log("rebuts: ", this.list_rebut)
            } catch (error) {
                console.log(error)
            }
        },
        async chargerEquipementRebut() {
            try {
                this.list_equipement_rebut = await getAllEquipementsAuRebut()
                // console.log("au rebut: ", this.list_equipement_rebut)
            } catch (error) {
                console.log(error)
            }
        },

        async creerRebut(rebut) {
            try {
                const response = await createRebut(rebut)
            } catch (error) {
                console.log(error)
            }
        },




        async miseAuRebut(id, eq) {
            let val = false
            let dispo = false
            if (eq.au_rebut == true) {
                val = false
                dispo = true
            } else {
                val = true
                dispo = true
            }


            const a_modifier = {
                nom: eq.nom,
                au_rebut: val,
                disponibilite: dispo
            }
            if (!testAdminUser()) {
                Swal.fire({
                    title: 'Danger',
                    text: 'Vous n\'avez pas les droits nécéssaires pour réaliser cette action.',
                    icon: 'error',
                });
                return
            }

            let message = "L'équipement sera mis au rebut. Continuer?";

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
                        const response = await updateEquipement(id, a_modifier)// Attendre la suppression de l'équipement
                        Swal.fire({
                            title: 'Réussi',
                            text: 'Equipement mise au rebut avec succès.',
                            icon: 'success',
                        });
                        this.chargerEquipement();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },

        async MettreAuRebut(id, eq) {
            Swal.fire({
                title: 'Veuillez saisir la raison',
                input: 'text', // Utilisez 'text' pour un champ de texte
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Vous devez saisir la raison'; // Message d'erreur si le champ est vide
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    const userInput = result.value; // Récupérez la saisie de l'utilisateur
                    console.log("Raison: ", userInput)
                    //Enregistrer dans la table des rebuts
                    let type = ""
                    if (eq.au_rebut == true) {
                        type = "suppression"
                    } else {
                        type = "mise"
                    }

                    const rebut = {
                        equipement: eq,
                        raison: userInput,
                        type: type,
                        utilisateur: this.user
                    }
                    this.creerRebut(rebut)
                    this.miseAuRebut(id, eq); // Appelez votre fonction miseAuRebut() avec la saisie
                    this.chargerRebut()
                } else {
                    console.log("Action annulé")
                    // L'utilisateur a annulé
                    // Vous pouvez ajouter un code ici si nécessaire
                }
            });
        },
        cancelSeach() {
            this.input_categorie = ""
            this.input_service = ""
            this.input_localite = ""
            this.search = ""
        },




        async creerEquipement(equipementData) {
            // Vérifier si tous les champs sont saisis
            if (
                !this.nouvel_equipement.nom ||
                !this.nouvel_equipement.localite ||
                !this.nouvel_equipement.categorie ||
                !this.nouvel_equipement.marque ||
                !this.nouvel_equipement.code_inventaire ||
                !this.nouvel_equipement.disponibilite
            ) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Veuillez remplir tous les champs obligatoires.',
                    icon: 'error',
                });
                return;
            }

            try {
                // Créer un nouvel objet FormData pour les données du formulaire
                const formData = new FormData();
                formData.append('nom', this.nouvel_equipement.nom);
                formData.append('description', this.nouvel_equipement.description);
                formData.append('reference', this.nouvel_equipement.reference);
                formData.append('categorie', this.nouvel_equipement.categorie);
                formData.append('localite', this.nouvel_equipement.localite);
                formData.append('disponibilite', this.nouvel_equipement.disponibilite);
                formData.append('code_inventaire', this.nouvel_equipement.code_inventaire);
                formData.append('marque', this.nouvel_equipement.marque);
                formData.append('observation', this.nouvel_equipement.observation);
                formData.append('date_acquisition', this.nouvel_equipement.date_acquisition);
                formData.append('date_mise_en_service', this.nouvel_equipement.date_mise_en_service);
                formData.append('image_equipement', this.nouvel_equipement.image_equipement);
                formData.append('code_bar', this.nouvel_equipement.code_bar);
                formData.append('code_qr', this.nouvel_equipement.code_qr);
                formData.append('service', this.nouvel_equipement.service);
                formData.append('numero_serie', this.nouvel_equipement.numero_serie);
                formData.append('au_rebut', this.nouvel_equipement.au_rebut);


                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.post('http://159.89.166.117:3000/equipement', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                // Vérifier la réponse de l'API
                if (response.status === 200) {
                    // Réinitialiser les champs du formulaire
                    // this.nouvel_equipement = {
                    //     disponibilite: true,
                    // };
                    this.nouvel_equipement.description = '';
                    this.nouvel_equipement.nom = ""
                    // Réinitialiser les autres champs...

                    // Afficher un message de succès
                    Swal.fire({
                        title: 'Succès',
                        text: 'L\'équipement a été ajouté avec succès.',
                        icon: 'success',
                    });
                    this.chargerEquipement()
                } else {
                    throw new Error('Une erreur s\'est produite lors de la création de l\'équipement.');
                }
            } catch (error) {
                console.log(error);
                // Afficher un message d'erreur
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de l\'équipement.',
                    icon: 'error',
                });
            }
        },

        async chargerEquipement() {
            try {
                this.list_equipement = await getAllEquipementsWithCat();
                this.equipementSearch = [...this.list_equipement]
                // console.log("liste des équipements: ", this.list_equipement)
            } catch (error) {
                console.log(error)
            }
        },
        async chargerServices() {
            try {
                this.services = await getAllServices();
                // console.log("liste des services: ", this.services)
            } catch (error) {
                console.log(error)
            }
        },

        changeDisplay(entre) {
            if (entre == 1) {
                if (this.user.role == "administrateur" || this.user.role == "gestionnaire") {
                    this.display_equipement_form = true
                    this.display_list_equipement = false;
                    this.display_rebut = false
                } else {
                    Swal.fire({
                        title: 'Attention',
                        text: "Vous n'avez pas les droits nécéssaires pour faire cette action",
                        icon: 'error'
                    });
                }

            } else if (entre == 2) {
                this.display_equipement_form = false;
                this.display_list_equipement = true;
                this.display_rebut = false
            } else if (entre == 3) {
                this.display_equipement_form = false;
                this.display_list_equipement = false;
                this.display_rebut = true
            }
        },
        disponibilite(disponibilite) {
            if (disponibilite) {
                return "rendre indisponible";
            } else {
                return "rendre disponible";
            }
        },

        async changerDisponibilite(id, disponibilite) {
            let message = "";
            if (disponibilite == true) {
                message = 'L\'équipement sera indisponible. Continuer ?'
            } else {
                message = 'L\'équipement sera disponible. Continuer ?'
            }
            Swal.fire({
                title: message, //'L\'équipement sera indisponible. Continuer ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    const response = await updateDisponibilite(id, disponibilite);
                    this.chargerEquipement()
                }
            });
        },

        async SupprimerEq(id) {
            if (!testAdminUser()) {
                Swal.fire({
                    title: 'Danger',
                    text: 'Vous n\'avez pas les droits nécéssaires pour réaliser cette action.',
                    icon: 'error',
                });
                return
            }

            let message = "L'équipement sera supprimé. Continuer?";

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
                        await supprimerEquipement(id); // Attendre la suppression de l'équipement
                        Swal.fire({
                            title: 'Réussi',
                            text: 'Equipement supprimé avec succès.',
                            icon: 'success',
                        });
                        this.chargerEquipement();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },

        gotoEditPage(id) {
            if (testAdminUser() || testGestionnaireUser()) {
                router.push({ name: 'ModifierEquipement', params: { id } });


            } else {
                Swal.fire({
                    title: 'Danger',
                    text: 'Vous n\'avez pas les droits nécéssaires pour réaliser cette action.',
                    icon: 'error',
                });
                return
            }
        },


        imprimerTableaux() {
            window.print();
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
        handleFileChange(event) {
            const file = event.target.files[0];
            this.nouvel_equipement.image_equipement = file;
        },
        test() {
            alert("ça marche");
        },
        Appel() {
            this.charger_categories();
            this.chargerEquipement();
            this.chargerServices();
            this.user = JSON.parse(localStorage.getItem("user"));
            this.chargerRebut();
            this.chargerEquipementRebut();
        },
    }
}
</script>

<style scoped>
.entete {
    display: none;
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

.label {
    width: 30%;
}

.nom_eq {
    width: 200px !important;
}

h2 {
    text-align: center;
}

form {
    width: 80%;
    margin: auto;
}





/* Pour la version 4 de Bootstrap */



.container1 {
    width: 95%;
    margin: auto;
}

.menu {
    margin-bottom: 120px;
}

.ob {
    color: red;
}

.date {
    display: flex;
    justify-content: space-around;
    /* border: 1px solid #ccc; */
    width: auto;
    margin-bottom: 5px;
}

.date .form-group {
    margin-left: 0px;
}

.voir {
    height: 30px;
    background-color: #4CAF50;
    margin: 10px;
    border-radius: 5px;
}

.btn2 {
    width: 250px;
}



.select {
    display: flex;
    justify-content: space-around;
    /* border: 1px solid #ccc; */
    width: 100%;
}

.code {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;

}

.error_message {
    color: red;
    font-size: 12px;
}

.code>input {
    width: auto;
}


.card {
    margin: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    /* border: 1px blue solid; */

}

.card>img {
    border-radius: 10px;
    width: 15rem;
    height: 220px;
}

.list-categories {
    display: flex;
    flex-wrap: wrap;
}

.fa-trash-alt {
    color: red;
}

.fa-edit {
    color: blue;
}

.fa-power-off {
    color: red;
}

@media print {

    /* body * {
        display: none;
    } */
    button {
        display: none;
    }

    .menu {
        display: none;
    }

    .no_print {
        display: none;
    }

    .entete {
        display: flex;
    }

}
</style>