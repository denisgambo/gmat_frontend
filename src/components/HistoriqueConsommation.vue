<template>
    <div class="container">
        <!-- <h2 class="titre">Historique des consommations</h2> -->
        <div class="lis_btn no-print">
            <button @click="changeDisplay(1)" class="btn btn-secondary m-2" type="button">Historique par consommable
            </button>
            <button @click="changeDisplay(2)" class="btn btn-secondary m-2" type="button">Historique par équipement
            </button>

        </div>
        <div class="historique_par_consommation" v-if="display_by_consommable">
            <div class="consommable_form">
                <form action="" class="no-print">
                    <table border="1">
                        <thead>
                            <!-- <td style="background-color: aqua;">Choisir un consommable</td> -->
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select v-model="consommable_choisi" name="consommable" id="" required
                                        @change="chargerConsommation(consommable_choisi)">
                                        <option value="" disabled selected>-- Sélectionnez un consommable --</option>
                                        <option v-for="cons in list_consommable" :key="cons._id" :value="cons._id">{{
                                            cons.nom
                                        }}</option>
                                    </select>


                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

            <div class="historique" id="historique">
                <div class="d-flex justify-content-center">
                    <button v-print="'#historique'" class="btn btn-secondary m-2">imprimer</button>
                    <button class="btn btn-secondary m-2" @click="togleAuteur()"
                        v-if="testAdminUser() || testUserControlleur()">{{ auteurButton }}</button>


                </div>
                <Entete class="entete" />

                <table border="1" class="bg-light">

                    <tr>
                        <th>Equipement</th>
                        <th>Consommable</th>
                        <th>Quantité de départ stock</th>
                        <th>Quantité consommée</th>
                        <th>Quantité restante stock</th>
                        <th>Horamètre</th>
                        <th>Date</th>
                        <th>Justification</th>
                        <th v-if="display_auteur">Auteur</th>
                    </tr>

                    <tbody>
                        <tr v-for="hist in historique_par_consommable" :key="hist._id">
                            <td>{{ hist.equipement }}</td>
                            <td>{{ hist.consommable }}</td>
                            <td>{{ hist.quantite_depart }}</td>
                            <td>{{ hist.quantite }}</td>
                            <td>{{ hist.quantite_restante }}</td>
                            <td>{{ hist.hora }}</td>
                            <td>{{ new Date(hist.date).toLocaleDateString() }}</td>
                            <td>
                                <ul>
                                    <li v-for="desc in hist.description" :key="desc">
                                        {{ desc }}
                                    </li>
                                </ul>

                            </td>

                            <td v-if="display_auteur">{{ hist.utilisateur.prenom }} {{ hist.utilisateur.nom }}: {{
                                hist.utilisateur.role }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>

        <!-- Historique par equipement -->

        <div class="par_equipement" v-if="display_by_equipement">
            <div class="consommable_form">
                <form action="" class="no-print">
                    <table border="1">
                        <thead>
                            <!-- <td style="background-color: aqua;">Choisir un équipement</td> -->
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select v-model="equipement_choisi" name="equipement" id="" required
                                        @change="chargerConsommationEq(equipement_choisi)">
                                        <option value="" disabled selected>-- Sélectionnez un équipement --</option>
                                        <option v-for="eq in list_equipements" :key="eq._id" :value="eq._id">{{
                                            eq.nom
                                        }}</option>
                                    </select>


                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

            <div class="historique" id="historique">
                <div class="d-flex justify-content-center">
                    <button v-print="'#historique'" class="btn btn-secondary m-2">imprimer</button>
                    <button class="btn btn-secondary m-2" @click="togleAuteur()"
                        v-if="testAdminUser() || testUserControlleur()">{{ auteurButton }}</button>


                </div>
                <!-- <button v-print="'#historique'">imprimer</button> -->
                <Entete class="entete" />

                <table border="1" class="bg-light">

                    <tr class="header">
                        <th>Equipement</th>
                        <th>Consommable</th>
                        <th>Quantité de départ stock</th>
                        <th>Quantité consommée</th>
                        <th>Quantité restante stock</th>
                        <th>Horamètre</th>
                        <th>Date</th>
                        <th>Justification</th>
                        <th v-if="display_auteur">Auteur</th>

                    </tr>

                    <tbody>
                        <tr v-for="hist in historique_par_equipement" :key="hist._id">
                            <td>{{ hist.equipement }}</td>
                            <td>{{ hist.consommable }}</td>
                            <td>{{ hist.quantite_depart }}</td>
                            <td>{{ hist.quantite }}</td>
                            <td>{{ hist.quantite_restante }}</td>
                            <td>{{ hist.hora }}</td>
                            <td>{{ new Date(hist.date).toLocaleDateString() }}</td>
                            <td>
                                <ul>
                                    <li v-for="desc in hist.description" :key="desc">
                                        {{ desc }}
                                    </li>
                                </ul>

                            </td>

                            <td v-if="display_auteur">{{ hist.utilisateur.prenom }} {{ hist.utilisateur.nom }}: {{
                                hist.utilisateur.role }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import Entete from './Entete.vue';
import { getAllConsommables } from '@/api/consommable';
import { getConsommationByConsommable, getConsommationByEquipement } from '@/api/consommation';
import print from 'vue3-print-nb'
import { getAllEquipements } from '@/api/equipement';

export default {
    name: "HistoriqueConsommation",
    components: {
        Entete
    },
    data() {
        return {
            list_consommable: "",
            list_equipements: "",
            historique_par_consommable: "",
            historique_par_equipement: "",
            consommable_choisi: "",
            equipement_choisi: "",
            display_by_consommable: false,
            display_by_equipement: false,
            display_auteur: true,
            user: "",
            display_entete: false
        }
    },
    directives: {
        print
    },

    created() {
        this.chargerConsommables();
        this.user = JSON.parse(localStorage.getItem("user"))
        // this.chargerConsommation()
    },
    computed: {
        auteurButton() {
            if (this.display_auteur) {
                return "Cacher les auteurs"
            } else {
                return "Afficher les auteurs"
            }
        }
    },

    methods: {
        async chargerConsommables() {
            try {
                this.list_consommable = await getAllConsommables();
                this.list_equipements = await getAllEquipements()
                // this.consommable_choisi = this.list_consommable[0]._id
                // console.log(this.list_consommable)

            } catch (error) {
                console.log(error)
            }
        },

        async chargerConsommation(consommableId) {
            try {
                this.historique_par_consommable = await getConsommationByConsommable(consommableId);
                console.log(this.historique_par_consommable);
            } catch (error) {
                console.log(error);
            }
        },

        async chargerConsommationEq(equipementId) {
            try {
                this.historique_par_equipement = await getConsommationByEquipement(equipementId);
                // console.log(this.historique_par_consommable);
            } catch (error) {
                console.log(error);
            }
        },
        testAdminUser() {
            return this.user.role == "administrateur";
        },
        testUserControlleur() {
            return this.user.role == "controlleur";
        },
        togleAuteur() {
            this.display_auteur = !this.display_auteur
        },

        imprimerHistorique() {
            window.print()
        },

        changeDisplay(number) {
            if (number == 1) {
                this.display_by_consommable = true;
                this.display_by_equipement = false;
            } else if (number == 2) {
                this.display_by_consommable = false;
                this.display_by_equipement = true;
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

form {
    width: 100%;
}




@media print {
    .no-print {
        display: none;
    }

    button {
        display: none;
    }

    table {
        width: 100%;
    }

    .entete {
        display: flex;
    }

}
</style>