<template>
  <div class="principal"
    :style="{ height: '100vh', backgroundImage: `url(${entreprise.background_image_accueil})`, backgroundSize: 'cover', marginTop: 0 }">
    <div>
      <h1>G-MAT</h1>
      <small>Gestion de matériel</small>
    </div>
    <div class="tout">
      <div class="logo">
        <img :src="entreprise.logo" alt="logo">
      </div>
      <div class="form-connexion">
        <div v-if="entreprise">
          <div>
            <h2>{{ entreprise.nom }}</h2>

          </div>
        </div>

        <div class="form-group">
          <input v-model="localLogin" type="text" placeholder="login" class="form-control"><br>
          <input v-model="localPassword" type="password" placeholder="Mot de passe" class="form-control">
        </div>

        <button type="button" class=" btn btn-submit" @click="navigateToDashboard">Se connecter</button>

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






    async chargerEntreprise() {
      try {
        this.entreprise = await getEntreprise();
        console.log(this.entreprise)
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
        const response = await createConnexion(user_to_save)
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

.form-control {
  width: 50%;
  margin: 5px auto;
}

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

/* input {
  margin-bottom: 20px;
  height: 25px;
  border-radius: 10px;
} */

input:focus {
  outline: none;
}

.btn-submit {
  background-color: blue;
  color: white;
  /* height: 30px; */
  width: 25%;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>