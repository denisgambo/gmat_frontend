<template>
    <div class="container">

        <div class="approvisionnement" v-if="list_fournisseurs.length > 0">
            <table border="1" v-for="app in historique" :key="app._id" class="mb-5 " :id="app._id">
                <Entete class="entete" />
                <tr>
                    <th colspan="5">{{ app.description }} du {{ formatDate(app.date_reception) }}</th>
                </tr>
                <tr>
                    <th>Consommable</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Fournisseur</th>
                    <th>Commentaire</th>
                </tr>
                <tr v-for="ligneApp in app.lignesApprovisionnement" :key="ligneApp._id">
                    <td>{{ ligneApp.consommable }}</td>
                    <td>{{ ligneApp.quantite }}</td>
                    <td>{{ ligneApp.prix_unitaire }}</td>
                    <td>
                        <div v-if="nomF(ligneApp.fournisseur)">{{ nomF(ligneApp.fournisseur) }}</div>
                    </td>
                    <td>{{ ligneApp.description }}</td>
                </tr>
                <button v-print="`#${app._id}`" class="btn btn-secondary btn-sm m-2 no-print">imprimer</button>
            </table>
        </div>

    </div>
</template>

<script>
import print from 'vue3-print-nb'
// import Entete from './Entete.vue'
import Entete from './Entete.vue'

import { getAllFournisseur } from '@/api/fournisseur'
import { historiqueAppro } from '@/api/approvisionnement'
export default {
    name: "HistoriqueApprovisionnement",
    components: {
        Entete,
    },
    data() {
        return {
            historique: "",
            list_fournisseurs: []
        }
    },
    directives: {
        print
    },
    async created() {
        this.historique = await historiqueAppro()
        this.chargerFournisseurs()
        console.log(this.historique)
    },


    methods: {
        formatDate(date) {
            // Méthode pour formater la date au format souhaité
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('fr-FR', options);
        },
        async chargerFournisseurs() {
            try {
                this.list_fournisseurs = await getAllFournisseur()
                // console.log("fournisseurs", this.list_fournisseurs)
                this.nomF('652a7094d867f03e657a5233')


            } catch (error) {
                console.log("Erruer", error)
            }
        },
        nomF(id) {
            const fournisseur = this.list_fournisseurs.filter((f) => f._id == id);
            if (fournisseur) {
                console.log(fournisseur[0].nom); // ou retourner le nom du fournisseur
                // alert("Fournisseur", fournisseur)
                return fournisseur[0].nom;
            } else {
                // console.log("Fournisseur introuvable");
                return null; // ou une valeur par défaut si le fournisseur n'est pas trouvé

            }
        }

    },


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


th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

th {
    background-color: #f2f2f2;
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