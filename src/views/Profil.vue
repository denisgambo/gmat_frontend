<template>
    <MenuBar />
    <div class="principal">
        <h2>Gérer mon profil</h2>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-4">
                    <div class="profile-card">
                        <div class="profile-img">
                            <img src="../assets/images/avatar7.png" alt="Profile Picture">
                        </div>
                        <div class="profile-info">
                            <h4 class="profile-name">Nom: {{ utilisateur.prenom }} {{ utilisateur.nom }}</h4>
                            <p class="profile-role">
                                Login: {{ utilisateur.login }} <br>
                                Role: {{ utilisateur.role }} <br>
                                Téléphone: {{ utilisateur.telephone }} <br>
                                Email: {{ utilisateur.email }} <br>
                            </p>
                            <!--  <p class="profile-location">New York, USA</p>
                            <p class="profile-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at quam eget
                                turpis euismod eleifend.</p> -->
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="list_btn">
                        <button @click="changeDisplay(1)" class="btn btn1 btn-secondary m-2">Modifier mon profil</button>
                        <button @click="changeDisplay(2)" class="btn btn1 btn-secondary  m-2">Modifier mon mot de
                            passe</button>
                        <!-- <button class="btn btn-secondary  m-2">Modifier mon profil</button> -->

                    </div>
                    <div class="profile-about">
                        <div class="modif_form" v-if="display_modif_form">
                            <form @submit.prevent="ModifierProfil()">
                                <div class="mb-3">
                                    <label for="Login" class="form-label">Login</label>
                                    <input v-model="utilisateur.login" type="text" class="form-control" id="login"
                                        aria-describedby="">
                                    <!-- <div id="" class="form-text">Entrez un nouveau login </div> -->
                                </div>

                                <div class="mb-3">
                                    <label for="telephone" class="form-label">N° de téléphone</label>
                                    <input v-model="utilisateur.telephone" type="phone" class="form-control" id="telephone"
                                        aria-describedby="">
                                    <!-- <div id="" class="form-text">Entrez un nouveau login </div> -->
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email </label>
                                    <input v-model="utilisateur.email" type="email" class="form-control" id=""
                                        aria-describedby="emailHelp">
                                    <!-- <div id="emailHelp" class="form-text">Nouvelle adresse email</div> -->
                                </div>
                                <!--   <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1">
                                </div> -->

                                <button type="submit" class="btn btn1 btn-primary m-3">Submit</button>
                            </form>
                        </div>

                        <div class="password_form" v-if="display_passord_form">
                            <form>
                                <div class="mb-2">
                                    <label for="inputPassword5" class="form-label">Mot de passe actuel</label>
                                    <input v-model="passe_actuel" type="password" class="form-control"
                                        aria-describedby="passwordHelpBlock">
                                    <div class="form-text">
                                        Entrez votre mot de passe actuel
                                    </div>
                                </div>

                                <div class="d-flex">
                                    <div class="m-2">
                                        <label for="inputPassword5" class="form-label">Nouveau mot de passe </label>
                                        <input v-model="nouveau_passe" type="password" class="form-control"
                                            aria-describedby="" placeholder="8 caractères au moins">
                                        <!-- <div id="" class="form-text">
                                            Entrez un mot de passe de 8 caractères au moins
                                        </div> -->
                                    </div>
                                    <div class="m-2">
                                        <label for="inputPassword5" class="form-label"> Confirmez le nouveau mot de passe
                                        </label>
                                        <input v-model="nouveau_passe_confirm" type="password" class="form-control"
                                            aria-describedby="">
                                        <!-- <div id="" class="form-text">
                                            Entrez un mot de passe de 8 caractères au moins
                                        </div> -->
                                    </div>
                                </div>
                                <small v-if="nouveau_passe != nouveau_passe_confirm" class="error-message">Veuillez entrer
                                    le meme mot de passe</small>

                                <button @click.prevent="submitPasswordUpdate()" type="submit"
                                    class="btn btn1 btn-primary m-3">Modifier le mode de passe</button>


                            </form>
                        </div>
                    </div>
                    <!--    <div class="profile-skills">
                        <h3 class="section-title">Skills</h3>
                        <ul class="skills-list">
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                            <li>Vue.js</li>
                            <li>Bootstrap</li>
                        </ul>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue'
