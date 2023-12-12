<template>
    <div class="contenu">
        <div class="menu-vertical">
            <div class="equipement vertical-item">
                <button type="button" class="hb" @click="changeDisplay('eq')">
                    <img src="../assets/logo/logoesuipement.png" alt="">
                    <h3>TB EQUIPEMENTS</h3>
                </button>
            </div>

            <div class="consommable vertical-item">
                <button type="button" class="hb" @click="changeDisplay('cons')">
                    <img src="../assets/logo/logoconsommable.png" alt="">
                    <h3>TB CONSOMMABLES</h3>

                </button>
            </div>
            <!-- @click="allerAuxMaintenances()" -->
            <div class="maintenance vertical-item">
                <button type="button" class="hb" @click="changeDisplay('op')">
                    <img src="../assets/logo/consommation.png" alt="" srcset="">
                    <h3>TB OPERATIONS</h3>
                </button>


            </div>


        </div>
        <MenuBar />




        <div class="espace" :style="{
            backgroundImage: `url(${entreprise.background_image_dashbord
                })`
        }">



            <h1 class="bg-light">{{ texte }}</h1>

            <Consommable v-if="displayConsommable" />
            <div v-if="$store.state.menu_operation">


                <div class="demande_achat" v-if="$store.state.menu_demandes">
                    <!-- <h2 class="bg-light">Les demandes d'achats</h2> -->
                    <DemandeAchat />
                </div>
            </div>
            <div class="list-categories" v-if="displayCategorie > 0 && displayEspace">


                <div class="single-categorie" v-for="categorie in categories" :key="categorie._id">
                    <h4>{{ categorie.nom }}</h4>
                    <h5>Nombre: {{ categorie.nombre_equipements }}</h5>
                    <!-- {{ categorie.description }} <br> -->

                    <button class="btn btn1 btn-secondary btn-sm" @click="equipementByCat(categorie._id)" type="button">
                        Voir la
                        liste
                        des
                        équipement</button>
                </div>
                <!-- <button @click="enregistrerConnexion(user)">test</button> -->

            </div>


            <div class="list-equipement" v-if="displayEquipementByCategorie">
                <div>



                    <button class="btn btn-sm btn-secondary m-2" type="button" @click="back()">retour</button>
                    <button class="btn btn-sm btn-secondary m-2" type="button" v-print="'#printMe'">Imprimer</button>
                    <table border="1" class="t1 bg-light" id="printMe">
                        <Entete class="entete" />

                        <thead>
                            <tr class="header">
                                <th>Nom</th>
                                <th>categorie</th>
                                <th>Service</th>
                                <th>Marque</th>
                                <th>Code inventaire</th>
                                <th>Référence</th>
                                <th>Localité</th>
                                <th>Description</th>

                                <td class="no-print bg-light">Maintenances</td>
                            </tr>
                        </thead>
                        <tbody class="bg-light">
                            <tr v-for="equipement in equipementByCategorie" :key="equipement._id">
                                <td>{{ equipement.nom }}</td>
                                <td>{{ equipement.categorie.nom }}</td>
                                <td>{{ equipement.service }}</td>
                                <td>{{ equipement.marque }}</td>
                                <td>{{ equipement.code_inventaire }}</td>
                                <td>{{ equipement.reference }}</td>
                                <td>{{ equipement.localite.nom }}</td>
                                <td>{{ equipement.description }}</td>


                                <td class="no-print"><button @click="chargerMaintenance(equipement.nom)"
                                        class="btn btn-primary">
                                        <i class="fas fa-eye"></i> Voir
                                    </button>

                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="justify-content-center">
                        <button class="btn btn-sm btn-secondary m-2" type="button" v-print="'#printMe'">Imprimer</button>
                    </div>
                </div>

                <!-- Afficher la liste des maintenance -->

                <div class="list-maintenance" v-if="displayListMaintenance" id="list-maintenance">
                    <Entete class="entete" />
                    <h1>Maintenance concernant cet équipement</h1>
                    <button type="button" v-print="'#list-maintenance'">Imprimer</button>
                    <table border="1" class="cons bg-light">
                        <thead>
                            <tr>
                                <th>Equipement</th>
                                <th>Anomalie</th>
                                <th>Consommation</th>
                                <th>Autres dépenses</th>
                                <th>Horamètre</th>
                                <th>Maintenancier</th>
                                <th>Date d'entrée</th>
                                <th>Date de sortie</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="maint in singleMaintenance" :key="maint._id">
                                <td>{{ maint.equipement }}</td>
                                <td>{{ maint.anomailie }}</td>
                                <td>

                                    <li v-for="consommable in maint.consommables" :key="consommable.nom">
                                        {{ consommable.nom }}: {{ consommable.quantite }}
                                    </li>

                                </td>
                                <td>
                                    <ul v-if="maint.autres_depenses.length > 0">
                                        <li v-for="dep in maint.autres_depenses" :key="dep">
                                            {{ dep.designation }}: {{ dep.montant }}
                                            <hr>
                                        </li>

                                    </ul>
                                </td>
                                <td>{{ maint.horametre }}</td>
                                <td>{{ maint.operateur_maintenance }}</td>
                                <td>{{ new Date(maint.date_entree).toLocaleDateString() }}</td>
                                <td>{{ new Date(maint.date_sortie).toLocaleDateString() }}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>

        </div>


    </div>
