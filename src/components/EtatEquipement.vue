<template>
    <div class="men">
        <MenuBar />
    </div>
    <div class="contenu" id="contenu">
        <div class="entete">
            <div class="gauche">
                <h3>REGIE ADMINISTRATIVE</h3>
                <P>CHARGEE DE LA GESTION </P>
                <p>DE L'ASSISTANCE EN ESCALE OUGADOUGOU</p>
                <h3>SETOS</h3>
                <P>SERVICE MAINTENANCE MATERIELS</P>

            </div>

            <div class="droite">
                <img src="../assets/logo/logoracgae.png" alt="" srcset="">
                <h2>RACGAE</h2>
            </div>
        </div>
        <div class="titre">
            <h4>MATERIEL D'ASSISTANCE EN ESCALE(GSE) OUAGA/BOBO</h4>
            <!-- <P v-if="date_du_jour">DISPONIBILITE DU {{ date_du_jour }} </P> -->
            <p v-if="date_debut_semaine && date_fin_semaine">
                DISPONIBILITE DU {{ date_debut_semaine }} au {{ date_fin_semaine }}
            </p>
        </div>
        <div class="nbre_par_cat">
            <table border="1" class="t1">

                <thead>
                    <tr>
                        <td colspan="2">
                            <h5>Parc matériels RACGAE</h5>
                        </td>
                    </tr>
                    <tr class="header">
                        <th>Type/Engins</th>
                        <th>Nombre</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cat in nbre_equipement_par_cat" :key="cat.nom">
                        <td>{{ cat.categorie }}</td>
                        <td>{{ cat.nombreEquipements }}</td>
                    </tr>
                </tbody>
            </table>


            <table border="1" class="t1">
                <thead>
                    <tr>
                        <td colspan="2">
                            <h5>Disponibilité</h5>
                        </td>
                    </tr>
                    <tr class="header">
                        <th>Type/Engins</th>
                        <th colspan="2">Nombre
                    <tr>
                        <td class="rr">Ouaga</td>
                        <td class="rr">Bobo</td>
                    </tr>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cat in nbre_equipement_par_cat_and_loc" :key="cat.categorie">
                        <td>{{ cat.categorie }}</td>
                        <td>

                    <tr>
                        <td class="rr" v-for="localite in cat.localiteCounts" :key="localite.localite">{{ localite.count }}
                        </td>
                    </tr>
                    <!-- <table>
                                <tr v-for="localite in cat.localiteCounts" :key="localite.localite">
                                    <td>{{ localite.localite }}</td>
                                    <td>{{ localite.count }}</td>
                                </tr>
                            </table> -->
                    </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="indisponible">
            <table border="1" class="t1">
                <thead>
                    <tr>
                        <td colspan="2">
                            <h5>Indisponibilité</h5>
                        </td>
                    </tr>
                    <tr class="header">
                        <th>Type/Engins</th>
                        <th>Nombre
                    <tr>
                        <td class="rr">Ouaga</td>
                        <td class="rr">Bobo</td>
                    </tr>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cat in equipement_indisponibles" :key="cat.categorie">
                        <td>{{ cat.categorie }}</td>
                        <td>

                    <tr>
                        <td class="rr" v-for="localite in cat.localiteCounts" :key="localite.localite">{{ localite.count }}
                        </td>
                    </tr>
                    <!--  <table>
                                <tr v-for="localite in cat.localiteCounts" :key="localite.localite">
                                    <td>{{ localite.localite }}</td>
                                    <td>{{ localite.count }}</td>
                                </tr>
                            </table> -->
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="imprimerTableaux" type="button">imprimer</button>
    </div>
</template>

