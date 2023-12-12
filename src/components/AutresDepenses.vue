<template>
    <div class="container">

        <table border="1" class="m-5">
            <thead>
                <tr>
                    <th scope="col">Numéro</th>
                    <th scope="col">Désignation</th>
                    <th scope="col">Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(depense, i) in depenses" :key="depense.designation">
                    <td>{{ i + 1 }}</td>
                    <td>{{ depense.designation }}</td>
                    <td>{{ depense.montant }}</td>
                </tr>
            </tbody>
        </table>
        <form>
            <fieldset>
                <legend>Ajouter d'autres dépenses</legend>


                <div class="form-group m-3">
                    <label for="designation">Désignation</label>
                    <input v-model="nouvelle_depense.designation" type="text" class="form-control" id="designation"
                        placeholder="Désignation">
                </div>

                <div class="form-group m-3">
                    <label for="montant">Montant</label>
                    <input v-model="nouvelle_depense.montant" type="number" class="form-control" id="montant"
                        placeholder="exemple: 10 000">
                </div>


                <div class="form-group">
                    <input @click="AddDepense()" type="button" value="Ajouter" class="btn btn-secondary m-3">
                    <router-link to="/dashbord" class="btn btn-secondary"> Retour</router-link>

                </div>


            </fieldset>
        </form>
    </div>
</template>

<script>
import { getAllMaintenanceWithAgregation, AjouterDepense } from '@/api/maintenance';
import Swal from 'sweetalert2';
export default {
    name: "AutresDepenses",
    props: ["id"],
    data() {
        return {
            nouvelle_depense: {
                designation: "",
                montant: 0,

            },
            depenses: [],
            maintenances: [],
            maintenance_choisie: "",
            user: {}
        }

    },

    async created() {
        this.maintenances = await getAllMaintenanceWithAgregation()
        console.log(this.maintenances)
        this.user = JSON.parse(localStorage.getItem("user"))
        localStorage.setItem("depense_en_cours", [])

    },

    methods: {
        formatDate(date) {
            const jour = date.getDate();
            const mois = date.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
            const annee = date.getFullYear();

            // Formater la date au format français
            const date_finale = `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois}/${annee}`;
            return date_finale;


        },

        async AddDepense() {
            if (this.nouvelle_depense.designation.trim().length < 5) {
                Swal.fire({
                    title: 'La désignation doit etre au moins 5 caractères',
                    icon: 'error'
                });
                return;
            }

            if (this.nouvelle_depense.montant < 1) {
                Swal.fire({
                    title: 'Le montant doit etre supérieur à 0',
                    icon: 'error'
                });
                return;
            }

            if (!this.id) {
                Swal.fire({
                    title: 'Veuillez choisir une maintenance',
                    icon: 'error'
                });
                return;
            }

            const maintenanceId = this.id;
            const maintenance = this.maintenances.filter((maint) => {
                return maint._id == maintenanceId
            })
            // console.log("Maintenance choisi: ", maintenance)
            const depense = this.nouvelle_depense;
            console.log(maintenance[0].utilisateur, " ", this.user)

            if ((maintenance[0].utilisateur.nom != this.user.nom) && (maintenance[0].utilisateur.prenom != this.user.prenom)) {
                Swal.fire({
                    title: 'Vous n\'etes pas l\'auteur de cette maintenance. Vous ne pouvez pas la modifier',
                    icon: 'error'
                });
                return;
            } else {
                Swal.fire({
                    title: 'Confirmer l\'ajouter de la dépense ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmer',
                    cancelButtonText: 'Annuler'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        // L'utilisateur a cliqué sur le bouton de confirmation

                        try {
                            const response = await AjouterDepense(maintenanceId, depense)
                            console.log("depense: ", depense)
                            Swal.fire({
                                title: 'Succès',
                                text: response.status,
                                icon: 'success',
                            });

                        } catch (error) {
                            console.error('Erreur lors de l\'ajout de la depense', error);
                            Swal.fire({
                                title: 'Erreur',
                                text: "Erreur lors de l\'ajout de la depense",
                                icon: 'error',
                            });

                        }

                        this.depenses = JSON.parse(localStorage.getItem("depense_en_cours") || "[]");
                        this.depenses.push(this.nouvelle_depense)
                        localStorage.setItem("depense_en_cours", JSON.stringify(this.depenses))

                        console.log(this.depenses)
                        this.nouvelle_depense = {};
                    }
                });
            }


        }
    }

}
</script>

<style scoped>
table {
    width: 50%;
}



/* tableau */
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

fieldset {
    border: 1px blue solid;
}
</style>