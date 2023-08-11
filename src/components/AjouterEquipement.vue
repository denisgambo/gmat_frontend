<template>
    <div class="menu">
        <MenuBar />
    </div>
    <div class="container">
        <div class="lis_btn">
            <button @click="changeDisplay(1)" class="btn2" type="button"> Ajouter un equipement</button>
            <button @click="changeDisplay(2)" class="btn2" type="button"> La liste des équipements</button>

        </div>

        <form enctype="multipart/form-data" v-if="display_equipement_form" @submit.prevent="creerEquipement()">
            <h3>Ajouter un équipement</h3>
            <div class="error_message" v-if="error_message">
                {{ error_message }}
            </div>
            <div class="form-group">
                <label for="nom">Nom de l'équipement <small class="ob">*</small></label>
                <input v-model="nouvel_equipement.nom" type="text" id="nom" required>
            </div>

            <div class="select">
                <div class="form-group">
                    <label for="categorie">Catégorie</label>
                    <select v-model="nouvel_equipement.categorie" id="categorie">
                        <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="service">Service</label>
                    <select v-model="nouvel_equipement.service" id="service">
                        <option v-for="service in services" :key="service._id" :value="service.nom">{{ service.nom }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="localite">Localité <small class="ob">*</small></label>
                    <select v-model="nouvel_equipement.localite" id="localite">
                        <option v-for="local in list_localite" :key="local._id" :value="local._id">{{ local.nom }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="disponibilite">Disponibilité <small class="ob">*</small></label>
                    <input v-model="nouvel_equipement.disponibilite" type="radio" value="true" checked>Oui
                    <input v-model="nouvel_equipement.disponibilite" type="radio" value="false">Non
                </div>
            </div>
            <div class="form-group">
                <label for="code_inventaire">Code inventaire <small class="ob">*</small></label>
                <input v-model="nouvel_equipement.code_inventaire" type="text" id="code_inventaire">
            </div>
            <div class="form-group">
                <label for="marque">Marque <small class="ob">*</small></label>
                <input v-model="nouvel_equipement.marque" type="text" id="marque">
            </div>
            <div class="form-group">
                <label for="description">Description<small class="ob">*</small> </label>
                <textarea v-model="nouvel_equipement.description" id="description"></textarea>
            </div>
            <div class="form-group">
                <label for="reference">Référence <small class="ob">*</small></label>
                <input v-model="nouvel_equipement.reference" type="text" id="reference">
            </div>




            <div class="form-group">
                <label for="observation">Observation</label>
                <textarea v-model="nouvel_equipement.observation" id="observation"></textarea>
            </div>
            <div class="date">
                <div class="form-group">
                    <label for="date_acquisition">Date d'acquisition</label>
                    <input v-model="nouvel_equipement.date_acquisition" type="date" id="date_acquisition">
                </div>
                <div class="form-group">
                    <label for="date_mise_en_service">Date de mise en service</label>
                    <input v-model="nouvel_equipement.date_mise_en_service" type="date" id="date_mise_en_service">
                </div>
            </div>
            <div class="form-group">
                <label for="image_equipement">Image</label>
                <input type="file" id="image_equipement" @change="handleFileChange" name="image_equipement">
            </div>
            <div class="code">
                <div class="form-group">
                    <label for="code_qr">Code QR</label>
                    <input v-model="nouvel_equipement.code_qr" type="text" id="code_qr">
                </div>
                <div class="form-group">
                    <label for="code_bar">Code bar</label>
                    <input v-model="code_bar" type="text" id="code_bar">
                </div>
            </div>
            <div class="form-group">
                <div class="error_message" v-if="error_message"></div>
                <input type="submit" value="Ajouter">
            </div>
        </form>

        <div class="list_equipement" v-if="display_list_equipement">

            <div class="recherche bg-transparent rounded">
                <div class="search_setting">
                    Rechercher par:
                    <select name="search_setting" id="search_setting">
                        <option value="nom" selected>Nom</option>
                        <option value="service">Service</option>
                        <option value="localite">Localite</option>
                    </select>
                </div>
                <!-- Rechercher un équipement -->
                <nav class="navbar navbar-light ">
                    <form class="form-inline rounded">
                        <input v-model="search" class="form-control mr-sm-2 rounded" type="search" placeholder="Rechercher"
                            aria-label="Search">
                    </form>
                </nav>
            </div>
            <button @click="switchList(2)" class="voir">vue liste</button>
            <button @click="switchList(1)" class="voir">vue carte</button>
            <div v-if="display_table" id="list_equipement">

                <Entete class="entete" />

                <table border="2" class="table table-bordered table-striped">

                    <!-- <thead> -->
                    <tr class="header">
                        <th colspan="9" class=""> Liste des équipements</th>
                    </tr>
                    <tr class="header">
                        <td class="header">Nom</td>
                        <td class="header">categorie</td>
                        <td class="header">Marque</td>
                        <td class="header">Code inventaire</td>
                        <td class="header">Référence</td>
                        <td class="header">Localité</td>
                        <td class="header">Service</td>
                        <td class="header">Description</td>
                        <td class="header no_print">Actions</td>

                    </tr>
                    <!-- </thead> -->
                    <tbody>
                        <tr v-for="equipement in searchEq" :key="equipement._id">
                            <td>{{ equipement.nom }}</td>
                            <td>{{ equipement.categorie }}</td>
                            <td>{{ equipement.marque }}</td>
                            <td>{{ equipement.code_inventaire }}</td>
                            <td>{{ equipement.reference }}</td>
                            <td>{{ equipement.localite }}</td>
                            <td>{{ equipement.service }}</td>
                            <td>{{ equipement.description }}</td>
                            <td class="d-flex no_print">
                                <button class="btn btn-secondary btn-sm no_print"
                                    @click="changerDisponibilite(equipement._id, equipement.disponibilite)">
                                    {{ disponibilite(equipement.disponibilite) }}
                                </button>

                                <button @click="SupprimerEq(equipement._id)"
                                    class="btn btn-danger btn-sm no_print">Supprimer
                                </button>

                                <button @click="gotoEditPage(equipement._id)" class="btn btn-danger btn-sm">Modifier
                                </button>
                            </td>
                        </tr>
                        <!--   <tr class="no_print">
                        <td>
                            <button type="button" v-print="'#list_equipement'">Imprimer</button>
                        </td>
                    </tr> -->
                    </tbody>
                </table>
                <div class="justify-content-center">
                    <button type="button" v-print="'#list_equipement'" class="btn btn-secondary">Imprimer</button>
                </div>
            </div>

            <div class="list-categories" v-if="display_card">




                <div class="card" style="width: 15rem;" v-for="eq in searchEq" :key="eq._id">
                    <img :src="eq.image_equipement" class="image de l'équipement" alt="..." v-if="eq.image_equipement">
                    <div class="card-body">
                        <h4>{{ eq.nom }}</h4>

                        <!-- <button class="btn btn-secondary btn-sm">Voir la liste des maintenances</button><br><br>
                        <button class="btn btn-secondary btn-sm">Faire une maintenance</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Entete from './Entete.vue';
import Swal from 'sweetalert2'
import axios from 'axios';
import print from 'vue3-print-nb'
import router from '@/router';
import { createEquipement, getAllEquipementsWithCat, supprimerEquipement, updateDisponibilite } from '@/api/equipement';
import { getAllLocalite } from '@/api/equipement';
import { getCategories } from '@/api/equipement';
import { getAllServices } from '@/api/service';
import MenuBar from './MenuBar.vue';
import { testAdminUser, testGestionnaireUser } from '/auth/auth-guard-admin';
export default {
    name: 'AjouterEquipement',
    components: {
        MenuBar,
        Entete
    },
    data() {
        return {
            error_message: "",
            search: "",
            search_setting: "nom",
            services: "",
            display_table: false,
            display_card: true,
            list_categorie: [],
            list_localite: [],
            list_equipement: [],
            equipementSearch: [],
            display_equipement_form: false,
            display_list_equipement: true,
            user: "",
            nouvel_equipement: {
                nom: '',
                description: '',
                reference: '',
                categorie: '',
                localite: '',
                service: '',
                disponibilite: true,
                code_inventaire: '',
                marque: '',
                observation: '',
                date_acquisition: '',
                date_mise_en_service: '',
                image_equipement: null,
                code_bar: '',
                code_qr: ''
            }
        };
    },
    directives: {
        print
    },
    created() {
        this.charger_categories();
        this.chargerEquipement();
        this.chargerServices();
        this.user = JSON.parse(localStorage.getItem("user"))
        // console.log(this.searchEq)
        // console.log(this.search)
    },
    computed: {
        defaultDate() {
            const today = new Date();
            const year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            // Formatez le mois et le jour pour avoir 2 chiffres (ex : '03' au lieu de '3')
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }

            // Retournez la date au format 'yyyy-mm-dd'
            return `${year}-${month}-${day}`;
        },
        searchEq() {

            return this.equipementSearch.filter((equipement) => {
                return equipement.nom.toLowerCase().includes(this.search.toLocaleLowerCase())
            })
        },
    },

    methods: {
        async charger_categories() {
            try {
                this.list_categorie = await getCategories();
                this.list_localite = await getAllLocalite();
            } catch (error) {
                console.log(error);
            }
        },





        async creerEquipement(equipementData) {
            // Vérifier si tous les champs sont saisis
            if (
                !this.nouvel_equipement.nom ||
                !this.nouvel_equipement.localite ||
                !this.nouvel_equipement.categorie ||
                !this.nouvel_equipement.marque ||
                !this.nouvel_equipement.code_inventaire ||
                !this.nouvel_equipement.disponibilite
            ) {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Veuillez remplir tous les champs obligatoires.',
                    icon: 'error',
                });
                return;
            }

            try {
                // Créer un nouvel objet FormData pour les données du formulaire
                const formData = new FormData();
                formData.append('nom', this.nouvel_equipement.nom);
                formData.append('description', this.nouvel_equipement.description);
                formData.append('reference', this.nouvel_equipement.reference);
                formData.append('categorie', this.nouvel_equipement.categorie);
                formData.append('localite', this.nouvel_equipement.localite);
                formData.append('disponibilite', this.nouvel_equipement.disponibilite);
                formData.append('code_inventaire', this.nouvel_equipement.code_inventaire);
                formData.append('marque', this.nouvel_equipement.marque);
                formData.append('observation', this.nouvel_equipement.observation);
                formData.append('date_acquisition', this.nouvel_equipement.date_acquisition);
                formData.append('date_mise_en_service', this.nouvel_equipement.date_mise_en_service);
                formData.append('image_equipement', this.nouvel_equipement.image_equipement);
                formData.append('code_bar', this.nouvel_equipement.code_bar);
                formData.append('code_qr', this.nouvel_equipement.code_qr);
                formData.append('service', this.nouvel_equipement.service);

                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.post('http://127.0.0.1:3000/equipement', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                // Vérifier la réponse de l'API
                if (response.status === 200) {
                    // Réinitialiser les champs du formulaire
                    this.nouvel_equipement = {};
                    // this.nouvel_equipement.description = '';
                    // Réinitialiser les autres champs...

                    // Afficher un message de succès
                    Swal.fire({
                        title: 'Succès',
                        text: 'L\'équipement a été ajouté avec succès.',
                        icon: 'success',
                    });
                } else {
                    throw new Error('Une erreur s\'est produite lors de la création de l\'équipement.');
                }
            } catch (error) {
                console.log(error);
                // Afficher un message d'erreur
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de l\'équipement.',
                    icon: 'error',
                });
            }
        },

        async chargerEquipement() {
            try {
                this.list_equipement = await getAllEquipementsWithCat();
                this.equipementSearch = [...this.list_equipement]
                // console.log("liste des équipements: ", this.list_equipement)
            } catch (error) {
                console.log(error)
            }
        },
        async chargerServices() {
            try {
                this.services = await getAllServices();
                console.log("liste des services: ", this.services)
            } catch (error) {
                console.log(error)
            }
        },

        changeDisplay(entre) {
            if (entre == 1) {
                if (this.user.role == "administrateur" || this.user.role == "gestionnaire") {
                    this.display_equipement_form = true
                    this.display_list_equipement = false;
                } else {
                    Swal.fire({
                        title: 'Attention',
                        text: "Vous n'avez pas les droits nécéssaires pour faire cette action",
                        icon: 'error'
                    });
                }

            } else {
                this.display_equipement_form = false;
                this.display_list_equipement = true;
            }
        },
        disponibilite(disponibilite) {
            if (disponibilite) {
                return "rendre indisponible";
            } else {
                return "rendre disponible";
            }
        },

        async changerDisponibilite(id, disponibilite) {
            let message = "";
            if (disponibilite == true) {
                message = 'L\'équipement sera indisponible. Continuer ?'
            } else {
                message = 'L\'équipement sera disponible. Continuer ?'
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
                    const response = await updateDisponibilite(id, disponibilite);
                    this.chargerEquipement()
                }
            });
        },

        async SupprimerEq(id) {
            if (!testAdminUser()) {
                Swal.fire({
                    title: 'Danger',
                    text: 'Vous n\'avez pas les droits nécéssaires pour réaliser cette action.',
                    icon: 'error',
                });
                return
            }

            let message = "L'équipement sera supprimé. Continuer?";

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
                        await supprimerEquipement(id); // Attendre la suppression de l'équipement
                        Swal.fire({
                            title: 'Réussi',
                            text: 'Equipement supprimé avec succès.',
                            icon: 'success',
                        });
                        this.chargerEquipement();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        },

        gotoEditPage(id) {
            if (testAdminUser() || testGestionnaireUser()) {
                router.push({ name: 'ModifierEquipement', params: { id } });


            } else {
                Swal.fire({
                    title: 'Danger',
                    text: 'Vous n\'avez pas les droits nécéssaires pour réaliser cette action.',
                    icon: 'error',
                });
                return
            }
        },


        imprimerTableaux() {
            window.print();
        },

        switchList(entree) {
            if (entree == 1) {
                this.display_card = true;
                this.display_table = false;
            } else if (entree == 2) {
                this.display_card = false;
                this.display_table = true;
            }
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            this.nouvel_equipement.image_equipement = file;
        },
        test() {
            alert("ça marche");
        }
    }
}
</script>

