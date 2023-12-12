<template>
    <div class="menu">
        <MenuBar />
    </div>
    <div class="container">

        <div class="lis_btn">
            <button @click="ChangeDisplay(1)" class="btn btn1 btn-success m-2" type="button"> Stock des
                consommables</button>
            <!--   <button @click="ChangeDisplay(3)" class="btn btn1 btn-success m-2" type="button"> Liste des équipements</button> -->

            <button @click="ChangeDisplay(2)" class="btn btn1 btn-success m-2" type="button"> Faire un
                approvisionnement</button>
            <!--    <button @click="ChangeDisplay(4)" class="btn btn1 btn-success m-2" type="button"> Historique des
                approvisionnements</button> -->
        </div>


        <div class="list-consommables" v-if="display_stock_consommable">
            <Entete class="entete" />

            <h2>Stock des consommables</h2>
            <button class="btn btn-sm btn-secondary m-2" @click="imprimerTableaux()">Imprimer</button>
            <table class="bg-light">
                <tr>
                    <th>Consommables</th>

                    <th>Quantité en stock</th>
                    <th>Prix d'achat</th>
                    <th>Description</th>
                    <th>Fournisseur</th>
                </tr>
                <tr v-for="cons in list_consommables" :key="cons._id">
                    <td>{{ cons.nom }}</td>

                    <td>{{ cons.quantite_en_stock }}</td>
                    <td>{{ cons.prix_achat }}</td>
                    <td>{{ cons.description }}</td>
                    <td>{{ cons.fournisseur }}</td>
                </tr>


            </table>

        </div>

        <div class="list-equipement" v-if="display_stock_equipement">
            <Entete class="entete" />
            <h2>Listes des équipements</h2>

            <button class="btn btn-sm btn-secondary m-2" @click="imprimerTableaux()">Imprimer</button>
            <table>

                <tr>

                    <th>Equipement</th>
                    <th>Catégorie</th>
                    <th>Description</th>
                    <th>Localité</th>
                    <th>Référence</th>
                    <th>Observation</th>
                    <th>Fournisseur</th>
                    <th>Disponibilité</th>
                    <th>Date d'acquisition</th>
                    <th>Date de mise en service</th>
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
                        <th>
                            <label for="description">Réference commande</label>
                        </th>
                        <th>
                            <label for="date_commande">Date de commande</label>
                        </th>

                        <th>
                            <label for="date_reception">Date de reception </label>
                        </th>
                    </tr>

                    <tr>
                        <td>
                            <textarea class="form-control" v-model="nouveau_approvisionnement.description"
                                name="description"></textarea>
                            <!-- <span class="error-message">Champ obligatoire.</span> -->
                        </td>
                        <td>
                            <input cl v-model="nouveau_approvisionnement.date_commande" class="form-control" type="date"
                                id="" name="date_commande">
                        </td>



                        <td>
                            <input v-model="nouveau_approvisionnement.date_reception" class="form-control" type="date" id=""
                                name="date_reception">
                        </td>
                    </tr>
                </table>

                <div class="form-group">
                    <input type="submit" value="Ajouter" class="btn btn-success m-2"
                        @click.prevent="creerApprovisionnement(nouveau_approvisionnement, user)">
                </div>
            </form>


            <form @submit.prevent="creerLigneAppro(ligne_approvisionnement)" method="POST" v-if="form_ligne_app">
                <h2>Remplir le formulaire d'approvisionnement</h2>

                <!-- Affichage de l'approvisionnement en cours -->
                <table>
                    <tr class="header">
                        <th colspan="6"> {{ nouveau_approvisionnement.description }} du: {{ new
                            Date(dernier_appro.date_commande).toLocaleDateString()
                        }} Reçu le: {{ new Date(dernier_appro.date_reception).toLocaleDateString() }}</th>
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
                        <th>
                            <label for="consommable">Consommable</label>
                        </th>
                        <th>
                            <label for="description">Commentaire</label>
                        </th>

                        <th>
                            <label for="quantite">Quantité </label>
                        </th>
                        <th>
                            <label for="prix_unitaire">Prix unitaire </label>
                        </th>

                        <th>
                            <label for="prix_total">Prix total </label>
                        </th>

                        <thead>
                            <label for="fournisseur">Fournisseur </label>
                        </thead>
                    </tr>

                    <tr>
                        <td>
                            <select name="consommable" required v-model="ligne_approvisionnement.consommable">
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="conso in list_consommables" :key="conso._id" :value="conso._id">{{ conso.nom
                                }}: {{ conso.quantite_en_stock }}</option>
                            </select>
                            <!-- <span class="error-message">Champ obligatoire.</span> -->
                        </td>
                        <td>
                            <input type="text" name="description" v-model="ligne_approvisionnement.description">
                            <!-- <textarea  ></textarea> -->
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
                            <select name="fournisseur" v-model="ligne_approvisionnement.fournisseur">
                                <option value="" disabled selected>-- Sélectionnez --</option>
                                <option v-for="f in list_fournisseurs" :key="f._id" :value="f._id">{{ f.nom }}</option>
                            </select>
                        </td>


                    </tr>
                </table>

                <div class="form-group">
                    <input type="submit" value="Ajouter" class="btn btn-success m-2">

                    <input type="reset" value="Terminer" class="btn btn-danger" @click.prevent="terminer()">

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
            display_stock_consommable: true,
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
                description: "Achat",
                fournisseur: "",
                quantite: 1,
                prix_unitaire: 0,
                prix_totale: 0,
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
        setInterval(() => {
            this.Appel();
        }, 10000);
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
        /* 
 
      async creerApprovisionnement(donnees) {
 
 
          // Vérifier si tous les attributs sont renseignés
          if (
 
              !donnees.date_commande
 
          ) {
              Swal.fire({
                  title: 'La date de commande est obligatoire',
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
              console.log("test")
              Swal.fire({
                  title: 'Enregistré avec succès',
                  icon: 'success'
              });
              console.log("testtt")
              this.form_app = false;
              this.form_ligne_app = true;
              this.dernierApprovisionnement();
              localStorage.setItem("en_cours", JSON.stringify([]))
          } catch (error) {
              console.log(error);
          }
      } */
        async creerApprovisionnement(donnees) {
            // Vérifier si tous les attributs sont renseignés
            if (!donnees.date_commande) {
                Swal.fire({
                    title: 'La date de commande est obligatoire',
                    icon: 'error'
                });
                return;
            }

            donnees.utilisateur = {
                nom: this.user.nom,
                prenom: this.user.prenom,
                role: this.user.role
            };

            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir enregistrer ?',
                    text: 'Êtes-vous sûr de vouloir créer cet approvisionnement ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, enregistrer !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    // Créer l'approvisionnement en appelant votre fonction
                    await createApprovisionnement(donnees);

                    // Afficher un message de succès si l'approvisionnement est créé avec succès
                    Swal.fire({
                        title: 'Enregistré avec succès',
                        icon: 'success'
                    });

                    this.form_app = false;
                    this.form_ligne_app = true;
                    this.dernierApprovisionnement();
                    localStorage.setItem('en_cours', JSON.stringify([]));
                } else {
                    // L'utilisateur a annulé l'enregistrement, vous pouvez gérer cela si nécessaire
                    console.log('L\'enregistrement a été annulé.');
                }
            } catch (error) {
                // En cas d'erreur lors de la création de l'approvisionnement
                console.log(error);
                Swal.fire({
                    title: 'Erreur lors de l\'enregistrement',
                    text: 'Une erreur est survenue lors de la création de l\'approvisionnement.',
                    icon: 'error'
                });
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

        /*      async creerLigneAppro(donnees) {
                 // Vérifier si tous les attributs sont renseignés
     
                 if (
                     !donnees.consommable || !donnees.quantite || !donnees.prix_unitaire ||
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
     
                     const en_cours = JSON.parse(localStorage.getItem("en_cours"))
                     en_cours.push(donnees)
                     localStorage.setItem("en_cours", JSON.stringify(en_cours))
     
     
                     this.list_appro = JSON.parse(localStorage.getItem("en_cours"));
     
     
     
                     Swal.fire({
                         title: 'Enregistré avec succès',
                         icon: 'success'
                     });
     
                     this.ligne_approvisionnement = {
                         consommable: "",
                         description: "Approvisionnement de stock",
                         fournisseur: "",
                         quantite: 1,
                         prix_unitaire: 1,
                         prix_totale: 1,
                         approvisionnement: "",
                     }
                     this.dernierApprovisionnement()
                 } catch (error) {
                     console.log(error);
                 }
             } */
        async creerLigneAppro(donnees) {
            // Vérifier si tous les attributs sont renseignés
            if (!donnees.consommable || !donnees.quantite || !donnees.prix_unitaire || !donnees.approvisionnement) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de la ligne d\'approvisionnement',
                    icon: 'error'
                });
                return;
            }

            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir enregistrer ?',
                    text: 'Êtes-vous sûr de vouloir créer cette ligne d\'approvisionnement ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, enregistrer !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    await createLigneApprovisionnement(donnees);
                    this.changeStock(donnees, 1);

                    // Enregistrement dans le stockage local
                    const en_cours = JSON.parse(localStorage.getItem('en_cours')) || [];
                    en_cours.push(donnees);
                    localStorage.setItem('en_cours', JSON.stringify(en_cours));

                    this.list_appro = en_cours;

                    // Message de succès
                    Swal.fire({
                        title: 'Enregistré avec succès',
                        icon: 'success'
                    });

                    // Réinitialisation des champs
                    this.ligne_approvisionnement = {
                        consommable: '',
                        description: 'Approvisionnement de stock',
                        fournisseur: '',
                        quantite: 1,
                        prix_unitaire: 1,
                        prix_totale: 1,
                        approvisionnement: ''
                    };

                    this.dernierApprovisionnement();
                } else {
                    // L'utilisateur a annulé l'enregistrement
                    console.log('L\'enregistrement de la ligne d\'approvisionnement a été annulé.');
                }
            } catch (error) {
                // En cas d'erreur lors de la création de la ligne d'approvisionnement
                console.log(error);
                Swal.fire({
                    title: 'Erreur lors de l\'enregistrement',
                    text: 'Une erreur est survenue lors de la création de la ligne d\'approvisionnement.',
                    icon: 'error'
                });
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
        async Appel() {
            this.chargerConsommables();
            this.charger_equipement();
            // this.chargerConsommables();
            this.chargerFournisseurs();
            // this.dernierApprovisionnement();
            this.user = JSON.parse(localStorage.getItem("user"))
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
.list-equipement {
    width: 100%;
    margin: 10px auto;
}

/* .menu {
    margin-bottom: 120px;
} */

.lis_btn {
    display: flex;
    width: 80%;
    margin: 0 auto;
    /* position: fixed; */

}

.btn1 {
    width: 300px;
    margin-left: 50px;
    border-radius: 10px;
    margin-bottom: 30px;

}

.list-consommables {
    width: 100%;
    margin: 10px auto;
}

/* Tableau des utilisateurs */
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 0px;
}

.nom {
    text-align: left;
    padding-left: 5px;
}

th {
    background-color: #f2f2f2;
}



.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
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