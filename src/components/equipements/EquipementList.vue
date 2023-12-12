<template>
    <div>
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
        <div id="list_equipement" class="list_equipement" v-if="display_table">

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


                            <button @click="SupprimerEq(equipement._id)" class="btn btn-sm m-2 no_print" title="Supprimer">
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
</template>

<script>
import { getAllEquipementsWithCat, updateDisponibilite, supprimerEquipement, updateEquipement } from '@/api/equipement'

import print from 'vue3-print-nb'
import { testAdminUser, testGestionnaireUser } from '/auth/auth-guard-admin';
import router from '@/router';
import Swal from 'sweetalert2'
import { createRebut } from '@/api/rebut';
import Entete from '../Entete.vue';
export default {
    name: "EquipementList",
    directives: {
        print
    },
    components: {
        Entete
    },
    /*  props: {
         list_categorie: {
             type: Array,
             required: true
         },
         list_localite: {
             type: Array,
             required: true
         }
     }, */
    data() {
        return {
            user: "",
            equipementSearch: [],
            display_table: false,
            display_card: true,
            list_equipement: [],
            search: "",
            input_service: "",
            input_localite: "",
            search_setting: "nom",
            services: "",
            input_categorie: "",
        }
    },
    computed: {
        searchEq() {

            return (this.equipementSearch.filter((equipement) => {
                return equipement.nom.toLowerCase().includes(this.search.toLocaleLowerCase()) && equipement.categorie.toLocaleLowerCase().includes(this.input_categorie.toLocaleLowerCase()) && equipement.localite.toLocaleLowerCase().includes(this.input_localite.toLocaleLowerCase()) && equipement.service.toLocaleLowerCase().includes(this.input_service.toLocaleLowerCase())
            }))
        },
    },

    created() {
        this.chargerEquipement()
        setInterval(() => {
            this.Appel();
        }, 10000);
    },
    methods: {
        async chargerEquipement() {
            try {
                this.list_equipement = await getAllEquipementsWithCat();
                this.equipementSearch = [...this.list_equipement]
                // console.log("liste des équipements: ", this.list_equipement)
            } catch (error) {
                console.log(error)
            }
        },
        Appel() {
            this.chargerEquipement();
            this.user = JSON.parse(localStorage.getItem("user"));
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
        cancelSeach() {
            this.input_categorie = ""
            this.input_service = ""
            this.input_localite = ""
            this.search = ""
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
                } else {
                    console.log("Action annulé")
                    // L'utilisateur a annulé
                    // Vous pouvez ajouter un code ici si nécessaire
                }
            });
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

.fa-trash-alt {
    color: red;
}

.fa-edit {
    color: blue;
}

.fa-power-off {
    color: red;
}

.list_equipement {
    height: 100vh;
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