<style scoped>
.entete {
    display: none;
}

.container {
    /* max-width: 600px; */
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background: url("https://cdn.wallpapersafari.com/55/84/OW9N2b.jpg");
    background-size: cover;
}


h2 {
    text-align: center;
}

form {
    width: 80%;
    margin: 0 auto;
    border: 1px blue solid;
}

.form-group {
    margin-bottom: 5px;
}

label {
    /* display: block; */
    justify-content: center;
    font-weight: bold;
}

.ob {
    color: red;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
/* input[type="file"], */
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

input[type="file"] {
    width: 200px;
}


.date {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 20px;
    margin-bottom: 5px;
}

.voir {
    height: 30px;
    background-color: #4CAF50;
    margin: 10px;
    border-radius: 5px;
}

.btn1 {
    border-radius: 5px;
}

.btn {
    margin: 2px;
    /* height: 50px; */
}

.select {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 20px;
    margin-bottom: 5px;
}

.code {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 20px;
    margin-bottom: 5px;
}

.error_message {
    color: red;
    font-size: 12px;
}

.code>input {
    width: 50px;
}

.btn2 {
    background-color: rgb(146, 236, 146);
    height: 50px;
    width: 250px;
    margin-left: 50px;
    border-radius: 10px;
    margin-bottom: 30px;

}

/* tableau */
table {
    border-collapse: collapse;
    width: 100%;
}

td {
    /* border: 1px solid black; */
    padding: 10px;
    background-color: white;
}

.header {
    font-weight: bold;
    background-color: rgb(236, 231, 231) !important;
}

.single-categorie {
    background-color: bisque;
    width: 25%;
    height: 150px;
    margin: 10px;
    border-radius: 10px;
}

.card {
    margin: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;

}

.card>img {
    border-radius: 10px;
    width: 15rem;
    height: 220px;
}

.list-categories {
    display: flex;
    flex-wrap: wrap;
}

@media print {

    /* body * {
        display: none;
    } */
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
</style>