<template>
  <MenuBar class="menu_bar" />
  <h1 class="bg-light">{{ titre }}</h1>
  <div class="details" v-if="afficher_fiche_maintenance">
    <FicheMaintenance :maintenance="maintenance_detaillee" />

    <button @click="afficher_fiche_maintenance = false" class="btn btn-secondary">Retour</button>
  </div>


  <div class="principal" v-if="!afficher_fiche_maintenance">
    <div class="menu_vertical">
      <nav class="navbar ">
        <ul class="navbar-nav">
          <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_maintenance }">
            <button @click="affichage('maintenance')" type="button"
              class="btn btn-secondary btn-sm btn-menu_v">Maintenance</button>
          </li>
          <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_prelevement }">
            <button @click="affichage('prelevement')" type="button"
              class="btn btn-secondary btn-sm btn-menu_v">Prelèvements</button>
          </li>

          <li class="nav-item mb-3" :class="{ 'nav-link-active': afficher_demande }">
            <button @click="affichage('demandes')" type="button" class="btn btn-secondary btn-sm btn-menu_v">Demandes
              d'achat</button>
          </li>


        </ul>
      </nav>
    </div>

    <div class="contenu">
      <div class="maintenance" v-if="afficher_maintenance">
        <div class="list_btn">
          <button @click="changeDisplay2(3)" class="btn btn-success m-2">Faire une maintenance</button>
          <button @click="changeDisplay2(1)" class="btn btn-success m-2">Historique des maintenances</button>
        </div>


        <div class="containe form" v-if="$store.state.display_form">


          <form class="bg-light" id="inscription-form" action="#" method="POST"
            v-if="$store.state.display_maintenance_form">
            <table border="1" class="justify-content-center">
              <tbody>
                <tr>
                  <th colspan="2">
                    <h3>Ajouter une opération de maintenance</h3>
                  </th>
                </tr>
                <tr>
                  <td class="col-auto">
                    <label for="equipement">Equipement concerné</label>
                  </td>
                  <td>

                    <div class="form-group">

                      <select v-model="nouvelle_maintenance.equipement" name="equipement" class="form-control" required>
                        <option value="" disabled selected>-- Sélectionnez un équipement --</option>
                        <option v-for="eq in listEquipements" :key="eq._id" :value="eq._id">{{ eq.nom }}</option>
                      </select>
                    </div>



                  </td>
                </tr>
                <tr>
                  <td class="col-auto">
                    <label for="motif">Motif </label>
                  </td>
                  <td>

                    <textarea v-model="nouvelle_maintenance.motif" name="motif" id="motif"
                      class="form-control"></textarea>
                  </td>
                </tr>
                <tr>
                  <td class="col-auto">
                    <label for="anomalie">Anomalie</label>
                  </td>
                  <td>
                    <div class="form-group">

                      <select v-model="nouvelle_maintenance.anomalie" name="anomalie" class="form-control" required
                        multiple>
                        <option value="" disabled selected>-- Sélectionnez une anomalie --</option>
                        <option v-for="an in anomalies" :key="an._id" :value="an.nom">{{ an.nom }}</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="col-auto">
                    <label for="actions_realisees">Actions réalisées </label>
                  </td>
                  <td>

                    <textarea v-model="nouvelle_maintenance.actions_realisees" name="actions_realisees"
                      id="actions_realisees" class="form-control" rows="5"></textarea>
                  </td>
                </tr>
                <tr>
                  <td class="col-auto">
                    <label for="horametre">Horamètre </label>
                  </td>
                  <td>
                    <input v-model="nouvelle_maintenance.horametre" type="number" class="form-control" id="horametre"
                      name="horametre">
                  </td>
                </tr>
                <tr>
                  <td class="col-auto">
                    <label for="">Période</label>
                  </td>
                  <td colspan="2" class="date">
                    <div class="form-group">
                      <label for="date_entree">Date d'entrée</label>
                      <input v-model="nouvelle_maintenance.date_entree" type="date" class="form-control" id="date_entree"
                        name="date_entree">
                    </div>
                    <div class="form-group">
                      <label for="date_sortie">Date de sortie</label>
                      <input v-model="nouvelle_maintenance.date_sortie" type="date" class="form-control" id="date_sortie"
                        name="date_sortie">
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="col-auto">
                    <label for="operateur_maintenance">Opérateur de maintenance</label>
                  </td>
                  <td colspan="2">
                    <div class="select">
                      <div class="form-group">

                        <select v-model="nouvelle_maintenance.operateur_maintenance" name="operateur_maintenance"
                          class="form-control" required multiple>
                          <option value="" disabled selected>-- Sélectionnez --</option>
                          <option v-for="maint in maintenanciers" :key="maint._id"
                            :value="maint.nom + ' ' + maint.prenom">{{
                              maint.nom }} {{ maint.prenom }}</option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="col-auto">
                    <div class="form-group">
                      <label for="utiliser_consommable">Avez-vous utilisé des consommables ? </label>
                      <input v-model="utiliser_consommable" type="radio" class="form-check-input" name="consommable"
                        value="true">Oui
                      <input v-model="utiliser_consommable" type="radio" class="form-check-input" name="consommable"
                        value="false">Non
                    </div>
                  </td>
                  <td class="col-auto">
                    <div class="form-group">
                      <label for="ajuter_autres_depenses">Ajouter des dépenses ? </label>
                      <input v-model="ajuter_autres_depenses" type="radio" class="form-check-input" name="depenses"
                        value="true">Oui
                      <input v-model="ajuter_autres_depenses" type="radio" class="form-check-input" name="depenses"
                        value="false">Non
                    </div>

                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-center">
                    <div class="form-group">
                      <input type="submit" class="btn btn-primary" @click.prevent="creerMaintenance(nouvelle_maintenance)"
                        value="Ajouter">
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>





          <form id="inscription-form" action="#" method="POST" v-if="$store.state.display_consommation_form">
            <table class="bg-light">
              <tr class="header">
                <th colspan="4"> maintenance du: {{ new Date(last_maintenance.date_entree).toLocaleDateString()
                }} Au: {{ new Date(last_maintenance.date_sortie).toLocaleDateString() }}<br> {{
  findName(last_maintenance.equipement, listEquipements) }}</th>

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
            <h1 class="titre">Ajouter une consommation</h1>
            <table class="bg-light">
              <tr class="header">
                <th>
                  <label for="equipement">Consommable concerné</label>
                </th>
                <th>
                  <label for="quantite">Quantité utilisée</label>
                </th>

                <th>
                  <label for="description">Commentaire </label>
                </th>

                <th>
                  <label for="date">Date</label>
                </th>
              </tr>

              <tr>
                <td>
                  <select v-model="nouvelle_consommation.consommable" name="consommable" id="" required>
                    <option value="" disabled selected>-- Sélectionnez --</option>
                    <option v-for="cons in listConsommable" :key="cons._id" :value="cons._id">{{ cons.nom }}: {{
                      cons.quantite_en_stock }}</option>
                  </select>
                  <!-- <span v-if="!isEquipementSelected" class="error-message">Champ obligatoire.</span> -->
                </td>
                <td>
                  <input class="commentaire" type="number" v-model="nouvelle_consommation.quantite" id="" name="quantite">
                </td>

                <td>
                  <!--      <textarea class="commentaire" v-model="nouvelle_consommation.description" id="description"
              name="description"></textarea> -->
                  <select v-model="nouvelle_consommation.description" name="description" id="" required multiple>
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
              <input @click.prevent="creerConsommation(nouvelle_consommation)" type="submit" value="Ajouter"
                class="btn btn-success m-2">
              <input type="reset" value="Terminer" class="btn btn-success m-2" @click.prevent="terminer()">
            </div>
          </form>
        </div>

        <div class="historique_maintenance">
          <div v-if="$store.state.display_liste_maintenance" class="list-maintenance  m-3" id="list_maintenance">
            <Entete class="entete" />
            <!-- <h4>Toutes les maintenances</h4> -->
            <div class="justify-content-center">
              <button v-print="'#list_maintenance'" class="addmaintenance btn btn2 btn-secondary m-2">Imprimer</button>
              <button @click="togleAuteur()" v-if="testAdminUser() || testUserControlleur()"
                class="addmaintenance btn btn2 btn-secondary m-2">{{ auteurButton }}</button>

            </div>
            <table class="bg-light">
              <tr>
                <th colspan="9">Historique des maintenances </th>
              </tr>
              <tr>
                <th>Equipement</th>
                <th>Anomalie</th>
                <!-- <th>Consommation</th> -->
                <!-- <th> Autres dépenses</th> -->
                <th>Horamètre</th>
                <th>Date d'entrée</th>
                <th>Date de sortie</th>
                <!-- <th>Operateur de maintenance</th> -->
                <th v-if="display_auteur">Auteur</th>
                <th class="no-print">Actions</th>
              </tr>
              <tr v-for="listM in listMaintenanceWithAgregation" :key="listM._id">
                <td>{{ listM.equipement }}</td>
                <td>
                  <ul>
                    <li v-for="a in listM.anomalie" :key="a">
                      {{ a }}
                    </li>
                  </ul>
                </td>
                <!-- <td>
                  <ul>
                    <li v-for="consommable in listM.consommables" :key="consommable.nom">
                      {{ consommable.nom }}: {{ consommable.quantite }}
                    </li>
                  </ul>

                </td> -->
                <!-- <td>
                  <ul v-if="listM.autres_depenses.length > 0">
                    <li v-for="dep in listM.autres_depenses" :key="dep">
                      {{ dep.designation }}: {{ dep.montant }}
                      <hr>
                    </li>

                  </ul>
                </td> -->
                <td>{{ listM.horametre }}</td>
                <td>{{ new Date(listM.date_entree).toLocaleDateString() }}</td>
                <td>{{ new Date(listM.date_sortie).toLocaleDateString() }}</td>
                <!-- <td>{{ listM.operateur_maintenance }}</td> -->
                <td v-if="display_auteur">{{ listM.utilisateur.prenom }} {{ listM.utilisateur.nom }}: {{
                  listM.utilisateur.role }}
                </td>
                <td class="no-print">
                  <button @click="ficheMaintenance(listM)" class="btn btn-success">Détails</button>
                </td>
              </tr>

            </table>

            <div class="justify-content-center">
              <button v-print="'#list_maintenance'" class="addmaintenance btn btn2 btn-secondary m-2">Imprimer</button>
              <button @click="togleAuteur()" v-if="testAdminUser() || testUserControlleur()"
                class="addmaintenance btn btn2 btn-secondary m-2">{{ auteurButton }}</button>

            </div>
          </div>
        </div>


      </div>
      <div class="prelevement" v-if="afficher_prelevement">
        <div class="list_btn">
          <button @click="switchConsommation('form')" class="btn btn-success m-2">Faire un Prelèvement</button>
          <button @click="switchConsommation('historique')" class="btn btn-success m-2">Historiques des
            prelèvements</button>

        </div>
        <div class="consommation" v-if="afficher_consommation_form">
          <Consommation />
        </div>


        <!-- Afficher l'historique des maintenances -->
        <div class="historique" v-if="afficher_historique_consommation">
          <HistoriqueConsommation />
        </div>
      </div>
      <div class="demande" v-if="afficher_demande">
        <DemandeAchat />
      </div>
    </div>
  </div>
  <!--   <nav class="menu">
    <ul>
      <li class="btn btn-success m-2 btn_li" @click="changeDisplay2(3)"><a href="#">Faire une maintenance
        </a></li>
      <li class="btn btn-success m-2 btn_li" @click="changeDisplay2(1)"><a href="#">Historique des maintenances</a></li>
      <li class="btn btn-success m-2 btn_li" @click="changeDisplay2(2)"><a href="#">Faire un prélèvement
        </a></li>
      <li class="btn btn-success m-2 btn_li" @click="changeDisplay2(4)"><a href="#">Historique des prélèvements</a>
      </li>




    </ul>
  </nav> -->



  <!-- Afficher le composant consommation -->
