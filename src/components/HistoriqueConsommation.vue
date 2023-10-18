<template>
    <div class="container">
        <h2>Historique des consommations</h2>
        <div class="lis_btn no-print">
            <button @click="changeDisplay(1)" class="btn1" type="button">Historique par consommable </button>
            <button @click="changeDisplay(2)" class="btn1" type="button">Historique par équipement </button>

        </div>
        <div class="historique_par_consommation" v-if="display_by_consommable">
            <div class="consommable_form">
                <form action="" class="no-print">
                    <table border="1">
                        <thead>
                            <th>Choisir un consommable</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select v-model="consommable_choisi" name="consommable" id="" required
                                        @change="chargerConsommation(consommable_choisi)">
                                        <option value="" disabled selected>-- Sélectionnez --</option>
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

                <table border="1">

                    <tr class="header">
                        <td>Equipement</td>
                        <td>Consommable</td>
                        <td>Quantité de départ stock</td>
                        <td>Quantité consommée</td>
                        <td>Quantité restante stock</td>
                        <td>Horamètre</td>
                        <td>Date</td>
                        <td>Justification</td>
                        <td v-if="display_auteur">Auteur</td>
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
                            <td>{{ hist.description }}</td>

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
                            <th>Choisir un équipement</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select v-model="equipement_choisi" name="equipement" id="" required
                                        @change="chargerConsommationEq(equipement_choisi)">
                                        <option value="" disabled selected>-- Sélectionnez --</option>
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

                <table border="1">

                    <tr class="header">
                        <td>Equipement</td>
                        <td>Consommable</td>
                        <td>Quantité de départ stock</td>
                        <td>Quantité consommée</td>
                        <td>Quantité restante stock</td>
                        <td>Horamètre</td>
                        <td>Date</td>
                        <td>Justification</td>
                        <td v-if="display_auteur">Auteur</td>

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
                            <td>{{ hist.description }}</td>

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

.container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
}

form {
    width: 100%;
}

table {
    border-collapse: collapse;
    width: 80%;
    background-color: white !important;
    margin: 5px auto;
    /* margin: 20px; */
}

td {
    border: 1px solid black;
    padding: 5px;
}

.header {
    font-weight: bold;
    background-color: lightgray !important;
}

th {
    padding: 5px;
}

.btn1 {
    background-color: rgb(146, 236, 146);
    height: 50px;
    width: 240px;
    margin-left: 30px;
    border-radius: 10px;
    margin-bottom: 20px;

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