<script>
import { NombreEquipementByCat, NombreEquipementByCatAndLoc, NombreEquipementByCatAndLocIndispo } from '@/api/equipement';
import print from 'vue3-print-nb'
import MenuBar from '@/components/MenuBar.vue';
export default {
    name: "EtatEquipement",
    components: {
        MenuBar
    },
    directives: {
        print
    },

    data() {
        return {
            date_du_jour: null,
            date_debut_semaine: null,
            date_fin_semaine: null,
            nbre_equipement_par_cat: {},
            nbre_equipement_par_cat_and_loc: {},
            equipement_indisponibles: {},
        }
    },

    created() {
        this.chargerStatisticByCat();
        this.getdate()
        this.getDatesSemaine();
    },
    methods: {
        async chargerStatisticByCat() {
            try {
                this.nbre_equipement_par_cat = await NombreEquipementByCat();
                this.nbre_equipement_par_cat_and_loc = await NombreEquipementByCatAndLoc();
                this.equipement_indisponibles = await NombreEquipementByCatAndLocIndispo();
                console.log("statistic:", this.equipement_indisponibles)
            } catch (error) {
                console.log(error)
            }
        },
        getDatesSemaine() {
            const dateActuelle = new Date();

            // Déterminer le jour de la semaine (0 pour dimanche, 1 pour lundi, ..., 6 pour samedi)
            const jourSemaine = dateActuelle.getDay();

            // Calculer le décalage pour trouver le début de la semaine (dimanche)
            const decalageDebutSemaine = jourSemaine === 0 ? -6 : 1 - jourSemaine;

            // Calculer le décalage pour trouver la fin de la semaine (samedi)
            const decalageFinSemaine = jourSemaine === 0 ? 0 : 7 - jourSemaine;

            // Calculer la date de début de la semaine en ajoutant le décalage au jour actuel
            const debutSemaine = new Date(dateActuelle);
            debutSemaine.setDate(dateActuelle.getDate() + decalageDebutSemaine);

            // Calculer la date de fin de la semaine en ajoutant le décalage au jour actuel
            const finSemaine = new Date(dateActuelle);
            finSemaine.setDate(dateActuelle.getDate() + decalageFinSemaine);

            // Formater les dates au format français
            this.date_du_jour = this.formatDate(dateActuelle);
            this.date_debut_semaine = this.formatDate(debutSemaine);
            this.date_fin_semaine = this.formatDate(finSemaine);
        },
        formatDate(date) {
            const jour = date.getDate();
            const mois = date.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
            const annee = date.getFullYear();
            return `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois}/${annee}`;
        },

        deconnexion() {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                this.$router.push('/');
            }
        },

        getdate() {
            const dateActuelle = new Date();
            const jour = dateActuelle.getDate();
            const mois = dateActuelle.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
            const annee = dateActuelle.getFullYear();

            // Formater la date au format français
            this.date_du_jour = `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois}/${annee}`;


        },

        imprimerTableaux() {
            window.print();
        },

    }
}
</script>

<style scoped>
.contenu {
    width: 90%;
    margin: 10px auto;
    border: 1px black solid;
}

table {
    border-collapse: collapse;
    width: 49%;
    background-color: white !important;
    margin: 5px auto;
    /* margin: 20px; */
}

td {
    border: 1px solid black;
    padding: 0px;
}

.header {
    font-weight: bold;
    background-color: lightgray !important;
}

th {
    padding: 0px;
    /* background-color: lightgray; */
}

.nbre_par_cat {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 5px auto;
}

.indisponible {
    width: 80%;
    margin: 5px auto;
}

.titre {
    border: 2px black solid;
    width: 80%;
    margin: 5px auto;
    background-color: rgb(231, 227, 227);
}

.entete {
    display: flex;
    justify-content: space-between;
}

.rr {
    width: 100px;
}

button {
    width: 250px;
    background-color: #71ee0a;
    height: 30px;
    border-radius: 5px;
}


@media print {
    .men {
        display: none;
    }

    button {
        display: none;
    }

    .contenu {
        width: 100%;
    }
}

.contenu {
    font-family: Arial, Helvetica, sans-serif;
    /* font-weight: bold; */

}
</style>