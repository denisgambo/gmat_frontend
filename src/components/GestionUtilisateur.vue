<template>
    <div class="contenu">
        <div class="menu_horizontal">
            <MenuBar />

        </div>
        <!-- <h1 class="h1">Gestion des utilisateurs</h1> -->
        <div class="bg-light">
            <h2>Gestion des utilisateurs</h2>
        </div>


        <button @click="displayForm()" class="display_user_form btn btn-success m-3" type="button">Ajouter un
            utilisateur</button>
        <button @click="displaylist()" class="display_user_form btn btn-success m-3" type="button">afficher les
            utilisateurs</button>
        <button @click="displayhist()" class="display_user_form btn btn-success m-3" type="button">Historique des
            connexions</button>



        <div class="list_user" v-if="display_list_user">
            <table>
                <thead>
                    <tr>
                        <th colspan="6">Liste des utilisateurs</th>
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
                        <td class="nom">{{ currentUser.nom }}</td>
                        <td class="nom">{{ currentUser.prenom }}</td>
                        <td class="nom">{{ currentUser.role }}</td>
                        <td class="nom">{{ currentUser.telephone }}</td>
                        <td class="nom">{{ currentUser.email }}</td>
                        <td class="d-flex">
                            <button @click="modifierUtilisateur(currentUser)" class="btn btn-success btn1">Modifier</button>
                            <button @click="changerAutorisation(currentUser._id, currentUser.autoriser)"
                                class="btn btn-secondary btn1">{{ textbloquer(currentUser.autoriser) }}</button>
                            <button @click="SupprimerUser(currentUser._id)" class="btn btn-danger btn1">Supprimer</button>
                            <!-- v-if="user.userId != currentUser._id" -->


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
                            <option value="moyens generaux">Moyens généraux</option>
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
import { createUser, getAllUser, supprimerUtilisateur, autorisation, updateUser } from '@/api/utilisateur';
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
            list_utilisateurs: [],
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
        // Votre fonction modifier_utilisateur
        modifierUtilisateur(user_enter) {
            // Utilisation de SweetAlert2 pour afficher le formulaire
            Swal.fire({
                title: 'Modifier utilisateur',
                html: `
            <form id="form-modifier-utilisateur">
                <div class="form-group">
                    <label for="role">Rôle de l'utilisateur</label>
                    <select class="form-control" id="role">
                        <option value="" disabled selected>-- Sélectionnez --</option>
                            <option value="administrateur">Administrateur</option>
                            <option value="gestionnaire">Gestionnaire</option>
                            <option value="financier">Financier</option>
                            <option value="controlleur">Contrôleur </option>
                            <option value="moyens generaux">Moyens généraux</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="mot_de_passe">Mot de passe</label>
                    <input type="password" class="form-control" id="mot_de_passe">
                </div>
                <div class="form-group">
                    <label for="confirmation_mot_de_passe">Confirmation du mot de passe</label>
                    <input type="password" class="form-control" id="confirmation_mot_de_passe">
                </div>
            </form>
        `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Valider',
                preConfirm: () => {
                    // Récupération des valeurs des champs du formulaire
                    const role = document.getElementById('role').value;
                    const motDePasse = document.getElementById('mot_de_passe').value;
                    const confirmationMotDePasse = document.getElementById('confirmation_mot_de_passe').value;

                    // Vérification si les mots de passe correspondent
                    if (motDePasse !== confirmationMotDePasse) {
                        Swal.showValidationMessage('Les mots de passe ne correspondent pas');
                        return false;
                    }

                    // Appel de la fonction valider() si les mots de passe correspondent

                    const user_modifier = {
                        id: user_enter._id,
                        mot_de_passe: motDePasse,
                        role: role

                    }
                    console.log(user_modifier)

                    this.valider(user_modifier);
                }
            });
        },

        async valider(user) {
            const confirmed = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir valider cet utilisateur ?',
                text: 'Cette action sera définitive.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Valider'
            });

            if (confirmed.isConfirmed) {
                try {
                    const response = await updateUser(user._id, user);
                    // Suite de votre logique après la mise à jour de l'utilisateur
                    Swal.fire({
                        title: 'Utilisateur validé !',
                        text: 'L\'utilisateur a été mis à jour avec succès.',
                        icon: 'success'
                    });
                    // Autres actions à exécuter après la validation réussie
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une erreur s\'est produite lors de la validation de l\'utilisateur.',
                        icon: 'error'
                    });
                    // Actions à prendre en cas d'erreur
                }
            } else {
                // Si l'utilisateur a annulé la confirmation
                Swal.fire('Opération annulée', 'La validation de l\'utilisateur a été annulée.', 'info');
                // Autres actions à exécuter après l'annulation de la confirmation
            }
        }
        ,

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

/* th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
} */



/* Bouton pour afficher le formulaire  */
/* .display_user_form {
    background-color: #00BF63;
    height: 30px;
    margin: 5px;
    border-radius: 7px;
} */

.display_user_form:hover {
    background-color: #008000
}

.menu_horizontal {
    margin-bottom: 120px;
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

.btn1 {
    width: 100px;
}

.h1 {

    background-color: #23527c;
}

table {
    border-collapse: collapse;
    width: 80%;
    margin: auto;
}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

.nom {
    text-align: left;
    padding-left: 5px;
}

th {
    background-color: #f2f2f2;
}

.contenu {
    height: 200vh;

}
</style>