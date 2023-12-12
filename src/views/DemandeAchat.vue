<template>
    <div class="container">
        <nav class="menu">
            <ul>
                <li class="btn btn-success m-2 btn_li" @click="changeDisplay2('form')"><a href="#">Faire une demande
                    </a></li>
                <!-- <li><a href="/dashbord">Tableau de bord</a></li> -->
                <li class="btn btn-success m-2 btn_li" @click="changeDisplay2('en_cours')"><a href="#">Demandes en cours</a>
                </li>
                <li class="btn btn-success m-2 btn_li" @click="changeDisplay2('valide')"><a href="#">Demande validées
                    </a></li>

                <li class="btn btn-success m-2 btn_li" @click="changeDisplay2('traite')"><a href="#">Demande traitées
                    </a></li>
            </ul>
        </nav>
        <div class="form" v-if="display_formulaire">
            <table border="1" class="m-5 bg-light" v-if="demande_en_cours.length > 0">
                <thead>
                    <tr>
                        <td colspan="5">{{ demande_infos.commentaire }}</td>
                    </tr>
                    <tr>
                        <th scope="col">Numéro</th>
                        <th scope="col">Consommable</th>
                        <!-- <th scope="col">Catégorie</th> -->
                        <th scope="col">Quantité</th>
                        <th scope="col">Commentaire</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(demande, i) in demande_en_cours" :key="demande">
                        <td>{{ i + 1 }}</td>
                        <td class="to_left">{{ demande.consommable.nom }}</td>
                        <!-- <td class="to_left">{{ demande.consommable.categorie }}</td> -->
                        <td class="to_left">{{ demande.quantite }}</td>
                        <td class="to_left">{{ demande.commentaire }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="form_demande">

                <form v-if="display_demande_form" class="m-3">
                    <table border="1" class="bg-light">
                        <thead>
                            <tr>
                                <th colspan="2">Demande d'achat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="col-auto">
                                    <label for="description">Objet</label>
                                </td>
                                <td>
                                    <textarea v-model="commentaire" class="form-control" id="description"
                                        placeholder="Commentaire" name="description" cols="10" rows="3"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="validateur">Validateur</label>
                                </td>
                                <td>
                                    <select name="validateur" required v-model="demande_infos.validateur"
                                        class="form-control">
                                        <option value="" disabled selected>-- Sélectionnez --</option>
                                        <option v-for="user in list_users" :key="user" :value="user">{{ user.nom }}: {{
                                            user.prenom }}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center">
                                    <button @click="creerDemande()" type="button"
                                        class="btn btn-success m-3">Valider</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>


                <form @submit.prevent="creerLigneDemane()" v-if="display_ligne_demande_form">




                    <!-- le formulaire pour renseigner les produits approvisionnés -->
                    <table border="1" class="bg-light">
                        <h2 class="bg-light">Remplir le formulaire de demande d'achat</h2>
                        <tr>
                            <th>
                                <label for="consommable">Consommable</label>
                            </th>
                            <th>
                                <label for="description">Commentaire</label>
                            </th>

                            <th>
                                <label for="quantite">Quantité </label>
                            </th>

                        </tr>

                        <tr>
                            <td>
                                <!--   <select name="consommable" required v-model="ligne_demande.consommable"
                                    class="form-control">
                                    <option value="" disabled selected>-- Sélectionnez --</option>
                                    <option v-for="conso in list_consommable" :key="conso" :value="conso">{{
                                        conso.nom
                                    }}: {{ conso.quantite_en_stock }}</option>
                                </select> -->
                                <textarea required v-model="ligne_demande.consommable.nom" class="form-control" name=""
                                    id="" cols="20" rows="5"
                                    placeholder="Nom et description précise du consommable et "></textarea>

                            </td>
                            <td>
                                <input type="text" name="description" v-model="ligne_demande.description"
                                    class="form-control">
                            </td>



                            <td>
                                <input v-model="ligne_demande.quantite" class="form-control" type="number" required
                                    name="quantite" @input="calcul_prix_total">
                            </td>



                        </tr>
                    </table>

                    <div class="d-flex">
                        <input type="submit" value="Ajouter" class="btn btn-success m-2">

                        <input @click="terminer()" value="Terminer" class="btn btn-danger m-2">

                    </div>
                </form>
            </div>
        </div>
        <div class="list_demande_validees list_demande" v-if="display_demande_valide">
            <h1 class="bg-light">Toutes les demandes validées</h1>


            <table border="1" class="m-5 bg-light" v-if="!demande_valide_a_voir" id="demande_valide">
                <Entete class="entete" />
                <thead>
                    <tr>
                        <th colspan="6">Demandes d'achats validées</th>
                    </tr>

                    <tr>
                        <th scope="col">Numéro</th>
                        <th scope="col">Date d'émission</th>

                        <th scope="col">Status</th>
                        <th scope="col">Commentaire</th>
                        <th>Validateur</th>
                        <th class="no_print">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(demande, i) in listDemandeValidee" :key="demande._id">
                        <td>{{ i + 1 }}</td>
                        <td class="to_left">{{ formatDate(demande.date_emission) }}</td>
                        <!-- <td>{{ demande.consommable.categorie }}</td> -->
                        <td class="to_left">{{ demande.validation_status }}</td>
                        <td class="to_left">{{ demande.description }}</td>
                        <td class="to_left">{{ demande.validateur.nom }} {{ demande.validateur.prenom }} {{
                            demande.validateur.email }}
                        </td>
                        <td>
                            <button class="btn btn-success" @click="VoirDemaneValide('voir', demande)">Voir</button>
                        </td>
                    </tr>
                    <tr class="no_print">
                        <td colspan="6">
                            <button v-print="`#demande_valide`" class="btn btn-secondary">Imprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_retour" v-if="demande_valide_a_voir">
                <button @click="VoirDemaneValide('fermer', '')" class="btn btn-secondary">Retour</button>
            </div>
            <table border="1" class="m-5 bg-light" v-if="demande_valide_a_voir" :id="demande_valide_a_voir._id">
                <div
                    v-if="demande_valide_a_voir.validateur.email == user_email || demande_valide_a_voir.emetteur.email == user_email || user.role == 'moyens generaux' || user.role == 'administrateur'">
                    <Entete class="entete" />
                    <thead>

                        <tr>

                            <th scope="col">Date d'émission</th>

                            <th scope="col">Status</th>
                            <th scope="col">Commentaire</th>
                            <th>Validateur</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>

                            <td class="to_left">{{ formatDate(demande_a_voir.date_emission) }}</td>
                            <!-- <td>{{ demande.consommable.categorie }}</td> -->
                            <td class="to_left">{{ demande_valide_a_voir.validation_status }}</td>
                            <td class="to_left">{{ demande_valide_a_voir.description }}</td>
                            <td class="to_left">{{ demande_valide_a_voir.validateur.nom }} {{
                                demande_valide_a_voir.validateur.prenom }} {{
        demande_valide_a_voir.validateur.email }}
                            </td>
                        </tr>


                        <tr>

                            <td colspan="5">

                                <table border="1" class="m-5" v-for="(ligne) in demande_valide_a_voir.lignesDemandeAchat"
                                    :key="ligne._id">
                                    <thead>

                                        <tr>
                                            <th scope="col">Consommable</th>
                                            <th scope="col">Quantité</th>

                                            <th scope="col">Commentaire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td class="to_left">{{ ligne.consommable.nom }}</td>

                                            <td class="to_left">{{ ligne.quantite }}</td>

                                            <td class="to_left">{{ ligne.description }}</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3"><button @click="traiterDemande(demande_valide_a_voir._id, 'traite')"
                                    class="btn btn-success">Traiter</button>


                            </td>
                            <td colspan="2">
                                <button v-print="`#${demande_valide_a_voir._id}`" class="btn btn-success">Imprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </div>

            </table>
        </div>

        <div class="list_demande_en_cours list_demande" v-if="display_demanande_en_cours">
            <h1 class="titre bg-light">Les demandes en cours de traitement</h1>
            <table border="1" class="m-5 bg-light" v-if="!demande_a_voir" id="demande_en_cours">
                <Entete class="entete" />
                <thead>
                    <tr>
                        <th colspan="6"> Demandes d'achat en cours de traitements

                        </th>
                    </tr>

                    <tr>
                        <th scope="col">Numéro</th>
                        <th scope="col">Date d'émission</th>
                        <!-- <th scope="col">Catégorie</th> -->
                        <th scope="col">Status</th>
                        <th scope="col">Commentaire</th>
                        <th>Validateur</th>
                        <th class="no_print">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(demande, i) in listDemandeNonValidees" :key="demande._id">
                        <td>{{ i + 1 }}</td>
                        <td class="to_left">{{ formatDate(demande.date_emission) }}</td>
                        <!-- <td>{{ demande.consommable.categorie }}</td> -->
                        <td class="to_left">{{ demande.validation_status }}</td>
                        <td class="to_left">{{ demande.description }}</td>
                        <td class="to_left">{{ demande.validateur.nom }} {{ demande.validateur.prenom }} {{
                            demande.validateur.email }}
                        </td>
                        <td>
                            <button class="btn btn-success" @click="VoirDemane('voir', demande)">Voir</button>
                        </td>
                    </tr>
                    <tr class="no_print">
                        <td colspan="6">
                            <button v-print="`#demande_en_cours`" class="btn btn-secondary">Imprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_retour" v-if="demande_a_voir">
                <button @click="VoirDemane('fermer', '')" class="btn btn-secondary">Retour</button>
            </div>
            <table border="1" class="m-5 bg-light" v-if="demande_a_voir" :id="demande_a_voir._id">

                <div>
                    <Entete class="entete" />

                    <thead>

                        <tr>
                            <!-- <th scope="col">Numéro</th> -->
                            <th scope="col">Date d'émission</th>

                            <th scope="col">Status</th>
                            <th scope="col">Commentaire</th>
                            <th>Validateur</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <!-- <td>{{  1 }}</td> -->
                            <td class="to_left">{{ formatDate(demande_a_voir.date_emission) }}</td>
                            <!-- <td>{{ demande.consommable.categorie }}</td> -->
                            <td class="to_left">{{ demande_a_voir.validation_status }}</td>
                            <td class="to_left">{{ demande_a_voir.description }}</td>
                            <td class="to_left">{{ demande_a_voir.validateur.nom }} {{ demande_a_voir.validateur.prenom }}
                                {{
                                    demande_a_voir.validateur.email }}
                            </td>
                        </tr>


                        <tr>

                            <td colspan="5">

                                <table border="1" class="m-5" v-for="(ligne) in demande_a_voir.lignesDemandeAchat"
                                    :key="ligne._id">
                                    <thead>

                                        <tr>
                                            <th scope="col">Consommable</th>
                                            <th scope="col">Quantité</th>

                                            <th scope="col">Commentaire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td class="to_left">{{ ligne.consommable.nom }}</td>

                                            <td class="to_left">{{ ligne.quantite }}</td>

                                            <td class="to_left">{{ ligne.description }}</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3"><button @click="validerDemande(demande_a_voir._id, 'valide')"
                                    class="btn btn-success"
                                    v-if="demande_a_voir.validateur.email == user_email">Valider</button>


                            </td>
                            <td colspan="2">
                                <button v-print="`#${demande_a_voir._id}`" class="btn btn-success">Imprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </div>

            </table>
        </div>

        <div class="demande_traite list_demande" v-if="display_demande_traite">
            <h1 class="titre bg-light">Demandes traitées</h1>
            <h5 class="bg-light titre" v-if="listDemandeTraite.length == 0">Aucune demande</h5>

            <!-- Liste des demandes validées -->

            <table border="1" class="m-5 bg-light" v-if="!demande_traite_a_voir" id="demande_traite">
                <Entete class="entete" />
                <thead>
                    <tr>
                        <th class="th" colspan="6">
                            <h3>Demandes d'achat traitées</h3>
                        </th>
                    </tr>

                    <tr>
                        <th class="" scope="col">Numéro</th>
                        <th class="" scope="col">Date d'émission</th>

                        <th class="" scope="col">Status</th>
                        <th class="" scope="col">Commentaire</th>
                        <th class="">Validateur</th>
                        <th class="no_print">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(demande, i) in listDemandeTraite" :key="demande._id">
                        <td>{{ i + 1 }}</td>
                        <td class="to_left">{{ formatDate(demande.date_emission) }}</td>

                        <td class="to_left">{{ demande.validation_status }}</td>
                        <td class="to_left">{{ demande.description }}</td>
                        <td class="to_left">{{ demande.validateur.nom }} {{ demande.validateur.prenom }} {{
                            demande.validateur.email }}
                        </td>
                        <td>
                            <button class="btn btn-success" @click="VoirDemaneTraite('voir', demande)">Voir</button>
                        </td>
                    </tr>
                    <tr class="no_print">
                        <td colspan="6">
                            <button v-print="`#demande_traite`" class="btn btn-secondary">Imprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Demande traitée à afficher -->
            <div class="btn_retour" v-if="demande_traite_a_voir">
                <button @click="VoirDemaneTraite('fermer', '')" class="btn btn-secondary">Retour</button>
            </div>
            <table border="1" class="m-5 bg-light" v-if="demande_traite_a_voir" :id="demande_traite_a_voir._id">
                <Entete class="entete" />
                <div>


                    <thead>

                        <tr>

                            <th scope="col">Date d'émission</th>

                            <th scope="col">Status</th>
                            <th scope="col">Commentaire</th>
                            <th>Validateur</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>

                            <td class="to_left">{{ formatDate(demande_traite_a_voir.date_emission) }}</td>

                            <td class="to_left">{{ demande_traite_a_voir.validation_status }}</td>
                            <td class="to_left">{{ demande_traite_a_voir.description }}</td>
                            <td class="to_left">{{ demande_traite_a_voir.validateur.nom }} {{
                                demande_traite_a_voir.validateur.prenom }} {{
        demande_traite_a_voir.validateur.email }}
                            </td>
                        </tr>


                        <tr>

                            <td colspan="4">

                                <table border="1" class="m-2" v-for="(ligne) in demande_traite_a_voir.lignesDemandeAchat"
                                    :key="ligne._id">
                                    <thead>

                                        <tr>
                                            <th scope="col">Consommable</th>
                                            <th scope="col">Quantité</th>

                                            <th scope="col">Commentaire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>{{ ligne.consommable.nom }}</td>

                                            <td>{{ ligne.quantite }}</td>

                                            <td>{{ ligne.description }}</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr class="no_print">

                            <td colspan="4">
                                <button class="btn btn-success" v-print="`#${demande_traite_a_voir._id}`">Imprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </div>

            </table>
        </div>


    </div>
</template>

<script>
import print from 'vue3-print-nb'

import { getAllUser } from '@/api/utilisateur';
import { getAllConsommables } from '@/api/consommable';
import { getAllEquipements } from '@/api/equipement';
import { createDemande, createLigneDemande, getAllDemande, getAllLignesDemande, Validation, Traitement } from '@/api/demande_achat'
import Swal from 'sweetalert2';
import Entete from '@/components/Entete.vue';
export default {
    name: "DemandeAchat",
    components: {
        Entete,
    },
    data() {
        return {
            user: "",
            user_email: '',
            list_users: [],
            display_demande_form: true,
            display_ligne_demande_form: false,
            display_formulaire: false,
            display_demanande_en_cours: true,
            display_demande_valide: false,
            display_demande_traite: false,
            demande_infos: {
                description: "",
                date_emission: null,
                emetteur: {},
                validation_status: false,
                validateur: {}
            },
            ligne_demande: {
                consommable: {
                    nom: ""
                },
                quantite: "",
                description: "",
                demande_achat: ""
            },
            commentaire: "",
            demande_en_cours: [],
            id_demande: "",
            list_equipement: [],
            list_consommable: [],
            list_demande: [],
            list_lignes_achat: [],
            //demande en cours à afficher
            demande_a_voir: "",
            demande_valide_a_voir: "",
            demande_traite_a_voir: ""
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("user"))
        this.chargerConso()
        this.chargerEquipement()
        this.chargerDemande()
        this.chargerUtolisateurs()
        // Exécuter Appel toutes les 1 minute (60 000 millisecondes)
        setInterval(() => {
            this.Appel();
        }, 10000);
        this.user_email = this.user.email

    },
    directives: {
        print
    },
    computed: {
        listDemandeValidee() {
            return this.list_demande.filter(demande => demande.validation_status == 'valide');
        },
        listDemandeTraite() {
            return this.list_demande.filter(demande => demande.validation_status == 'traite');
        },

        listDemandeNonValidees() {
            return this.list_demande.filter(demande => demande.validation_status == 'en_cours');
        }
    },

    methods: {
        formatDate(date) {
            // Méthode pour formater la date au format souhaité
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('fr-FR', options);
        },
        VoirDemane(option, demande) {
            if (option == 'voir') {
                this.demande_a_voir = demande
                console.log(this.demande_a_voir)
            } else if (option == 'fermer') {
                this.demande_a_voir = ""
            }

        },

        VoirDemaneValide(option, demande) {
            if (option == 'voir') {
                this.demande_valide_a_voir = demande
                console.log(this.demande_valide_a_voir)
            } else if (option == 'fermer') {
                this.demande_valide_a_voir = ""
            }

        },

        VoirDemaneTraite(option, demande) {
            if (option == 'voir') {
                this.demande_traite_a_voir = demande
                console.log(this.demande_traite_a_voir)
            } else if (option == 'fermer') {
                this.demande_traite_a_voir = ""
            }

        },

        async creerDemande() {
            if (this.commentaire.length <= 2) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Tous les champs sont obligatoires.',
                    icon: 'error',
                });
                return;
            }

            if (!this.demande_infos.validateur.nom) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Tous les champs sont obligatoires.',
                    icon: 'error',
                });
                return;
            }

            this.demande_infos.description = this.commentaire;
            this.demande_infos.emetteur = this.user;
            this.demande_infos.date_emission = Date.now();
            this.demande_infos.validation_status = "en_cours";

            // Afficher une boîte de dialogue de confirmation
            const confirmation = await Swal.fire({
                title: 'Confirmer la création de la demande',
                text: 'Êtes-vous sûr de vouloir créer cette demande ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler',
            });

            if (confirmation.isConfirmed) {
                try {
                    const response = await createDemande(this.demande_infos);
                    console.log("Demande créée : ", response);
                    localStorage.setItem("id", response._id);
                    // console.log("ID : ", response._id);
                    this.changeDisplayForm(1);
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une erreur s\'est produite.',
                        icon: 'error',
                    });
                }
            }
        },



        async validerDemande(_id, _validation_status) {
            const id = _id;
            const validation_status = _validation_status;

            // Affiche une boîte de dialogue de confirmation
            const confirmation = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir valider cette demande ?',
                text: 'Cette action est irréversible.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Valider',
                cancelButtonText: 'Annuler',
            });

            if (confirmation.isConfirmed) {
                // L'utilisateur a cliqué sur le bouton "Valider"
                try {
                    const response = await Validation(id, validation_status);
                    // Faites quelque chose après la validation
                } catch (error) {
                    console.error(error);
                    // Gérez les erreurs ici
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une erreur s\'est produite.',
                        icon: 'error',
                    });
                }
            }
        },


        async traiterDemande(_id, _validation_status) {
            const id = _id;
            const validation_status = _validation_status;

            // Affiche une boîte de dialogue de confirmation
            const confirmation = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir traiter cette demande ?',
                text: 'Cette action est irréversible.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Traiter',
                cancelButtonText: 'Annuler',
            });

            if (confirmation.isConfirmed) {
                // L'utilisateur a cliqué sur le bouton "Traiter"
                try {
                    const response = await Traitement(id, validation_status);
                    // Faites quelque chose après le traitement
                } catch (error) {
                    console.error(error);
                    // Gérez les erreurs ici
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une erreur s\'est produite.',
                        icon: 'error',
                    });
                }
            }
        },

        /*     async creerLigneDemane() {
                console.log(this.ligne_demande)
                this.ligne_demande.demande_achat = localStorage.getItem("id")
                if (!this.ligne_demande.description || !this.ligne_demande.quantite || !this.ligne_demande.consommable) {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Tous les champs doivent etre remplis.',
                        icon: 'error',
                    });
                    return
                }
    
                const li = this.list_demande
                // console.log("ligne: ", this.ligne_demande)
                try {
                    const response = await createLigneDemande(this.ligne_demande)
                    Swal.fire({
                        title: 'Succès',
                        text: 'Créé avec succès.',
                        icon: 'success',
                    });
                    console.log(response)
                } catch (error) {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une erreur s\'est produite.',
                        icon: 'error',
                    });
                    console.log(this.ligne_demande)
                }
                this.demande_en_cours.push(this.ligne_demande)
                localStorage.setItem("demande_en_cours", JSON.stringify(this.ligne_demande))
                this.ligne_demande = JSON.parse(localStorage.getItem("demande_en_cours"))
            }, */

        async creerLigneDemane() {
            console.log(this.ligne_demande);
            this.ligne_demande.demande_achat = localStorage.getItem("id");

            if (!this.ligne_demande.description || !this.ligne_demande.quantite || !this.ligne_demande.consommable) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Tous les champs doivent être remplis.',
                    icon: 'error',
                });
                return;
            }

            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir créer cette ligne de demande ?',
                    text: 'Voulez-vous vraiment ajouter cette ligne de demande ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, ajouter la ligne de demande !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    const response = await createLigneDemande(this.ligne_demande);

                    Swal.fire({
                        title: 'Succès',
                        text: 'Créé avec succès.',
                        icon: 'success',
                    });

                    console.log(response);

                    this.demande_en_cours.push(this.ligne_demande);
                    localStorage.setItem("demande_en_cours", JSON.stringify(this.ligne_demande));
                    this.ligne_demande = JSON.parse(localStorage.getItem("demande_en_cours"));
                    this.ligne_demande = {

                        consommable: {
                            nom: ""
                        },
                        quantite: "",
                        description: "",
                        demande_achat: ""
                    }
                } else {
                    // L'utilisateur a annulé la création de la ligne de demande
                    console.log('Création de la ligne de demande annulée.');
                }
            } catch (error) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite.',
                    icon: 'error',
                });
                console.log(this.ligne_demande);
            }
        }

        ,

        async chargerConso() {
            try {
                this.list_consommable = await getAllConsommables()
            } catch (error) {
                console.log(error)
            }
        },
        async chargerDemande() {
            try {
                this.list_demande = await getAllDemande()
                // console.log("demandes: ", this.list_demande)
            } catch (error) {
                console.log(error)
            }
        },
        /*   terminer() {
              this.demande_en_cours = [];
              this.demande_infos = {};
              this.ligne_demande = {};
              this.commentaire = "";
              this.changeDisplay2("en_cours")
          }, */
        terminer() {
            Swal.fire({
                title: 'Êtes-vous sûr de vouloir terminer ?',
                text: 'Voulez-vous vraiment terminer cette opération ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, terminer !',
                cancelButtonText: 'Annuler'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Actions à effectuer en cas de confirmation
                    this.demande_en_cours = [];
                    this.demande_infos = {};
                    this.ligne_demande = {

                        consommable: {
                            nom: ""
                        },
                        quantite: "",
                        description: "",
                        demande_achat: ""
                    };
                    this.commentaire = "";
                    this.changeDisplay2("en_cours");

                    Swal.fire({
                        title: 'Terminé',
                        text: 'L\'opération a été terminée avec succès.',
                        icon: 'success'
                    });
                } else {
                    // L'utilisateur a annulé l'opération
                    console.log('Opération de terminaison annulée.');
                }
            });
        }


        ,

        async chargerUtolisateurs() {
            try {
                this.list_users = await getAllUser()
                // console.log("user: ", this.list_users)

            } catch (error) {
                console.log(error)
            }
        },

        async chargerLigneDemande() {
            try {
                this.list_lignes_achat = await getAllLignesDemande()
                // console.log(" ligne demandes: ", this.list_lignes_achat)
            } catch (error) {
                // console.log(error)
            }
        },
        async chargerEquipement() {
            try {
                this.list_equipement = await getAllEquipements()
            } catch (error) {
                console.log(error)
            }
        },
        async Appel() {
            this.chargerDemande()
            this.chargerConso();
            this.chargerUtolisateurs()
            // this.listDemandeValidee()
            // this.chargerLigneDemande()

        },
        changeDisplayForm(entre) {
            if (entre == 1) {
                this.display_demande_form = false;
                this.display_ligne_demande_form = true
            } else if (entre == 2) {
                this.display_demande_form = true;
                this.display_ligne_demande_form = false
            }
        },
        changeDisplay2(entre) {
            if (entre == 'form') {
                this.display_formulaire = true;
                this.display_demanande_en_cours = false;
                this.display_demande_valide = false;
                this.display_demande_traite = false;

            } else if (entre == 'en_cours') {
                this.display_demanande_en_cours = true;
                this.display_formulaire = false;
                this.display_demande_traite = false;
                this.display_demande_valide = false;

            } else if (entre == 'valide') {
                this.display_demande_valide = true;
                this.display_formulaire = false;
                this.display_demanande_en_cours = false;
                this.display_demande_traite = false;

            } else if (entre == 'traite') {
                this.display_demande_valide = false;
                this.display_formulaire = false;
                this.display_demanande_en_cours = false;
                this.display_demande_traite = true;
            }
        }
    }

}
</script>

<style scoped>
.list_demande {
    max-height: 100vh;
    /* Remplacez 300px par la hauteur souhaitée */
    overflow-y: auto;
    /* Active la barre de défilement verticale si nécessaire */
}

.entete {
    display: none;
}

.btn {
    width: 100px;
}

.menu {
    /* background-color: rgba(121, 113, 236, 0.7); */
    padding: 0;
    width: 100%;
}

.menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.menu li {
    flex: 1;
}

.menu li a {
    display: block;
    text-align: center;
    /* padding: 5px; */
    color: #fff;
    text-decoration: none;
}

.menu li a:hover {
    background-color: #555;
}

.btn_li {
    border-radius: 5px;
}





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

.to_left {
    text-align: left;
    padding-left: 5px;
}

label {
    color: black !important;
}


.titre {
    font-weight: bold;
    /* color: aliceblue; */
}

label {
    color: white;
}



@media print {

    .btn,
    .no_print {
        display: none;

    }

    .th {
        font-weight: bold;
        background-color: rgb(90, 88, 88) !important;
        border: 1;
    }

    .entete {
        display: flex;
        width: 100%;
    }


}
</style>