<template>
  <div class="principal"
    :style="{ height: '100vh', backgroundImage: `url(${entreprise.background_image_accueil})`, backgroundSize: 'cover', marginTop: 0 }">
    <div>
      <h1>G-MAT</h1>
    </div>
    <div class="tout">
      <div class="logo">
        <img :src="entreprise.logo" alt="logo">
      </div>
      <div class="form-connexion">
        <div v-if="entreprise">
          <div>
            <h2>{{ entreprise.nom }}</h2>
            <!-- <small>{{ entreprise.slogan }}</small> -->
          </div>
        </div>

        <div class="form-group">
          <input v-model="localLogin" type="text" placeholder="Identifiant"><br>
          <input v-model="localPassword" type="password" placeholder="Mot de passe">
        </div>

        <button type="button" class="btn-submit" @click="navigateToDashboard">Se connecter</button>

        <form>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


import { getEntreprise, getUser } from '../api/parametre';
import Swal from 'sweetalert2'
import { createConnexion } from '@/api/historique_connxion';
export default {
  name: 'HomeView',
  components: {

  },

  data() {
    return {
      entreprise: "",
      localLogin: "",
      localPassword: "",
      user: "",
      principal: {}
    }
  },

  created() {
    this.chargerEntreprise();
    this.principal = {
      height: "100vh",
      background: this.entreprise.background_image_accueil
      ,
      backgroundSize: "cover",
      marginTop: 0,
    }
  },
  /*  computed: {
     ...mapGetters(["isAuthenticated"])
   }, */

  methods: {
    // ...mapActions(['login']),
    async navigateToDashboard() {
      try {
        this.user = await getUser(this.localLogin, this.localPassword);
        if (!this.user) {
          this.avertissement("Login ou mot de passe incorect");
        } else if (!this.user.autoriser) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Votre compte a été bloqué par un administrateur",
            // footer: '<a href="">Pourquoi ce message</a>'
          })

        } else {
          // console.log(this.user);
          const id = this.user._id;

          // Exemple :
          const user_to_save = {
            nom: this.user.nom,
            prenom: this.user.prenom,
            role: this.user.role
          }
          this.enregistrerConnexion(user_to_save)
          localStorage.setItem('user', JSON.stringify(this.user));
          this.$router.push({ name: 'TableauDeBord', params: { id } });
        }
      } catch (error) {
        console.log(error)
        this.avertissement("Ligin ou mot de passe incorrect");
      }
    },

    /*   async navigateToDashboard() {
        console.log("Avant authentification", this.$store.getters.isAuthenticated);
        console.log("Avant", this.$store.getters.utilisateur);
        try {
          await this.$store.dispatch('login', { login: this.localLogin, password: this.localPassword });
  
          // Vérifier l'état de l'authentification
          if (this.$store.getters.isAuthenticated) {
            // Utilisateur authentifié avec succès
            console.log("Après authentification", this.$store.getters.isAuthenticated);
            console.log("Après", this.$store.getters.utilisateur);
  
            const id = this.user._id;
            this.$router.push({ name: 'TableauDeBord', params: { id } });
          } else {
            // Échec de l'authentification
            this.avertissement("Login ou mot de passe incorrect");
          }
        } catch (error) {
          console.log(error);
          this.avertissement(error.message);
        }
      }, */




    async chargerEntreprise() {
      try {
        this.entreprise = await getEntreprise();
      } catch (error) {
        console.log(error)
      }
      // console.log(this.entreprise);
    },

    avertissement(message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        // footer: '<a href="">Pourquoi ce message</a>'
      })
    },
    async enregistrerConnexion(user_to_save) {
      try {
        response = await createConnexion(user_to_save)
        console.log(response.status)
      } catch (error) {
        console.log(error)
      }
    }


  }



}
</script>

<style scoped>
.principal {
  height: 100vh;
  /* background: url("../assets/images/andrew-palmer-Z4K7eVjN1v4-unsplash.jpg"); */
  background-size: cover;
  margin-top: 0;
}

.form-connexion {
  background-color: #6F6F6F;
  width: 50%;
  margin: 80px auto;
  /* margin-top: 0; */
  border-radius: 20px;
  margin-top: 0px;
}

/*   .logo{
    margin-top: 0px;
  } */

.logo {
  /* margin-top: 20px; */
  margin-bottom: 0;
}

.tout {
  margin: 50px auto;
}

.logo>img {
  width: 150px;
  height: 75px;
}

input {
  margin-bottom: 20px;
  height: 25px;
  border-radius: 10px;
}

input:focus {
  outline: none;
}

.btn-submit {
  background-color: blue;
  height: 30px;
  width: 25%;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>