</template>

<script>
import { createConnexion } from '@/api/historique_connxion';
import print from 'vue3-print-nb'
import store from '@/store';
import { getAllMaintenanceWithAgregation } from '@/api/maintenance'
import Consommable from '../components/Consommable.vue';
import Entete from '@/components/Entete.vue';
import MenuBar from '@/components/MenuBar.vue';
import Maintenance from '@/views/Maintenance.vue';
import DemandeAchat from './DemandeAchat.vue';
import MenuMaintenance from '@/components/MenuMaintenance.vue';
import { getCategories, getEquipementByCategorie, NombreEquipementByCat } from '../api/equipement';
import { getEntreprise } from '@/api/parametre';
export default {
    name: 'TableauDeBord',
    components: {
        Consommable,
        MenuBar,
        Entete,
        Maintenance,
        DemandeAchat,
        MenuMaintenance
    },
    directives: {
        print
    },

    data() {
        return {
            categories: "",
            displayCategorie: true,
            equipementByCategorie: "",
            displayEquipementByCategorie: false,
            texte: "Tableau de bord:Catégories d'équipements",
            displayEspace: true,
            displayConsommable: false,
            listMaintenance: "",
            singleMaintenance: "",
            display_operation: false,
            display_demande: false,
            displayListMaintenance: false,
            statistic_par_cat: {},
            display_nbr_par_cat: false,
            user: "",
            entreprise: ""
        }
    },

    async created() {
        this.allCategories();
        this.chargerStatisticByCat();

        this.user = JSON.parse(localStorage.getItem("user"))
        this.entreprise = await getEntreprise()

    },


    methods: {
        async allCategories() {
            try {
                this.categories = await getCategories();
                // console.log(this.categories);
            } catch (error) {
                console.log(error)
            }
        },

        async equipementByCat(categorieId) {
            try {
                this.equipementByCategorie = await getEquipementByCategorie(categorieId);
                // console.log("Equipents par catégorie", this.equipementByCategorie);
                this.displayCategorie = false;
                this.displayEquipementByCategorie = true;
                this.texte = "Listes des équipements"
            } catch (error) {
                console.log(error)
            }
        },
        back() {
            this.displayEquipementByCategorie = false,
                this.displayCategorie = true;
            this.texte = "Tableau de bord:Catégories d'équipements";
            this.displayListMaintenance = false;
        },
        allerAuxConsommables() {
            this.displayEspace = false;
            this.displayConsommable = true;
            this.displayEquipementByCategorie = false;
            store.state.menu_consommables = true
            store.state.menu_equipements = false
            this.texte = "Tableau de bord:Catégories de consommables"
        },
        allerAuxEquipement() {
            this.displayEspace = true;
            this.displayConsommable = false;
            store.state.menu_equipements = true
            store.state.menu_consommables = false,
                this.texte = "Tableau de bord:Catégories d'équipements"
        },

        changeDisplay(option) {
            if (option == "eq") {
                this.displayEspace = true;
                this.displayConsommable = false;
                store.state.menu_equipements = true
                store.state.menu_consommables = false,
                    store.state.menu_operation = false
                // this.display_operation = false;
                this.display_demande = false;
                this.texte = "Tableau de bord:Catégories d'équipements"
            } else if (option == "cons") {
                this.displayEspace = false;
                this.displayConsommable = true;
                this.displayEquipementByCategorie = false;
                store.state.menu_consommables = true
                store.state.menu_equipements = false
                store.state.menu_operation = false
                // this.display_operation = false
                this.texte = "Tableau de bord:Catégories de consommables";
                this.display_demande = false;
            } else if (option == 'op') {
                this.displayEspace = false;
                this.displayConsommable = false;
                this.displayEquipementByCategorie = false;
                store.state.menu_consommables = false
                store.state.menu_equipements = false
                store.state.menu_operation = true
                // this.display_operation = true
                this.texte = "Les opérations";
                this.display_demande = false;

            } else if (option == 'dem') {
                this.display_demande = true,
                    this.displayEspace = false;
                this.displayConsommable = false;
                this.displayEquipementByCategorie = false;
                store.state.menu_consommables = false
                store.state.menu_equipements = false
                // store.state.menu_demandes = true
                store.state.menu_operation = false
                // this.display_operation = false
                this.texte = "Demandes d'achats"
            }
        },

        async chargerMaintenance(equipementId) {
            try {
                this.listMaintenance = await getAllMaintenanceWithAgregation();
                // console.log("all", this.listMaintenance)
                this.singleMaintenance = this.listMaintenance.filter(maintenance => maintenance.equipement === equipementId);
                // console.log("single", this.singleMaintenance);
                this.displayListMaintenance = true;
            } catch (error) {
                console.log(error);
            }
        },

        async chargerStatisticByCat() {
            try {
                this.statistic_par_cat = await NombreEquipementByCat();
                // console.log("statistic:", this.statistic_par_cat)
            } catch (error) {
                console.log(error)
            }
        },


        imprimerTableaux() {
            window.print();
        }


    },


}
</script>




