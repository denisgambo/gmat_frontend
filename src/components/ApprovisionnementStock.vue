<template>
    <div class="menu">
        <MenuBar />
    </div>

    <div class="container">
        <div class="lis_btn">
            <button @click="ChangeDisplay(1)" class="btn" type="button"> Stock des consommables</button>
            <button @click="ChangeDisplay(3)" class="btn" type="button"> Liste des équipements</button>

            <button @click="ChangeDisplay(2)" class="btn" type="button"> Faire un approvisionnement</button>
            <button @click="ChangeDisplay(4)" class="btn" type="button"> Historique des approvisionnements</button>
        </div>


        <div class="list-consommables" v-if="display_stock_consommable">
            <Entete class="entete" />

            <h2>Stock des consommables</h2>
            <button @click="imprimerTableaux()">Imprimer</button>
            <table>
                <tr class="header">
                    <td>Consommables</td>

                    <td>Quantité en stock</td>
                    <td>Prix d'achat</td>
                    <td>Description</td>
                    <td>Fournisseur</td>
                </tr>
                <tr v-for="cons in list_consommables" :key="cons._id">
                    <td>{{ cons.nom }}</td>

                    <td>{{ cons.quantite_en_stock }}</td>
                    <td>{{ cons.prix_achat }}</td>
                    <td>{{ cons.description }}</td>
                    <td>{{ cons.Fournisseur }}</td>
                </tr>
                <!--    <tr>
                    <td>
                        <button @click="imprimerTableaux()">Imprimer</button>
                    </td>
                </tr> -->

            </table>

        </div>

        <div class="list-equipement" v-if="display_stock_equipement">
            <Entete class="entete" />
            <h2>Listes des équipements</h2>

            <button @click="imprimerTableaux()">Imprimer</button>
            <table>

                <tr class="header">

                    <td>Equipement</td>
                    <td>Catégorie</td>
                    <td>Description</td>
                    <td>Localité</td>
                    <td>Référence</td>
                    <td>Observation</td>
                    <td>Fournisseur</td>
                    <td>Disponibilité</td>
                    <td>Date d'acquisition</td>
                    <td>Date de mise en service</td>
                </tr>
                <tr v-for="eq in list_equipements" :key="eq._id">
                    <td>{{ eq.nom }}</td>
                    <td>{{ eq.categorie }}</td>
                    <td>{{ eq.description }}</td>
                    <td>{{ eq.localite }}</td>
                    <td>{{ eq.reference }}</td>
                    <td>{{ eq.observation }}</td>
                    <td>{{ eq.Fournisseur }}</td>
                    <td><span v-if="eq.disponibilite">Disponible</span>
                        <span v-else>Indisponible</span>
                    </td>
                    <td>{{ new Date(eq.date_acquisition).toLocaleDateString() }}</td>
                    <td>{{ new Date(eq.date_mise_en_service).toLocaleDateString() }}</td>
                </tr>
                <!--   <tr>
                    <td>
                        <button @click="imprimerTableaux()">Imprimer</button>
                    </td>
                </tr> -->

            </table>

        </div>
        <!-- Historique des approvisionnements -->
        <div class="hisorique_appro" v-if="display_historique_app">
            <h2>Historique des approvisionnements</h2>

            <HistoriqueApprovisionnement />
        </div>

        <div class="apporvisionnement" v-if="display_appro_form">
            <form id="inscription-form" action="#" method="POST" v-if="form_app">
                <h2>Faire un approvisionnement de stock</h2>
                <table>
                    <tr class="header">
                        <td>
                            <label for="description">Description</label>
                        </td>
                        <td>
                            <label for="date_commande">Date de commande</label>
                        </td>

                        <td>
                            <label for="date_reception">Date de reception </label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <textarea v-model="nouveau_approvisionnement.description" name="description"></textarea>
                            <span class="error-message">Champ obligatoire.</span>
                        </td>
                        <td>
                            <input v-model="nouveau_approvisionnement.date_commande" class="commentaire" type="date" id=""
                                name="date_commande">
                        </td>



                        <td>
                            <input v-model="nouveau_approvisionnement.date_reception" class="commentaire" type="date" id=""
                                name="date_reception">
                        </td>
                    </tr>
                </table>

                <div class="form-group">
                    <input type="submit" value="Ajouter" class="addappro"
                        @click.prevent="creerApprovisionnement(nouveau_approvisionnement, user)">
                </div>
            </form>


            <form action="#" method="POST" v-if="form_ligne_app">
                <h2>Remplir le formulaire d'approvisionnement</h2>

                <!-- Affichage de l'approvisionnement en cours -->
                <table>
                    <tr class="header">
                        <td colspan="6"> {{ nouveau_approvisionnement.description }} du: {{ new
                            Date(dernier_appro.date_commande).toLocaleDateString()
                        }} Reçu le: {{ new Date(dernier_appro.date_reception).toLocaleDateString() }}</td>
                    </tr>
                    <tr class="header">
                        <td>Consommable</td>
                        <td>Description</td>
                        <td>Quantite</td>
                        <td>Prix unitaire</td>
                        <td>Prix total</td>
                        <td>Fournisseur</td>

                    </tr>
                    <tr v-for="appro in list_appro" :key="appro.consommable">
                        <td>{{ findName(appro.consommable, list_consommables) }}</td>
                        <td>{{ appro.description }}</td>
                        <td>{{ appro.quantite }}</td>
                        <td>{{ appro.prix_unitaire }}</td>
                        <td>{{ appro.prix_totale }}</td>
                        <td>{{ appro.Fournisseur }}</td>

                    </tr>


                </table>

                <!-- le formulaire pour renseigner les produits approvisionnés -->
                <table>
                    <tr class="header">
                        <td>
                            <label for="consommable">Consommable</label>
                        </td>
                        <td>
                            <label for="description">Description</label>
                        </td>

                        <td>
                            <label for="quantite">Quantité </label>
                        </td>
                        <td>
                            <label for="prix_unitaire">Prix unitaire </label>
                        </td>

                        <td>
                            <label for="prix_total">Prix total </label>
                        </td>

                        <td>
                            <label for="fournisseur">Fournisseur </label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <select name="consommable" required v-model="ligne_approvisionnement.consommable">
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="conso in list_consommables" :key="conso._id" :value="conso._id">{{ conso.nom
                                }}: {{ conso.quantite_en_stock }}</option>
                            </select>
                            <span class="error-message">Champ obligatoire.</span>
                        </td>
                        <td>
                            <textarea v-model="ligne_approvisionnement.description" name="description" id=""></textarea>
                        </td>



                        <td>
                            <input v-model="ligne_approvisionnement.quantite" class="commentaire" type="number" required
                                name="quantite" @input="calcul_prix_total">
                        </td>

                        <td>
                            <input v-model="ligne_approvisionnement.prix_unitaire" class="commentaire" type="number"
                                required name="prix_unitaire" @input="calcul_prix_total">
                        </td>

                        <td>
                            <input v-model="ligne_approvisionnement.prix_totale" class="commentaire" type="number" required
                                disabled name="prix_unitaire">
                        </td>
                        <td>
                            <select name="fournisseur" required v-model="ligne_approvisionnement.fournisseur">
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="f in list_fournisseurs" :key="f._id" :value="f._id">{{ f.nom }}</option>
                            </select>
                        </td>


                    </tr>
                </table>

                <div class="form-group">
                    <input type="submit" value="Ajouter" class="addappro"
                        @click.prevent="creerLigneAppro(ligne_approvisionnement, ligne_approvisionnement.consommable, ligne_approvisionnement.quantite)">

                    <input type="reset" value="Terminer" class="addappro" @click.prevent="terminer()">

                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { getAllConsommables, getConsommableById } from '@/api/consommable'
