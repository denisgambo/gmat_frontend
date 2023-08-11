<template>
    <div class="container">

        <div class="approvisionnement d-flex flex-wrap  ">
            <table border="1" v-for="app in historique" :key="app._id" class="mb-5 " :id="app._id">
                <Entete class="entete" />
                <tr class="header">
                    <td class="header" colspan="5">{{ app.description }} du {{ formatDate(app.date_reception) }}</td>
                </tr>
                <tr>
                    <td class="header">Consommable</td>
                    <td class="header">Quantité</td>
                    <td class="header">Prix unitaire</td>
                    <td class="header">Fournisseur</td>
                    <td class="header">Commentaire</td>
                </tr>
                <tr v-for="ligneApp in app.lignesApprovisionnement" :key="ligneApp._id">
                    <td>{{ ligneApp.consommable }}</td>
                    <td>{{ ligneApp.quantite }}</td>
                    <td>{{ ligneApp.prix_unitaire }}</td>
                    <td>{{ ligneApp.fournisseur }}</td>
                    <td>{{ ligneApp.description }}</td>
                </tr>
                <button v-print="`#${app._id}`" class="no-print">imprimer</button>
            </table>
        </div>

    </div>
</template>

<script>
import print from 'vue3-print-nb'
import Entete from './Entete.vue'

import { historiqueAppro } from '@/api/approvisionnement'
export default {
    name: "HistoriqueApprovisionnement",
    components: {
        Entete,
    },
    data() {
        return {
            historique: "",
        }
    },
    directives: {
        print
    },

    methods: {
        formatDate(date) {
            // Méthode pour formater la date au format souhaité
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('fr-FR', options);
        }
    },

    async created() {
        this.historique = await historiqueAppro()
        console.log(this.historique)
    }
}
</script>

<style scoped>
.entete {
    display: none;
}

.container {
    width: 100%;
    margin: 0 auto;
}

.approvisionnement {
    width: 100%;
    margin: auto;
}

/* tableau */
table {
    border-collapse: collapse;
    width: 50%;
    margin: 10px auto;
}

td {
    border: 1px solid black;
    padding: 10px;
    background-color: white;
}

.header {
    font-weight: bold;
    background-color: rgb(236, 231, 231) !important;
}

.mb-5 {
    width: 60%;

}

@media print {
    .no-print {
        display: none;
    }

    .entete {
        display: flex;
        width: 100%;
    }
}
</style>