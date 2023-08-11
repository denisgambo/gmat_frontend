<template>
  <div class="list-categories" v-if="displayCategoriesConsommable">
    <div class="single-categorie critique" v-if="consommables_seuil_critique.length > 0">
      <h2>Stock critique</h2>

      <h2>{{ consommables_seuil_critique.length }}</h2>

      <router-link to="/stock-critique" class="voir">Voir la liste</router-link>

    </div>
    <div class="single-categorie" v-for="categorie in listCategoriesConsommables" :key="categorie._id">
      <h2>{{ categorie.nom }}</h2>
      {{ categorie.description }} <br>

      <button class="voir" type="button" @click="chargerConsommables(categorie._id)"> Voir les
        consommables</button>
    </div>
  </div>

  <div class="list-equipement" v-if="displayConsommableByCategorie">
    <button type="button" @click="back()">retour</button>
    <table border="1">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <!-- <th>Prix d'achat</th> -->
          <th>Quantité en stock</th>
          <th>observation</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consommable in listConsommablesByCategorie" :key="consommable._id">
          <td>{{ consommable.nom }}</td>
          <td>{{ consommable.description }}</td>
          <!-- <td>{{ consommable.prix_achat }}</td> -->
          <td>{{ consommable.quantite_en_stock }}</td>
          <td>{{ consommable.observation }}</td>
        </tr>
      </tbody>
    </table>
    <hr>
    <!-- <div class="list-maintenance">
              <table border="1">
                <thead >
                  <tr>
                    <th>Equipement</th>
                    <th>Anomalie</th>
                    <th>Consommation</th>
                    <th>Horamètre</th>
                    <th>Maintenancier</th>
                    <th>Date d'entrée</th>
                    <th>Date de sortie</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="consommable in listConsommablesByCategorie" :key="consommable._id">
                    <td>{{ consommable.nom }}</td>
                    <td>{{ consommable.description }}</td>
                      <td>{{ consommable.prix_achat }}</td>
                    <td>{{ consommable.quantite_en_stock }}</td>
                    <td>{{ consommable.observation }}</td>
                    <td><button>Maintenance</button></td>
                  </tr>
                </tbody>
              </table>
            </div> -->
  </div>
</template>

<script>
import { getCategoriesConsommable, getConsommableByCategorie, getConsommablesCritique } from '../api/consommable'

export default {
  name: 'Consommable',
  components: {
  },
  data() {
    return {
      listCategoriesConsommables: "",
      listConsommablesByCategorie: "",
      displayConsommableByCategorie: false,
      displayCategoriesConsommable: true,
      consommables_seuil_critique: "",


    }
  },

  async created() {
    this.chargerCategoriesConsommable();
    this.consommables_seuil_critique = await getConsommablesCritique()
  },

  methods: {
    async chargerCategoriesConsommable() {
      try {
        this.listCategoriesConsommables = await getCategoriesConsommable();
        console.log(this.listCategoriesConsommables);
      } catch (error) {
        console.log(error)
      }
    },

    async chargerConsommables(categorieConsommableId) {
      try {
        this.listConsommablesByCategorie = await getConsommableByCategorie(categorieConsommableId);
        console.log(this.listConsommablesByCategorie);
        this.displayConsommableByCategorie = true;
        this.displayCategoriesConsommable = false;
      } catch (error) {
        console.log(error)
      }
    },


    back() {
      this.displayConsommableByCategorie = false;
      this.displayCategoriesConsommable = true;
    }
  }
}
</script>

<style scoped>
.single-categorie {
  background-color: bisque;
  width: 25%;
  min-height: 150px;
  margin: 10px;
  border-radius: 10px;
}

.list-categories {
  display: flex;
  flex-wrap: wrap;
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color: white;
}

td {
  border: 1px solid black;
  padding: 10px;
}

.header {
  font-weight: bold;
  background-color: lightgray;
}

th {
  padding: 10px;
  background-color: lightgray;
}

.voir {
  border-radius: 5px;
  border: none;
}

/* Animation pour faire clignoter la div */
@keyframes blink {
  0% {
    background-color: red;
  }

  50% {
    background-color: transparent;
  }

  100% {
    background-color: red;
  }
}

/* Style pour la div critique */
.single-categorie.critique {
  animation: blink 1s infinite;
  /* Appliquer l'animation à la div critique */
}

/* Autres styles pour la div critique (vous pouvez les personnaliser) */
.single-categorie.critique {
  background-color: red;
  color: white;
  padding: 10px;
  border: 1px solid darkred;
}
</style>