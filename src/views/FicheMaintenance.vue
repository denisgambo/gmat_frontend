<template>
    <div>
        <table id="fiche">
            <thead>
                <tr>
                    <th colspan="5">
                        <h3>Rapport de diagnostic GSE</h3> <button v-print="'#fiche'"
                            class="btn btn-secondary m-2">Imprimer</button>

                    </th>
                </tr>
                <tr>
                    <th>EQUIPEMENT</th>
                    <th>ID</th>
                    <th>POTENTIEL</th>
                    <th>DATE DE MISE EN SERVICE</th>
                    <th>DATE ET ETAT D'ACQUISITION</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ maintenance.equipement }}</td>
                    <td>RAS</td>
                    <td>RAS</td>
                    <td>RAS</td>
                    <td>RAS</td>
                </tr>
                <tr>
                    <th colspan="5">IMMOBILISATION</th>
                </tr>
                <tr>
                    <th>
                        DATE D'ENTREE
                    </th>
                    <th>
                        DATE DE SORTIE
                    </th>
                    <th>
                        RAISON
                    </th>
                    <th>
                        DIAGNOSTIQUE
                    </th>
                    <th>
                        ACTIONS MENEES
                    </th>

                </tr>
                <tr>
                    <td>{{ new Date(maintenance.date_entree).toLocaleDateString() }}</td>
                    <td>{{ new Date(maintenance.date_sortie).toLocaleDateString() }}</td>
                    <td>{{ maintenance.motif }}</td>
                    <td>
                        <ul>
                            <li v-for=" a  in  maintenance.anomalie " :key="a">
                                {{ a }}</li>
                        </ul>
                    </td>
                    <td>
                        {{ maintenance.actions_realisees }}
                    </td>

                </tr>
                <tr>
                    <td colspan="5">
                        <table>
                            <tr>
                                <th colspan="2">CONSOMMATIONS</th>
                            </tr>
                            <tr>
                                <th>Consommable</th>
                                <th>Quantité</th>
                            </tr>
                            <tr v-for=" conso  in  maintenance.consommables " :key="conso">
                                <td>{{ conso.nom }}</td>
                                <td>{{ conso.quantite }}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th colspan="5">OPERATEURS DE MAINTENANCES</th>
                </tr>
                <tr>
                    <td colspan="5">
                        <ul>
                            <li v-for=" op  in  maintenance.operateur_maintenance " :key="op">{{ op }}
                                <hr>
                            </li>
                        </ul>
                    </td>


                </tr>


            </tbody>

        </table>
        <div class="signature">
            <div class="vide">

            </div>
            <div class="chef">
                Le chef de service de maintenance
            </div>

        </div>
    </div>
</template>

<script>
import print from 'vue3-print-nb'

export default {
    name: "FicheMaintenance",
    props: {
        maintenance: {
            type: Object,
            required: false
        }
    },
    data() {
        return {}
    },
    directives: {
        print
    },
    created() {
        console.log(this.maintenance)
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 90%;
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

.signature {
    margin: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.vide {
    width: 50%;
}

.chef {
    width: 50%;
}

@media print {
    button {
        display: none;
    }
}
</style>