import { createDeconnexion } from '@/api/historique_connxion'
import Swal from 'sweetalert2'
import { getUserById, updatePassword } from '@/api/utilisateur'
export default {
    name: "Profil",
    props: ['id'],
    components: {
        MenuBar
    },
    data() {
        return {
            utilisateur: {},
            display_modif_form: false,
            display_passord_form: false,
            passe_actuel: "",
            nouveau_passe: "",
            nouveau_passe_confirm: ""
        }
    },
    async created() {
        this.utilisateur = await getUserById(this.id)
        console.log("user", this.utilisateur)
    },
    methods: {
        ModifierProfil() {
            alert("Test")
        },
        changeDisplay(entree) {
            if (entree == 1) {
                this.display_modif_form = true;
                this.display_passord_form = false
            } else if (entree == 2) {
                this.display_passord_form = true;
                this.display_modif_form = false
            }
        },
        async enregistrerDeconnexion(user_to_save) {
            try {
                response = await createDeconnexion(user_to_save)
            } catch (error) {
                console.log(error)
            }
        },

        deconnexion() {
            const user_to_save = {
                nom: this.user.nom,
                prenom: this.user.prenom,
                role: this.user.role
            }
            this.enregistrerDeconnexion(user_to_save)
            localStorage.removeItem('user');
            this.$router.push('/');
        },

        async submitPasswordUpdate() {
            // Rassemblez les informations du mot de passe actuel et du nouveau mot de passe dans un objet
            if (this.nouveau_passe.localeCompare(this.nouveau_passe_confirm, undefined, { sensitivity: 'accent' }) !== 0) {
                // Afficher le message d'erreur
                Swal.fire({
                    title: 'Le mot de passe ne correspond pas',
                    icon: 'error'
                });
                return;
            }


            if (this.nouveau_passe.trim().length < 8) {
                Swal.fire({
                    title: 'Le mot de passe doit etre qu moins 8 caractère',
                    icon: 'error'
                });
                return;
            }
            const passwordUpdateData = {
                mot_de_passe_actuel: this.passe_actuel,
                nouveau_mot_de_passe: this.nouveau_passe,
                utilisateurId: this.utilisateur._id
            };
            // console.log(passwordUpdateData)

            Swal.fire({
                title: 'Votre mot de passe sera modifié. Veuillez bien noter le nouveau mot de passe ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation

                    try {
                        // Appeler la fonction updatePassword avec les informations du mot de passe
                        const response = await updatePassword(passwordUpdateData);
                        // Le mot de passe a été mis à jour avec succès
                        Swal.fire({
                            title: 'Succès',
                            text: response,
                            icon: 'success',
                        });
                        // Faites ce que vous voulez après la mise à jour du mot de passe, par exemple afficher un message à l'utilisateur
                    } catch (error) {
                        // Une erreur s'est produite lors de la mise à jour du mot de passe
                        console.error('Erreur lors de la mise à jour du mot de passe', error);
                        Swal.fire({
                            title: 'Erreur',
                            text: "Erreur: Rassurez-vous de bien renseigner le mot de passe actuel",
                            icon: 'error',
                        });
                        alert(error)
                        // Faites ce que vous voulez en cas d'erreur, par exemple afficher un message d'erreur à l'utilisateur
                    }
                    this.$router.push('/');
                }
            });


        },
    }
}
</script>

<style scoped>
body {
    background-color: #f8f8f8;
}

.container {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.profile-img img {
    width: 100%;
    border-radius: 50%;
}

.profile-card {
    text-align: center;
    background-color: antiquewhite;
}

.profile-name {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
}

.profile-role,
.profile-location {
    color: #777;
    font-size: 16px;
}

.profile-bio {
    margin-top: 20px;
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.about-text {
    margin-bottom: 20px;
}

.skills-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.skills-list li {
    display: inline-block;
    background-color: #f2f2f2;
    padding: 5px 15px;
    border-radius: 20px;
    margin: 5px;
    font-size: 14px;
}

.modif_form {
    width: 50%;
    margin: 10px auto;
    background-color: rgb(245, 250, 244);
    border: 1px blue solid;
}

.password_form {
    width: 80%;
    margin: 10px auto;
    border: 1px blue solid;
}

.error-message {
    color: red;
}

.btn1 {
    width: 250px;
}
</style>