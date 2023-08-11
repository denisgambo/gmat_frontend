<template>
  <!--  <div class="menu">
    <MenuBar />
  </div> -->
  <nav class="menu">
    <ul>
      <li><a href="/dashbord">Tableau de bord</a></li>
      <li @click="changeDisplay2(1)"><a href="#">Historique des maintenances</a></li>
      <li @click="changeDisplay2(3)"><a href="#">Faire une maintenance
        </a></li>
      <li @click="changeDisplay2(2)"><a href="#">Faire un prélèvement
        </a></li>

      <li @click="changeDisplay2(4)"><a href="#">Historique des prélèvements</a>
      </li>
      <!-- <li><a href="/approvisionnement">Stock</a></li> -->
      <!-- <li><a href="/etat">Statistiques</a></li> -->
      <li class="profil">
        <img src="../assets/images/photo_profil.png" alt=""><br>
        <small>{{ user.nom }}</small>

        <ul class="dropdown-menu">
          <li @click="gotoProfil(user.userId)"><a href="#"> Mon profil</a></li>
          <!-- <small>{{ user.nom }} {{ user.prenom }}</small> -->
          <li v-if="testAdminUser()"><a href="/utilisateurs">Gestion des utilisateurs</a></li>
          <li v-if="testAdminUser()"><router-link to="/parametre">Paramètres</router-link></li>

          <li @click="deconnexion()"><a href="#">Déconnexion</a></li>
          <!-- <li><a href="#">Paramètres</a></li> -->

        </ul>
      </li>
    </ul>
  </nav>

  <!-- <td class="no_print"><button @click.prevent="change_display()" class="addmaintenance">{{ btn_msg }}</button></td> -->
  <!--  <div class="lis_btn no-print">
    <button @click="changeDisplay2(1)" class="btn1" type="button"> Historiques des maintenances</button>
    <button @click="changeDisplay2(3)" class="btn1" type="button">Faire une maintenance </button>
    <button @click="changeDisplay2(2)" class="btn1" type="button">Faire un prélèvement </button>

    <button @click="changeDisplay2(4)" class="btn1" type="button"> Historique des consommations</button>
  </div> -->
  <!-- Afficher la liste des maintenances -->
  <div v-if="$store.state.display_liste_maintenance" class="list-maintenance">
    <Entete class="entete" />
    <h4>Toutes les maintenances</h4>
    <table>
      <tr class="header">
        <td class="header">Equipement</td>
        <td class="header">Anomalie</td>
        <td class="header">Consommation</td>
        <td class="header"> Autres dépenses</td>
        <td class="header">Horamètre</td>
        <td class="header">Date d'entrée</td>
        <td class="header">Date de sortie</td>
        <td class="header">Operateur de maintenance</td>
        <td class="header" v-if="display_auteur">Auteur</td>
      </tr>
      <tr v-for="listM in listMaintenanceWithAgregation" :key="listM._id">
        <td>{{ listM.equipement }}</td>
        <td>{{ listM.anomalie }}</td>
        <td>
          <ul>
            <li v-for="consommable in listM.consommables" :key="consommable.nom">
              {{ consommable.nom }}: {{ consommable.quantite }}
            </li>
          </ul>

        </td>
        <td>
          <ul v-if="listM.autres_depenses.length > 0">
            <li v-for="dep in listM.autres_depenses" :key="dep">
              {{ dep.designation }}: {{ dep.montant }}
              <hr>
            </li>

          </ul>
        </td>
        <td>{{ listM.horametre }}</td>
        <td>{{ new Date(listM.date_entree).toLocaleDateString() }}</td>
        <td>{{ new Date(listM.date_sortie).toLocaleDateString() }}</td>
        <td>{{ listM.operateur_maintenance }}</td>
        <td v-if="display_auteur">{{ listM.utilisateur.prenom }} {{ listM.utilisateur.nom }}: {{ listM.utilisateur.role }}
        </td>
      </tr>
      <!--  <tr class="no_print">
       
        <td><button @click="imprimerTableaux" class="addmaintenance">Imprimer</button></td>
      </tr> -->
    </table>

    <div class="justify-content-center">
      <button @click="imprimerTableaux" class="addmaintenance btn btn2 btn-secondary m-5">Imprimer</button>
      <button @click="togleAuteur()" v-if="testAdminUser() || testUserControlleur()"
        class="addmaintenance btn btn2 btn-secondary m-5">{{ auteurButton }}</button>

      <router-link to="/autres-depenses" class="btn btn2 btn-secondary"> Ajouter une dépense</router-link>


    </div>
  </div>
  <!-- Afficher le composant consommation -->
  <div class="consommation">

  </div>
  <Consommation v-if="$store.state.display_consommation_form2" />

  <!-- Afficher l'historique des maintenances -->
  <div class="historique" v-if="$store.state.display_historique">
    <HistoriqueConsommation />
  </div>

  <div class="container" v-if="$store.state.display_form">

    <form id="inscription-form" action="#" method="POST" v-if="$store.state.display_maintenance_form">
      <h3>Ajouter une opération de maintenance</h3>
      <div class="select">
        <div class="form-group">
          <label for="equipement">Equipement concerné</label>
          <select v-model="nouvelle_maintenance.equipement" name="equipement" id="" required>
            <option value="" disabled selected>-- Sélectionnez un équipement --</option>
            <option v-for="eq in listEquipements" :key="eq._id" :value="eq._id">{{ eq.nom }}</option>
          </select>
          <span v-if="!isEquipementSelected" class="error-message">Ce champ est obligatoire.</span>
        </div>

        <div class="form-group">
          <label for="equipement">Anomalie</label>
          <select v-model="nouvelle_maintenance.anomalie" name="anomalie" id="" required>
            <option value="" disabled selected>-- Sélectionnez une anomalie --</option>
            <option v-for="an in anomalies" :key="an._id" :value="an.nom">{{ an.nom }}</option>
          </select>
        </div>


      </div>
      <!--  <div class="form-group">
        <label for="anomalie">Anomalie</label>
        <textarea v-model="nouvelle_maintenance.anomalie" id="anomalie" name="anomalie"></textarea>
      </div> -->
      <div class="form-group">
        <label for="horametre">Horamètre </label>
        <input v-model="nouvelle_maintenance.horametre" type="number" id="horametre" name="horametre">
      </div>

      <div class="date">
        <div class="form-group">
          <label for="date_entree">Date d'entréé</label>
          <input v-model="nouvelle_maintenance.date_entree" type="date" id="" name="date_entree">
        </div>
        <div class="form-group">
          <label for="date_sortie">Date de sortie</label>
          <input v-model="nouvelle_maintenance.date_sortie" type="date" id="" name="date_sortie">
        </div>
      </div>
      <div class="select">
        <div class="form-group">
          <label for="operateur_maintenance">Opérateur de maintenance</label>
          <select v-model="nouvelle_maintenance.operateur_maintenance" name="operateur_maintenance" id="" required>
            <option value="" disabled selected>-- Sélectionnez --</option>
            <option v-for="maint in maintenanciers" :key="maint._id" :value="maint.nom + ' ' + maint.prenom">{{ maint.nom
            }}
              {{ maint.prenom }}
            </option>
          </select>
        </div>
      </div>
      <div class="select">
        <div class="form-group">
          <label for="disponibilite">Avez-vous utilisé des consommables ? </label>
          <input v-model="utiliser_consommable" type="radio" name="consommable" value="true">Oui
          <input v-model="utiliser_consommable" type="radio" name="consommable" value="false">Non

        </div>
        <div class="form-group">
          <label for="disponibilite">Ajouter des dépenses? ? </label>
          <input v-model="ajuter_autres_depenses" type="radio" name="depenses" value="true">Oui
          <input v-model="ajuter_autres_depenses" type="radio" name="depenses" value="false">Non

        </div>
      </div>
      <div class="form-group">
        <input type="submit" @click.prevent="creerMaintenance(nouvelle_maintenance)" value="Ajouter">
      </div>
    </form>




    <form id="inscription-form" action="#" method="POST" v-if="$store.state.display_consommation_form">
      <table>
        <tr class="header">
          <td colspan="4"> maintenance du: {{ new Date(last_maintenance.date_entree).toLocaleDateString()
          }} Au: {{ new Date(last_maintenance.date_sortie).toLocaleDateString() }}<br> {{
  findName(last_maintenance.equipement, listEquipements) }}</td>

        </tr>
        <tr class="header">
          <!-- <td>Equipement</td> -->
          <td>Consommable</td>
          <td>Quantite</td>
          <td>Commentaire</td>

          <td>Date</td>

        </tr>
        <tr v-for="conso in consommation_en_cours" :key="conso.consommable">
          <!-- <td>{{ findName(conso.equipement, listEquipements) }}</td> -->
          <td>{{ findName(conso.consommable, listConsommable) }}</td>
          <td>{{ conso.quantite }}</td>
          <td>{{ conso.description }}</td>
          <td>{{ conso.date }}</td>


        </tr>


      </table>
      <h1>Ajouter une consommation</h1>
      <table>
        <tr class="header">
          <td>
            <label for="equipement">Consommable concerné</label>
          </td>
          <td>
            <label for="quantite">Quantité utilisée</label>
          </td>

          <td>
            <label for="description">Commentaire </label>
          </td>

          <td>
            <label for="date">Date</label>
          </td>
        </tr>

        <tr>
          <td>
            <select v-model="nouvelle_consommation.consommable" name="consommable" id="" required>
              <option value="" disabled selected>-- Sélectionnez --</option>
              <option v-for="cons in listConsommable" :key="cons._id" :value="cons._id">{{ cons.nom }}: {{
                cons.quantite_en_stock }}</option>
            </select>
            <span v-if="!isEquipementSelected" class="error-message">Champ obligatoire.</span>
          </td>
          <td>
            <input class="commentaire" type="number" v-model="nouvelle_consommation.quantite" id="" name="quantite">
          </td>

          <td>
            <!--      <textarea class="commentaire" v-model="nouvelle_consommation.description" id="description"
              name="description"></textarea> -->
            <select v-model="nouvelle_consommation.description" name="description" id="" required>
              <option value="" disabled selected>-- Sélectionnez --</option>
              <option v-for="just in justifications" :key="just._id" :value="just.titre">{{ just.titre }}
              </option>
            </select>
          </td>

          <td>
            <input class="commentaire" v-model="nouvelle_consommation.date" type="date" id="" name="date">
          </td>
        </tr>
      </table>

      <div class="form-group">
        <input @click.prevent="creerConsommation(nouvelle_consommation)" type="submit" value="Ajouter">
        <input type="reset" value="Terminer" class="addappro" @click.prevent="terminer()">
      </div>
    </form>
  </div>
