<template>
    <div>
        <nav class="menu">
            <ul>
                <li>
                    <router-link to="/dashbord">Tableau de bord</router-link>
                </li>

                <li>
                    <a @click="affichage('maintenance')" href="#"> Maintenances</a>
                </li>


                <li>
                    <a @click="affichage('demandes')" href="#"> Demandes d'achat</a>
                </li>


                <li class="profil">
                    <img src="../assets/images/photo_profil.png" alt=""><br>
                    <small>{{ user.nom }}</small>

                    <ul class="dropdown-menu">
                        <li @click="gotoProfil(user.userId)"><a href="#"> Mon profil</a></li>

                        <li v-if="testAdminUser()"><router-link to="/utilisateurs">Gestion des utilisateurs</router-link>
                        </li>
                        <li v-if="testAdminUser()"><router-link to="/parametre">Paramètres</router-link></li>
                        <li @click="deconnexion()"><a href="#">Déconnexion</a></li>


                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import { Store } from 'vuex';
import router from '@/router';
import { createDeconnexion } from '@/api/historique_connxion';
import store from '@/store';
export default {
    name: "MenuMaintenance",
    data() {
        return {
            user: "",

        }
    },
    methods: {
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
                    const user_to_save = {
                        nom: this.user.nom,
                        prenom: this.user.prenom,
                        role: this.user.role
                    }
                    this.enregistrerDeconnexion(user_to_save)
                    localStorage.removeItem('user');
                    this.$router.push('/');
                }
            });
        },
        gotoProfil(id) {
            router.push({ name: 'profil', params: { id } });
        },

        testAdminUser() {

            return this.user.role == "administrateur";
        },
        async enregistrerDeconnexion(user_to_save) {
            try {
                response = await createDeconnexion(user_to_save)
            } catch (error) {
                console.log(error)
            }
        },

        affichage(option) {
            if (option == "demandes") {
                store.state.menu_demandes = true
                store.state.menu_maintenance = false
            } else if (option == "maintenance") {
                store.state.menu_maintenance = true
                store.state.menu_demandes = false
            }
        }


    },


    created() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.menu_consommables = JSON.parse(localStorage.getItem("menu_consommables"))
    }
}
</script>

<style scoped>
.menu {
    background-color: #333;
    position: fixed;
    width: 100%;
    margin: auto;
    margin-bottom: 100px;
    top: 0;
    left: 0;
    right: 0;
}

.menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.menu li {
    flex: 1;
    padding: 0;
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
    margin-bottom: 2px;
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
    color: white;
    border-radius: 5px;
}
</style>