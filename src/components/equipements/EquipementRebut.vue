<template>
    <div class="rebut m-3">
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
                <button type="button" v-print="'#list_equipement_au_rebut'" class="btn btn-secondary m-2">Imprimer</button>
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

                <!-- <td class="header no_print">Actions</td> -->

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
</template>

<script>
import { testAdminUser, testGestionnaireUser } from '/auth/auth-guard-admin';

import Swal from 'sweetalert2'
import { getAllRebuts, createRebut } from '@/api/rebut'
import Entete from '../Entete.vue'
import { getAllEquipementsAuRebut, updateEquipement } from '@/api/equipement'

import print from 'vue3-print-nb'

export default {
    name: "Rebut",
    components: {
        Entete
    },
    directives: {
        print
    },
    data() {
        return {
            list_equipement_rebut: [],
            list_rebut: [],

        }
    },
    created() {
        this.chargerRebut()
        this.chargerEquipementRebut()
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
    },
    methods: {
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
                console.log("au rebut: ", this.list_equipement_rebut)
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
                        this.chargerRebut()
                        this.chargerEquipementRebut()
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
</style>