</template>

<script>
// Impotation des tests de role
import { getAllJustifications } from '@/api/justification';

import router from '@/router';
import Swal from 'sweetalert2'
import store from '@/store';
import { getAllMaintenance, getLastMaintenance, updateMaintenance, getAllMaintenanceWithAgregation } from '../api/maintenance'
import { createMaintenance } from '../api/maintenance'
import { getAllEquipements } from '../api/equipement'
import { createConsommable, getAllConsommables, getConsommableById } from '../api/consommable'
import { getLastConsommation } from '@/api/consommation'
import { createConsommation } from '@/api/consommation'
import { updateStock } from '@/api/approvisionnement'
import MenuBar from './MenuBar.vue'
import Consommation from './Consommation.vue'
import HistoriqueConsommation from './HistoriqueConsommation.vue'
import Entete from './Entete.vue';
import { getAllAnomalies } from '@/api/anomalie';
import { getAllMaintenanciers } from '@/api/maintenancier';
// import { testAdminUser, testControlleurUser, testFinancierUser, testGestionnaireUser } from '/auth/auth-guard-admin';

export default {
  name: 'Maintenance',
  components: {
    MenuBar,
    Consommation,
    HistoriqueConsommation,
    Entete
  },

  data() {
    return {
      listMaintenance: "",
      listMaintenanceWithAgregation: "",
      listConsommable: "",
      justifications: [],
      // display_liste_maintenance: true,
      // display_form: false,
      // display_historique: false,
      // display_maintenance_form: true,
      // display_consommation_form: false,
      // display_consommation_form2: false,
      listEquipements: "",
      anomalies: "",
      maintenanciers: "",
      utiliser_consommable: false,
      ajuter_autres_depenses: false,
      display_auteur: false,
      nouvelle_maintenance: {
        equipement: "",
        date_entree: "",
        date_sortie: "",
        horametre: "",
        anomalie: "",
        operateur_maintenance: "",
        // consommation:{}
      },
      nouvelle_consommation: {
        equipement: "",
        consommable: "",
        quantite: 0,
        date: "",
        description: ""
      },
      user: "",
      consommation_en_cours: [],
      last_maintenance: "",
      last_consommation: "",
      btn_msg: "Ajouter une opération de maintenance"
    }
  },
  computed: {
    auteurButton() {
      if (this.display_auteur) {
        return "Cacher les auteurs"
      } else {
        return "Afficher les auteurs"
      }
    }
  },
  async created() {
    this.chargerMaintenance();
    this.chargerMaintenanceWithAgregate();
    this.chargerEquipement();
    this.chargerConsommables();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.anomalies = await getAllAnomalies()
    this.maintenanciers = await getAllMaintenanciers()
    this.justifications = await getAllJustifications()

  },

  methods: {
    async chargerMaintenance() {
      try {
        this.listMaintenance = await getAllMaintenance();
        // console.log("Liste maintenances: ", this.listMaintenance);
      } catch (error) {
        console.log(error);
      }
    },
    gotoProfil(id) {
      router.push({ name: 'profil', params: { id } });
    },

    testAdminUser() {
      return this.user.role == "administrateur";
    },

    async chargerEquipement() {
      try {
        this.listEquipements = await getAllEquipements();
        // console.log("Equipements: ", this.listEquipements);
      } catch (error) {
        console.log(error);
      }
    },

    async chargerMaintenanceWithAgregate() {
      try {
        this.listMaintenanceWithAgregation = await getAllMaintenanceWithAgregation();
        // console.log("Maintenance", this.listMaintenanceWithAgregation);
      } catch (error) {
        console.log(error);
      }
    },
    async chargerConsommables() {
      try {
        this.listConsommable = await getAllConsommables();
        //  console.log(this.listMaintenance);
      } catch (error) {
        console.log(error);
      }
    },

    //Créer une maintenance
    async creerMaintenance(maintenanceData) {
      // Vérifier si tous les attributs sont renseignés
      if (
        !maintenanceData.equipement ||
        !maintenanceData.date_entree ||
        !maintenanceData.date_sortie ||
        // !maintenanceData.horametre ||
        !maintenanceData.anomalie ||
        !maintenanceData.operateur_maintenance
      ) {
        Swal.fire({
          title: 'Veuillez remplir tous les champs de la maintenance',
          icon: 'error'
        });
        return;
      }
      maintenanceData.utilisateur = {
        nom: this.user.nom,
        prenom: this.user.prenom,
        role: this.user.role
      }
      try {
        await createMaintenance(maintenanceData);
        Swal.fire({
          title: 'Enregistré avec succès',
          icon: 'success'
        });
        this.listMaintenanceWithAgregation = await getAllMaintenanceWithAgregation();
        this.last_maintenance = await getLastMaintenance();
        console.log("last", this.last_maintenance._id)
        const id = this.last_maintenance._id

        localStorage.setItem("maintenance_en_cours", JSON.stringify([]))
        if (this.utiliser_consommable) {
          store.state.display_maintenance_form = false;
          store.state.display_consommation_form = true;
        } else if (this.ajuter_autres_depenses) {
          console.log(this.last_maintenance)

          router.push({ name: 'AutresDepenses', params: { id } });

        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Un problème est survenu',
          text: error,
          icon: 'error'
        });
      }
    }
    ,
    //Créer une consommabtion
    async creerConsommation(consommationData) {
      // Vérifier si tous les attributs sont renseignés
      if (
        // !consommationData.equipement ||
        !consommationData.consommable ||
        !consommationData.quantite ||
        !consommationData.date ||
        !consommationData.description
      ) {
        Swal.fire({
          title: 'Veuillez remplir tous les champs de la consommation',
          icon: 'error'
        });
        return;
      }
      consommationData.utilisateur = {
        nom: this.user.nom,
        prenom: this.user.prenom,
        role: this.user.role
      }
      this.nouvelle_consommation.equipement = this.nouvelle_maintenance.equipement;

      try {
        const data = await createConsommation(consommationData);
        const consommations = JSON.parse(localStorage.getItem("maintenance_en_cours"))
        consommations.push(consommationData)
        localStorage.setItem("maintenance_en_cours", JSON.stringify(consommations))
        this.consommation_en_cours = JSON.parse(localStorage.getItem("maintenance_en_cours"))
        // console.log(data);
        this.changeStock(this.nouvelle_consommation, 0);
        this.listMaintenanceWithAgregation = await getAllMaintenanceWithAgregation();

        Swal.fire({
          title: 'Enregistré avec succès',
          icon: 'success'
        });
        this.chargerMaintenanceWithAgregate();
        this.last_consommation = await getLastConsommation();
        console.log("Nouvelle: ", this.nouvelle_consommation);
        await updateMaintenance(this.last_maintenance._id, this.last_consommation._id);
        this.last_maintenance = await getLastMaintenance();
        // console.log(this.last_maintenance);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Un problème est survenu',
          text: error,
          icon: 'error'
        });
      }
    }
    ,

    formatDate(date) {
      const jour = date.getDate();
      const mois = date.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
      const annee = date.getFullYear();

      // Formater la date au format français
      this.date_finale = `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois}/${annee}`;
      return date_finale;


    },

    async changeStock(nouvelle_consommation) {
      try {
        await updateStock(nouvelle_consommation.consommable, nouvelle_consommation.quantite, 0);
        this.nouvelle_consommation = {}
      } catch (error) {

      }
    },
    async findConsommableName(id) {
      try {
        const consommable = getConsommableById(id)
        return consommable.non
      } catch (error) {
        console.log(error)
      }
    },
    testAdminUser() {
      return this.user.role == "administrateur";
    },
    testUserControlleur() {
      return this.user.role == "controlleur";
    },

    testUserGestionnaire() {
      return this.user.role == "gestionnaire"
    },



    /* change_display(number) {
      if (this.display_liste_maintenance == true) {
        this.display_liste_maintenance = false;
        this.display_form = true;
        this.btn_msg = "Voir la liste des maintenances"
      } else {
        this.display_form = false;
        this.display_liste_maintenance = true;
        this.btn_msg = "Ajouter une opération de maintenance"
      }
    }, */
    changeDisplay2(entre) {
      if (entre == 1) {
        store.state.display_liste_maintenance = true;
        store.state.display_consommation_form2 = false;
        store.state.display_form = false;
        store.state.display_historique = false;
      } else if (entre == 2) {
        if (this.user.role == "administrateur" || this.user.role == "gestionnaire") {
          store.state.display_consommation_form2 = true;
          store.state.display_liste_maintenance = false;
          store.state.display_form = false;
          store.state.display_historique = false;

        } else {
          Swal.fire({
            title: 'Attention',
            text: "Vous n'avez pas les droits nécéssaires pour faire cette action",
            icon: 'error'
          });

        }
        // this.display_historique = false;
      } else if (entre == 3) {
        if (this.user.role == "administrateur" || this.user.role == "gestionnaire") {
          store.state.display_liste_maintenance = false;
          store.state.display_consommation_form2 = false;
          store.state.display_form = true;
          store.state.display_maintenance_form = true;
          store.state.display_historique = false;

        } else {
          Swal.fire({
            title: 'Attention',
            text: "Vous n'avez pas les droits nécéssaires pour faire cette action",
            icon: 'error'
          });
        }
      } else {
        store.state.display_liste_maintenance = false;
        store.state.display_consommation_form2 = false;
        store.state.display_historique = true;
        store.state.display_form = false;
      }
    },

    terminer() {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // L'utilisateur a cliqué sur le bouton de confirmation
          this.listMaintenanceWithAgregation = await getAllMaintenanceWithAgregation();

          this.changeDisplay2(1)
          localStorage.removeItem("maintenance_en_cours")
          if (this.ajuter_autres_depenses) {
            const id = this.last_maintenance._id
            router.push({ name: 'AutresDepenses', params: { id } });
          }
        }
      });
    },
    findName(id, list_consommables) {
      const consommable = list_consommables.find(cons => cons._id === id);
      return consommable ? consommable.nom : '';
    },

    imprimerTableaux() {
      window.print();
    },
    togleAuteur() {
      this.display_auteur = !this.display_auteur
    },

    deconnexion() {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // L'utilisateur a cliqué sur le bouton de confirmation
          localStorage.removeItem('user');
          this.$router.push('/');
        }
      });
    },
    /*   testAdminUser() {
        return this.user.role == "administrateur";
      } */
  }
}
</script>

