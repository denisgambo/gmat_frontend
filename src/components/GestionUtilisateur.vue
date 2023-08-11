<template>
    <div class="contenu">
        <MenuBar />
        <h1 class="h1">Gestion des utilisateurs</h1>


        <button @click="displayForm()" class="display_user_form" type="button">Ajouter un utilisateur</button>
        <button @click="displaylist()" class="display_user_form" type="button">afficher les utilisateurs</button>
        <button @click="displayhist()" class="display_user_form" type="button">Historique des connexions</button>



        <div class="list_user" v-if="display_list_user">
            <h2>liste des utilisateurs</h2>
            <table>
                <thead>
                    <tr>
                        <td colspan="6">Liste des utilisateurs</td>
                    </tr>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Role</th>
                        <th>Téléphone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="currentUser in list_utilisateurs" :key="currentUser._id">
                        <td>{{ currentUser.nom }}</td>
                        <td>{{ currentUser.prenom }}</td>
                        <td>{{ currentUser.role }}</td>
                        <td>{{ currentUser.telephone }}</td>
                        <td>{{ currentUser.email }}</td>
                        <td class="d-flex">
                            <button @click="SupprimerUser(currentUser._id)"
                                class="btn btn-secondary btn-sm">Supprimer</button>
                            <!-- v-if="user.userId != currentUser._id" -->
                            <button class="btn btn-secondary btn-sm">Modifier</button>
                            <button @click="changerAutorisation(currentUser._id, currentUser.autoriser)"
                                class="btn btn-secondary btn-sm">{{ textbloquer(currentUser.autoriser) }}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="user_form" v-if="display_form_user">
            <h2>Enregistrer un utilisateur</h2>
            <form id="inscription-form" method="post" @submit.prevent="ajouterUtilisateur(new_user)">
                <div class="select">
                    <div class="form-group">
                        <label for="nom">Nom :</label>
                        <input v-model="new_user.nom" type="text" id="nom" name="nom" required>
                    </div>
                    <div class="form-group">
                        <label for="prenom">Prénom :</label>
                        <input v-model="new_user.prenom" type="text" id="prenom" name="prenom" required>
                    </div>
                </div>

                <div class="select">
                    <div class="form-group">
                        <label for="email">Email :</label>
                        <input v-model="new_user.email" type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="telephone">N° de téléphone :</label>
                        <input v-model="new_user.telephone" type="text" id="telephone" name="telephone" required>
                    </div>
                </div>

                <div class="select">
                    <div class="form-group">
                        <label for="role">Role :</label>
                        <select v-model="new_user.role" name="role">
                            <option value="" disabled selected>-- Sélectionnez --</option>
                            <option value="administrateur">Administrateur</option>
                            <option value="gestionnaire">Gestionnaire</option>
                            <option value="financier">Financier</option>
                            <option value="controlleur">Contrôleur </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="role">Genre :</label>
                        <input v-model="new_user.genre" type="radio" name="genre" value="homme" checked>Homme
                        <input v-model="new_user.genre" type="radio" name="genre" value="femme">Femme
                    </div>
                </div>

                <div class="select">
                    <div class="form-group">
                        <label for="login">Login :</label>
                        <input v-model="new_user.login" type="text" id="login" name="login" required>
                    </div>
                </div>
                <div class="select">
                    <div class="form-group">
                        <label for="mot_de_passe">Mot de passe :</label>
                        <input v-model="new_user.mot_de_passe" type="password" id="mot_de_passe" name="mot_de_passe"
                            required>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirmer le mot de passe :</label>
                        <input v-model="new_user.mot_de_passe_confirm" type="password" id="confirm-password"
                            name="confirm-password" required>
                    </div>
                </div>
                <div class="form-group">
                    <input type="submit" value="S'inscrire">

                </div>

                <div class="form-group">

                </div>
            </form>

        </div>
        <div class="display_historique_connexions" v-if="display_historique_connexions">
            <HistoriqueConnexions />
        </div>
    </div>
</template>

<script>
import { createUser, getAllUser, supprimerUtilisateur, autorisation } from '@/api/utilisateur';
import MenuBar from '@/components/MenuBar.vue';
import Swal from 'sweetalert2'
import HistoriqueConnexions from './HistoriqueConnexions.vue';

