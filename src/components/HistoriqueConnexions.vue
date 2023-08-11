<template>
    <button class="btn btn-secondary m-3" v-print="'#hist_connexions'">Imprimer</button>

    <div class="historique_connexion" id="hist_connexions">

        <div v-for="utilisateur in connexions" :key="utilisateur._id.nom" class="mb-5">
            <!-- <h2>{{ utilisateur._id.nom }} {{ utilisateur._id.prenom }}: {{ utilisateur._id.role }}</h2> -->
            <table border="1">
                <thead>
                    <tr>
                        <td colspan="3">
                            <h2>{{ utilisateur._id.prenom }} {{ utilisateur._id.nom }}: {{ utilisateur._id.role }}</h2>

                        </td>
                    </tr>
                    <tr>
                        <th>Numéro</th>
                        <th>Date de connexion</th>
                        <th>Date de déconnexion</th>
                        <!-- Ajoutez ici les autres en-têtes de colonnes -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(connexion, i) in utilisateur.connexions" :key="connexion._id">
                        <td>{{ i + 1 }}</td>

                        <td>{{ formatDateTime(connexion.date_connexion) }}</td>
                        <td v-if="connexion.date_deconnexion">{{
                            formatDateTime(connexion.date_deconnexion) }}</td>

                        <!-- Ajoutez ici les autres colonnes pour les autres informations de connexion -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import print from 'vue3-print-nb'

import { getAllConnexion } from '@/api/historique_connxion'
export default {
    name: "HistoriqueConnexion",
    data() {
        return {
            connexions: []
        }
    },
    directives: {
        print
    },

    async created() {
        this.connexions = await getAllConnexion()
        console.log(this.connexions)
    },

    methods: {
        formatDateTime(dateTimeString) {
            const dateTime = new Date(dateTimeString);
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return dateTime.toLocaleDateString('fr-FR', options);
        }
    }
}
</script>

<style scoped>
/* Tableau des utilisateurs */
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

@media print {
    h2 {
        text-align: center;
    }
}
</style>