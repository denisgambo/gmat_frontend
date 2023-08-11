<template>
    <div class="contenu">
        <div class="menu-vertical">
            <div class="equipement vertical-item">
                <button type="button" class="hb" @click="allerAuxEquipement()">
                    <img src="../assets/logo/logoesuipement.png" alt="">
                    <h3>Equipement</h3>
                </button>
            </div>

            <div class="consommable vertical-item">
                <button type="button" class="hb" @click="allerAuxConsommables()">
                    <img src="../assets/logo/logoconsommable.png" alt="">
                    <h3>Consommables</h3>

                </button>
            </div>
            <!-- @click="allerAuxMaintenances()" -->
            <div class="maintenance vertical-item">
                <router-link to="/maintenance">
                    <button type="button" class="hb">

                        <img src="../assets/logo/consommation.png" alt="" srcset="">
                        <h3>Opérations</h3>

                    </button>
                </router-link>

            </div>

        </div>

        <div class="menu-horizontal">
            <MenuBar />
        </div>

        <div class="espace" :style="{
            backgroundImage: `url(${entreprise.background_image_dashbord
                })`
        }">
            <h2 class="texte">{{ texte }}</h2>


            <Consommable v-if="displayConsommable" />
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



                    <button class="voir_et_retour" type="button" @click="back()">retour</button>
                    <button class="voir_et_retour" type="button" v-print="'#printMe'">Imprimer</button>
                    <table border="1" class="t1" id="printMe">
                        <Entete class="entete" />

                        <thead>
                            <tr class="header">
                                <td>Nom</td>
                                <td>categorie</td>
                                <td>Service</td>
                                <td>Marque</td>
                                <td>Code inventaire</td>
                                <td>Référence</td>
                                <td>Localité</td>
                                <td>Description</td>

                                <td class="no-print">Maintenances</td>
                            </tr>
                        </thead>
                        <tbody>
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
                                        class="btn btn-secondary btn1">Voir
                                        la
                                        liste
                                        des
                                        maintenances</button>
                                </td>
                            </tr>
                            <!--   <tr class="no-print ">
                                <td>
                                    <button type="button" v-print="'#printMe'">Imprimer</button>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                    <div class="justify-content-center">
                        <button class="btn btn-secondary" type="button" v-print="'#printMe'">Imprimer</button>
                    </div>
                </div>

                <!-- Afficher la liste des maintenance -->

                <div class="list-maintenance" v-if="displayListMaintenance" id="list-maintenance">
                    <Entete class="entete" />
                    <h1>Maintenance concernant cet équipement</h1>
                    <button type="button" v-print="'#list-maintenance'">Imprimer</button>
                    <table border="1" class="cons">
                        <thead>
                            <tr class="header">
                                <td>Equipement</td>
                                <td>Anomalie</td>
                                <td>Consommation</td>
                                <td>Autres dépenses</td>
                                <td>Horamètre</td>
                                <td>Maintenancier</td>
                                <td>Date d'entrée</td>
                                <td>Date de sortie</td>
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
import { getCategories, getEquipementByCategorie, NombreEquipementByCat } from '../api/equipement';
import { getEntreprise } from '@/api/parametre';
export default {
    name: 'TableauDeBord',
    components: {
        Consommable,
        MenuBar,
        Entete
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
            texte: "Toutes les catégories d'équipements",
            displayEspace: true,
            displayConsommable: false,
            listMaintenance: "",
            singleMaintenance: "",
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
        /*  async enregistrerConnexion(user) {
 
             try {
                 response = await createConnexion(user)
                 alert("Succès")
                 console.log(response.status)
             } catch (error) {
                 console.log(error)
             }
         }, */
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
            this.texte = "Toutes les catégories d'équipements";
            this.displayListMaintenance = false;
        },
        allerAuxConsommables() {
            this.displayEspace = false;
            this.displayConsommable = true;
            this.displayEquipementByCategorie = false;
            store.state.menu_consommables = true
            store.state.menu_equipements = false
            this.texte = "Toutes les catégories de consommables"
        },
        allerAuxEquipement() {
            this.displayEspace = true;
            this.displayConsommable = false;
            store.state.menu_equipements = true
            store.state.menu_consommables = false,
                this.texte = "Toutes les catégories d'équipements"
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
.entete {
    display: none;
}

.contenu {
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-template-rows: 20% 1fr;
    background-color: #6F6F6F;
}

.menu-vertical {
    background-color: #00FFFF;
    /*  background: url("https://cdn.wallpapersafari.com/55/84/OW9N2b.jpg");
    background-size: cover; */
    grid-row: 1 / span 2;
}

/* .menu-horizontal {
    background-color: #6F6F6F;
    display: flex;
    justify-content: space-between;
} */

.espace {
    /* background-color: #abf794; */
    /* background: url("../assets/images/beautiful-view.avif"); */
    background-size: cover;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
}

.vertical-item {
    width: 100%;
    height: 150px;
    margin-bottom: 40px;
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

h1,
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

.list-equipement {
    width: 100%;
}

table {
    border-collapse: collapse;
    width: 100%;
    background-color: white !important;
}

td {
    border: 1px solid black;
    padding: 10px;
}

.header {
    font-weight: bold;
    background-color: lightgray !important;
}

th {
    padding: 10px;
    /* background-color: lightgray; */
}



.list-maintenance {
    margin-top: 20px;
}

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

h1 {
    color: white !important;
    background-color: rgb(94, 13, 245) !important;
}

.texte {
    background-color: #00BF63;
}

.voir_et_retour {
    background-color: #00FFFF;
    height: 30px;
    border-radius: 7px;
}

.btn1 {
    border: none;
    background-color: rgb(189, 169, 142);
}
</style>