import { getAllEquipementsWithCat } from '@/api/equipement';
import { createApprovisionnement, createLigneApprovisionnement, getLastAppro, updateStock } from '@/api/approvisionnement';
import HistoriqueApprovisionnement from './HistoriqueApprovisionnement.vue';
import MenuBar from './MenuBar.vue';
import { getAllFournisseur } from '@/api/fournisseur';
import Swal from 'sweetalert2'
import Entete from './Entete.vue';


export default {
    components: {
        MenuBar,
        HistoriqueApprovisionnement,
        Entete
    },

    data() {
        return {
            list_consommables: "",
            form_app: true,
            form_ligne_app: false,
            list_equipements: "",
            list_fournisseurs: "",
            display_stock_consommable: false,
            display_stock_equipement: false,
            display_appro_form: false,
            display_historique_app: false,
            nouveau_approvisionnement: {
                description: "",
                date_commande: "",
                date_reception: "",
                utilisateur: ""
            },
            user: "",

            ligne_approvisionnement: {
                consommable: "",
                description: "",
                fournisseur: "",
                quantite: 1,
                prix_unitaire: 1,
                prix_totale: 1,
                approvisionnement: "",
            },

            dernier_appro: "",
            list_appro: [],
        }
    },

    created() {
        this.chargerConsommables();
        this.charger_equipement();
        // this.chargerConsommables();
        this.chargerFournisseurs();
        // this.dernierApprovisionnement();
        this.user = JSON.parse(localStorage.getItem("user"))
    },

    methods: {
        async chargerConsommables() {
            this.list_consommables = await getAllConsommables();
            // console.log("Liste des consommables: ", this.list_consommables);
        },

        async charger_equipement() {
            try {
                this.list_equipements = await getAllEquipementsWithCat();
                // console.log("equipements: ", this.list_equipements)
            } catch (error) {

            }
        },

        async creerApprovisionnement(donnees) {
            // Vérifier si tous les attributs sont renseignés
            if (
                !donnees.description ||
                !donnees.date_commande ||
                !donnees.date_reception
            ) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de l\'approvisionnement',
                    icon: 'error'
                });
                return;
            }
            donnees.utilisateur = {
                nom: this.user.nom,
                prenom: this.user.prenom,
                role: this.user.role
            }
            try {
                await createApprovisionnement(donnees);
                Swal.fire({
                    title: 'Enregistré avec succès',
                    icon: 'success'
                });
                this.form_app = false;
                this.form_ligne_app = true;
                this.dernierApprovisionnement();
                localStorage.setItem("en_cours", JSON.stringify([]))
            } catch (error) {
                console.log(error);
            }
        }
        ,
        async dernierApprovisionnement() {
            try {
                this.dernier_appro = await getLastAppro();
                console.log(this.dernier_appro)
                this.ligne_approvisionnement.approvisionnement = this.dernier_appro._id;
                // console.log("dernier approvisionnement: ", this.dernier_appro);
            } catch (error) {
                console.log(error)
            }
        },

        async creerLigneAppro(donnees) {
            // Vérifier si tous les attributs sont renseignés
            if (
                !donnees.consommable ||
                !donnees.description ||
                !donnees.fournisseur ||
                !donnees.quantite ||
                !donnees.prix_unitaire ||
                !donnees.prix_totale ||
                !donnees.approvisionnement
            ) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de la ligne d\'approvisionnement',
                    icon: 'error'
                });
                return;
            }

            try {
                await createLigneApprovisionnement(donnees);
                this.changeStock(donnees, 1);
                // console.log(await this.findConsommableName(this.ligne_approvisionnement.consommable))
                const en_cours = JSON.parse(localStorage.getItem("en_cours"))
                en_cours.push(donnees)
                localStorage.setItem("en_cours", JSON.stringify(en_cours))
                // this.ligne_approvisionnement.consommable = ""
                // console.log(this.list_appro)

                this.list_appro = JSON.parse(localStorage.getItem("en_cours"));



                Swal.fire({
                    title: 'Enregistré avec succès',
                    icon: 'success'
                });
                // this.ligne_approvisionnement = {};
            } catch (error) {
                console.log(error);
            }
        }
        ,

        async changeStock(ligne_approvisionnement) {
            try {
                await updateStock(ligne_approvisionnement.consommable, ligne_approvisionnement.quantite, 1);
            } catch (error) {

            }
        },


        async chargerConsommables() {
            try {
                this.list_consommables = await getAllConsommables();
                // console.log("conso", this.list_consommables);


            } catch (error) {
                console.log(error)
            }
        },


        async findConsommableName(id) {
            try {
                const consommable = await getConsommableById(id);
                return consommable.nom
            } catch (error) {
                console.log(error)
            }
        },
        findName(id, list_consommables) {
            const consommable = list_consommables.find(cons => cons._id === id);
            return consommable ? consommable.nom : '';
        },


        async chargerFournisseurs() {
            try {
                this.list_fournisseurs = await getAllFournisseur()
                // console.log("fournisseurs", this.list_fournisseurs)

            } catch (error) {
                console.log(error)
            }
        },
        imprimerTableaux() {
            window.print();
        },

        calcul_prix_total() {
            this.ligne_approvisionnement.prix_totale = this.ligne_approvisionnement.quantite * this.ligne_approvisionnement.prix_unitaire;
        },
        ChangeDisplay(entree) {
            if (entree == 1) {
                this.display_stock_consommable = true;
                this.display_stock_equipement = false;
                this.display_appro_form = false;
                this.display_historique_app = false;
            } else if (entree == 2) {
                if (this.user.role == "administrateur" || this.user.role == "financier") {
                    this.display_stock_consommable = false;
                    this.display_stock_equipement = false;
                    this.display_appro_form = true;
                    this.display_historique_app = false;
                } else {
                    Swal.fire({
                        title: 'Attention',
                        text: "Vous n'avez pas les droits nécéssaires pour faire cette action",
                        icon: 'error'
                    });
                }

            } else if (entree == 3) {
                this.display_stock_consommable = false;
                this.display_stock_equipement = true;
                this.display_appro_form = false;
                this.display_historique_app = false;
            } else if (entree == 4) {
                this.display_stock_consommable = false;
                this.display_stock_equipement = false;
                this.display_appro_form = false;
                this.display_historique_app = true;
            }
        },
        change_display_to_consommable() {
            this.display_stock_consommable = true;
            this.display_stock_equipement = false;
            this.display_appro_form = false;
            /* this.form_ligne_app = false;
            this.form_app = false; */
        },
        change_display_to_appro() {
            this.display_appro_form = true
            this.display_stock_consommable = false;
            this.display_stock_equipement = false;
        },

        change_display_to_equipement() {
            this.display_stock_consommable = false;
            this.display_appro_form = false;
            this.display_stock_equipement = true;

        },

        terminer() {
            Swal.fire({
                title: "Êtes-vous sûr de vouloir terminer l'opération' ?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    this.chargerConsommables();
                    this.change_display_to_consommable();
                    this.form_app = true;
                    this.form_ligne_app = false;
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    this.list_consommables = await getAllConsommables();
                    localStorage.removeItem('en_cours');
                    this.dernier_appro = "";
                    this.list_appro = "";
                    this.nouveau_approvisionnement = {};
                    this.ligne_approvisionnement = {}

                    /* this.form_ligne_app = false;
                    this.form_app = false; */
                }
            });
        }
    }

}
</script>

