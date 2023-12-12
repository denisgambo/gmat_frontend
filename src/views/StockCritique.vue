<template>
    <div class="container">
        <router-link to="/dashbord" class="btn btn-primary m-3 no-print">Retour au tableau de bord</router-link>
        <table border="1" id="toprint">
            <Entete class="entete" />
            <thead>
                <tr>
                    <th colspan="5">Stock critique</th>
                </tr>
                <tr>
                    <th>Numéro</th>
                    <th>consommable</th>
                    <th>Stock actuel</th>
                    <th>Seuil critique</th>
                    <th class="no-print">Actions</th>


                </tr>
            </thead>
            <tbody>
                <tr v-for="(cons, index) in consommables_critique" :key="cons._id">
                    <td>{{ index + 1 }}</td>
                    <td class="to_left">{{ cons.nom }}</td>
                    <td class="to_left">{{ cons.quantite_en_stock }}</td>
                    <td class="to_left">{{ cons.seuil_critique }}</td>
                    <td class="no-print">
                        <router-link to="/approvisionnement" class=" mr-3">Approvisionner</router-link>
                    </td>

                </tr>
                <tr class="no-print">
                    <td colspan="5">
                        <div class=" d-flex justify-content-center">
                            <a href="mailto:admin@gmail.com" class="btn btn-secondary mr">Envoyer un email</a>


                            <button v-print="'#toprint'" class="btn btn-secondary ">Imprimer</button>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import router from '@/router';
import Entete from '@/components/Entete.vue';
import print from 'vue3-print-nb'

import { getConsommablesCritique } from '@/api/consommable';
export default {
    name: "StockCritique",
    components: {
        Entete
    },
    data() {
        return {
            consommables_critique: ""
        }
    },
    directives: {
        print
    },

    async created() {
        this.consommables_critique = await getConsommablesCritique()
    }
}
</script>

<style scoped>
.entete {
    display: none;
}

/* Tableau des utilisateurs */
table {
    border-collapse: collapse;
    width: 80%;
    margin: auto;

}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

th {
    background-color: #f2f2f2;
}

.mr-3 {
    margin: 5px;
}

.mr {
    margin-right: 50px;
}

.to_left {
    text-align: left;
    padding-left: 5px;
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