</template>

<script>
// Impotation des tests de role
import { getAllJustifications } from '@/api/justification';
import print from 'vue3-print-nb'
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
import MenuBar from '../components/MenuBar.vue'
import Consommation from '../components/Consommation.vue'
import HistoriqueConsommation from '../components/HistoriqueConsommation.vue'
import Entete from '../components/Entete.vue';
import { getAllAnomalies } from '@/api/anomalie';
import { getAllMaintenanciers } from '@/api/maintenancier';
import DemandeAchat from './DemandeAchat.vue';
import FicheMaintenance from './FicheMaintenance.vue';
// import { testAdminUser, testControlleurUser, testFinancierUser, testGestionnaireUser } from '/auth/auth-guard-admin';

export default {
  name: 'Maintenance',
  components: {
    MenuBar,
    Consommation,
    HistoriqueConsommation,
    Entete,
    DemandeAchat,
    FicheMaintenance
  },

  data() {
    return {
      titre: "Opérations de maintenance",
      afficher_fiche_maintenance: false,
      maintenance_detaillee: "",
      afficher_maintenance: true,
      afficher_prelevement: false,
      afficher_demande: false,
      afficher_consommation_form: true,
      afficher_historique_consommation: false,
      listMaintenance: "",
      listMaintenanceWithAgregation: "",
      listConsommable: "",
      justifications: [],

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
        horametre: 0,
        anomalie: "",
        operateur_maintenance: "",
        actions_realisees: ""
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
  directives: {
    print
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
    this.user = JSON.parse(localStorage.getItem('user'));

    this.chargerMaintenance();
    this.chargerMaintenanceWithAgregate();
    this.chargerEquipement();
    this.chargerConsommables();
    this.anomalies = await getAllAnomalies()
    this.maintenanciers = await getAllMaintenanciers()
    this.justifications = await getAllJustifications()
    console.log(this.user)

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
        this.listMaintenanceWithAgregation = await getAllMaintenanceWithAgregation(this.user.token);
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

    /*     //Créer une maintenance
        async creerMaintenance(maintenanceData) {
          console.log(this.nouvelle_maintenance)
          // Vérifier si tous les attributs sont renseignés
          if (
            !maintenanceData.equipement ||
            !maintenanceData.date_entree ||
            !maintenanceData.date_sortie ||
            !maintenanceData.horametre ||
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
              this.changeDisplay2(1)
              console.log(this.last_maintenance)
    
              router.push({ name: 'AutresDepenses', params: { id } });
    
            } else {
              this.changeDisplay2(1)
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: 'Un problème est survenu',
              text: error,
              icon: 'error'
            });
          }
        } */
    async creerMaintenance(maintenanceData) {
      // Vérifier si tous les attributs sont renseignés
      if (!maintenanceData.equipement || !maintenanceData.date_entree || !maintenanceData.date_sortie || !maintenanceData.horametre || !maintenanceData.anomalie || !maintenanceData.operateur_maintenance) {
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
      };

      try {
        const result = await Swal.fire({
          title: 'Êtes-vous sûr de vouloir enregistrer ?',
          text: 'Voulez-vous vraiment créer cette maintenance ?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, enregistrer !',
          cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
          console.log("maintenance: ", maintenanceData)
          await createMaintenance(maintenanceData);

          Swal.fire({
            title: 'Enregistré avec succès',
            icon: 'success'
          });

          this.listMaintenanceWithAgregation = await getAllMaintenanceWithAgregation();
          this.last_maintenance = await getLastMaintenance();

          const id = this.last_maintenance._id;
          localStorage.setItem('maintenance_en_cours', JSON.stringify([]));

          if (this.utiliser_consommable) {
            store.state.display_maintenance_form = false;
            store.state.display_consommation_form = true;
          } else if (this.ajuter_autres_depenses) {
            this.changeDisplay2(1);
            router.push({ name: 'AutresDepenses', params: { id } });
          } else {
            this.changeDisplay2(1);
          }

        } else {
          // L'utilisateur a annulé l'enregistrement
          console.log('L\'enregistrement de la maintenance a été annulé.');
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
      consommationData.equipement = this.nouvelle_maintenance.equipement;
      console.log(this.nouvelle_maintenance)

      // Vérifier si tous les attributs sont renseignés
      if (
        !consommationData.equipement ||
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

    ficheMaintenance(maintenance) {
      this.maintenance_detaillee = maintenance
      this.afficher_fiche_maintenance = true

    },

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

    affichage(option) {
      if (option == "maintenance") {
        this.afficher_maintenance = true
        this.afficher_prelevement = false
        this.afficher_demande = false
        this.titre = "Opérations de maintenance"
      } else if (option == "prelevement") {
        this.afficher_maintenance = false
        this.afficher_prelevement = true
        this.afficher_demande = false
        this.titre = "Opérations de prelèvement"
      } else if (option == "demandes") {
        this.afficher_maintenance = false
        this.afficher_prelevement = false
        this.afficher_demande = true
        this.titre = "Demandes d'achat"
      }
    },

    switchConsommation(option) {
      if (option == "form") {
        this.afficher_consommation_form = true
        this.afficher_historique_consommation = false
      } else if (option == "historique") {
        this.afficher_consommation_form = false
        this.afficher_historique_consommation = true
      }
    },


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
          store.state.display_consommation_form = false;
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
        title: 'Êtes-vous sûr de vouloir terminer ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmer',
        cancelButtonText: 'Annuler'
      }).then(async (result) => {
        if (result.isConfirmed) {
          // L'utilisateur a cliqué sur le bouton de confirmation
          this.listMaintenanceWithAgregation = await getAllMaintenanceWithAgregation();
          this.nouvelle_maintenance = {

            date_entree: "",
            date_sortie: "",
            horametre: "",
            anomalie: "",
            operateur_maintenance: "",
            // consommation:{}

          }
          this.consommation_en_cours = []

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
.menu_bar {
  margin-bottom: 120px;
}

.principal {
  display: flex;
  justify-content: space-between;
}

.details {
  width: 80%;
  margin: 10px auto;
}



.menu_vertical {
  width: 20%;
  height: 100vh;
  justify-content: center;
  background-color: #f1f1f1;
  /* flex: 0 0 15%; */
  padding: 10px;
  /* margin: 0; */
  border-radius: 10px;
}

.contenu {
  width: 75%;
  height: 100vh;
  margin: auto;
}


.nav-link-active button {
  background-color: #555;
  /* Mettez ici la couleur que vous souhaitez pour le lien actif */
  color: white;
}

.menu_vertical .btn-menu_v {
  margin-left: 20px;
  width: 100% !important;
}

.list-maintenance {
  max-height: 100vh;
  overflow-y: auto;
}


.entete {
  display: none;
}

/* Tableau des utilisateurs */
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

.btn_li {
  border-radius: 5px;
}

.containe {
  width: 80%;
  margin: 0 10px;
  /* padding: 20px; */
}

h1 {
  text-align: center;
}



label {
  display: block;
  font-weight: bold;
}




.error-message {
  color: red;
  margin-top: 5px;
}

.date {
  display: flex;
  justify-content: space-around;
  width: 100%;
  /* margin-bottom: 10px; */
}









.commentaire {
  width: 80% !important;
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

  /* Tableau des utilisateurs */
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

}



.menu {
  /* background-color: rgba(121, 113, 236, 0.7); */
  padding: 0;
  width: 100%;
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
  /* padding: 12px; */
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