<style scoped>
.entete {
  display: none;
}

/* tableau */
table {
  border-collapse: collapse;
  width: 100%;
}

td {
  border: 1px solid black;
  padding: 1px;
  background-color: white;
}

.header {
  font-weight: bold;
  background-color: rgb(236, 231, 231) !important;
}

/* .addmaintenance {
  background-color: #00FF00;
  height: 35px;
  border-radius: 10px;

} */

.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
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
  width: 100%;
  padding: 1px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="submit"] {
  padding: 10px 20px;
  background-color: #4CAF50;
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
  border: 5px solid #ccc;
  width: 100%;
  margin-bottom: 20px;
}

form {
  width: 100%;
}

input[type="reset"] {
  padding: 10px 20px;
  margin: 10px;
  background-color: #f52121;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}



.commentaire {
  width: 80% !important;
}

.consommation {
  width: 100%;
}

.btn1 {
  background-color: rgb(146, 236, 146);
  height: 50px;
  width: 240px;
  margin-left: 30px;
  border-radius: 10px;
  margin-bottom: 20px;

}

.btn2 {
  width: 180px;
}

@media print {

  /* body * {
        display: none;
    } */
  .btn2,
  button {
    display: none;
  }

  .menu {
    display: none;
  }

  .no_print {
    display: none;
  }

  .entete {
    display: flex;
  }

}



.menu {
  background-color: #333;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.menu li {
  flex: 1;
}

.menu li a {
  display: block;
  text-align: center;
  padding: 12px;
  color: #fff;
  text-decoration: none;
}

.menu li a:hover {
  background-color: #555;
}

.profil>img {
  width: 30px;
  border-radius: 50%;
}


.menu .profil {
  position: relative;
}

.menu .profil .dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  display: none;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.menu .profil:hover .dropdown-menu {
  display: block;
}

.menu .profil .dropdown-menu li {
  margin-bottom: 5px;
}

.menu .profil .dropdown-menu li a {
  color: #333;
  text-decoration: none;
}

.menu .profil .dropdown-menu li a:hover {
  color: #00BF63;
}

small {
  font-weight: bold;
  font-family: system-ui;
  /* background-color: #ccc; */
  color: white;
  border-radius: 5px;
}
</style>