export default {
    name: "GestionUtilisateur",
    components: {
        MenuBar,
        HistoriqueConnexions
    },

    data() {
        return {
            list_utilisateurs: {},
            user: "",
            new_user: {
                nom: "",
                prenom: "",
                telephone: "",
                email: "",
                mot_de_passe: "",
                mot_de_passe_confirm: "",
                login: "",
                image_profil: "",
                genre: "",
            },
            confirm_password: "",
            display_list_user: true,
            display_form_user: false,
            display_historique_connexions: false
        }
    },

    created() {
        this.chargerUtilisateurs();

    },

    methods: {
        async chargerUtilisateurs() {
            try {
                this.list_utilisateurs = await getAllUser()
                this.user = JSON.parse(localStorage.getItem('user'));

                console.log(this.list_utilisateurs)
            } catch (error) {
                console.log(error)
            }

        },
        async changerAutorisation(id, autoriser) {
            const user = JSON.parse(localStorage.getItem('user'));
            // this.user = user;
            if (user.userId == id) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Vous ne pouvez pas bloquer l'utilisateur courant",
                    // footer: '<a href="">Pourquoi ce message</a>'
                })
                return;
            }

            let message = "";
            if (autoriser == true) {
                message = 'L\'utilisateur sera bloqué. Continuer ?'
            } else {
                message = 'L\'utilisateur sera débloqué. Continuer ?'
            }
            Swal.fire({
                title: message, //'L\'équipement sera indisponible. Continuer ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    // const response = await updateDisponibilite(id, disponibilite);
                    await autorisation(id, autoriser)
                    this.chargerUtilisateurs()
                }
            });
        },

        async ajouterUtilisateur(user) {
            // Vérifier si tous les attributs sont renseignés
            if (
                !user.nom ||
                !user.prenom ||
                !user.telephone ||
                !user.email ||
                !user.mot_de_passe ||
                !user.login ||
                // !user.image_profil ||
                !user.genre
            ) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de l\'utilisateur',
                    icon: 'error'
                });
                return;
            }

            if (user.mot_de_passe.localeCompare(user.mot_de_passe_confirm, undefined, { sensitivity: 'accent' }) !== 0) {
                // Afficher le message d'erreur
                Swal.fire({
                    title: 'Le mot de passe ne correspond pas',
                    icon: 'error'
                });
                return;
            }


            if (user.mot_de_passe.trim().length < 8) {
                Swal.fire({
                    title: 'Le mot de passe doit etre qu moins 8 caractère',
                    icon: 'error'
                });
                return;
            }

            try {
                await createUser(user);
                Swal.fire({
                    title: 'Utilisateur créé avec succès',
                    icon: 'success'
                });
                this.chargerUtilisateurs();
                this.displaylist();
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: error.message,
                    text: error,
                    icon: 'error'
                });
            }
        }
        ,
        // Supprimer un utilisateur
        async SupprimerUser(id) {

            const user = JSON.parse(localStorage.getItem('user'));
            // this.user = user;
            console.log("id: ", id, "user: ", user)
            if (user.userId == id) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Vous ne pouvez pas Supprimer l'utilisateur courant",
                    // footer: '<a href="">Pourquoi ce message</a>'
                })
                return;
            }
            let message = "L'utilisateur sera supprimé. Continuer?";

            Swal.fire({
                title: message,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // L'utilisateur a cliqué sur le bouton de confirmation
                    try {
                        await supprimerUtilisateur(id); // Attendre la suppression de l'équipement
                        Swal.fire({
                            title: 'Réussi',
                            text: 'Utlisateur supprimé avec succès.',
                            icon: 'success',
                        });
                        this.chargerUtilisateurs();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },

        // text du button bloquer
        textbloquer(autoriser) {
            if (autoriser) {
                return "Bloquer";
            } else {
                return "Débloquer";
            }
        },

        displayForm() {
            this.display_form_user = true;
            this.display_list_user = false;
            this.display_historique_connexions = false

        },

        displaylist() {
            this.display_form_user = false
            this.display_list_user = true
            this.display_historique_connexions = false

        },
        displayhist() {
            this.display_form_user = false
            this.display_list_user = false
            this.display_historique_connexions = true
        },
        deconnexion() {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                this.$router.push('/');
            }
        },
    }
}
</script>

<style scoped>
/* Tableau des utilisateurs */
table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}



/* Bouton pour afficher le formulaire  */
.display_user_form {
    background-color: #00BF63;
    height: 30px;
    margin: 5px;
    border-radius: 7px;
}

.display_user_form:hover {
    background-color: #008000
}


/* css formulaire */

#inscription-form {
    max-width: 500px;
    margin: 0 auto;
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
input[type="password"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="checkbox"] {
    margin-right: 5px;
}

input[type="submit"],
input[type="reset"] {
    padding: 10px 20px;
    background-color: #337ab7;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
}

input[type="submit"]:hover {
    background-color: #23527c;
}


.select {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 20px;
}

.btn {
    margin: 2px;
}

.h1 {
    background-color: #23527c;
}
</style>