<style scoped>
.container {
    width: 100%;
    margin: 10px auto;
    padding-top: 20px;
    /* padding: 20px; */
    display: block;
    justify-content: space-around;
    background: url("../assets/images/beautiful-view.avif");
    background-size: cover;


}

.list-equipement {
    width: 100%;
    margin: 10px auto;
}

.lis_btn {
    display: flex;
    width: 100%;
    /* position: fixed; */

}

.btn {
    background-color: rgb(146, 236, 146);
    height: 50px;
    width: 250px;
    margin-left: 50px;
    border-radius: 10px;
    margin-bottom: 30px;

}

.list-consommables {
    width: 100%;
    margin: 30px auto;
}

/* tableau */
table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    margin-bottom: 30px;
}

td {
    border: 1px solid black;
    padding: 2px;
}

.header {
    font-weight: bold;
    background-color: lightgray;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="date"],
textarea {
    width: 80%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="submit"] {
    width: 300px;
    padding: 15px 20px;
    margin: 10px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type="reset"] {
    width: 300px;
    padding: 15px 20px;
    margin: 10px;
    background-color: #f52121;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    margin-top: 5px;
}

.date {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 20px;
}

.select {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 90%;
    margin-bottom: 20px;
}

h2 {
    background-color: #f1f509;
    border-radius: 5px;
}

.entete {
    display: none;
}

@media print {
    .menu {
        display: none;

    }

    .lis_btn {
        display: none;
    }

    button {
        display: none;
    }

    .entete {
        display: flex;
        width: 100%;
    }
}
</style>