<style scoped>
/* Tableau des utilisateurs */
table {
    border-collapse: collapse;
    width: 80%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

th {
    background-color: #f2f2f2;
}

.entete {
    display: none;
}

.contenu {
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-template-rows: 20% 1fr;
    /* background-color: #6F6F6F; */
}

.menu-vertical {
    background-color: #00FFFF;
    margin-top: 120px;
    grid-row: 1 / span 2;
    height: 100%;
}

.menu-horizontal {
    margin-top: 120px;
}


.espace {
    padding-top: 0;
    margin: 0;
    background-size: cover;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
}

.vertical-item {
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    border-radius: 15px;
}

.menu-vertical>button {
    border-radius: 15px;
}



.equipement {
    background-color: #2C64C6;
}

.consommable {
    background-color: #00BF63;
}

.maintenance {
    background-color: #FFBD59;
}


.hb {
    width: 100%;
    background-color: transparent;
    height: 100%;
}

.single-categorie {
    background-color: bisque;
    width: 25%;
    height: 150px;
    margin: 10px;
    border-radius: 10px;
}


h2,
h3,
h5,
h4 {
    font-family: system-ui;
    font-weight: bold;

}

h4 {
    font-size: 18px;
}

h5 {
    font-size: 15px;
}

h3 {
    font-size: 20px;
}


.list-categories {
    display: flex;
    flex-wrap: wrap;
}




/* css du menu horizontal*/


.hb>img {
    width: 40%;
}

.achat {
    background-color: blueviolet;
}

.list-equipement {
    width: 100%;
}




/* .list-maintenance {
    margin-top: 10px;
} */

p {
    color: #00BF63 !important;
    font-size: 30px;
    font-weight: bold;
    background-color: blue !important;
}

@media print {
    /* body * {
        display: none;
    } */

    .t1 {
        display: table;
        color: black;
        width: 100%;
        /* margin: 20px auto; */
    }

    .menu-vertical {
        display: none;
    }

    .menu-horizontal {
        display: none;
    }

    button {
        display: none;
    }

    .no-print {
        display: none;
    }

    .entete {
        display: flex;
    }
}

/* h1 {
    color: white !important;
    background-color: rgb(94, 13, 245) !important;
} */

.texte {
    background-color: #00BF63;
}


.btn1 {
    border: none;
    background-color: rgb(189, 169, 142);
    width: 80%;
}
</style>
