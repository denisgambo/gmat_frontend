<template>
    <MenuBar />
    <div class="container">
        <button @click="changeForm_categorie" class="btn" type="button"> Categorie d'équipement</button>
        <button @click="changeForm_consommable" class="btn" type="button"> Categorie de consommable</button>

        <form id="inscription-form" action="#" method="POST" v-if="affiche_form_equip" enctype="multipart/form-data"
            @submit.prevent="creerCategorie()">
            <h3>Ajouter une Catégorie d'équipement</h3>
            <div class="form-group">
                <label for="nom">Nom de la catécorie</label>
                <input v-model="new_categorie_equiement.nom" type="text" id="nom" name="nom" required>
            </div>
            <div class="form-group">
                <label for="adresse">Description</label>
                <textarea v-model="new_categorie_equiement.description" id="description" name="description"></textarea>
            </div>

            <div class="form-group">
                <label for="code_categorie">Code de la catégorie</label>
                <input v-model="new_categorie_equiement.code_categorie" type="text" id="" name="code_categorie">
            </div>

            <div class="form-group">
                <label for="image_categorie">image</label>
                <input type="file" id="" name="image_categorie" @change="handleFileChange1">
            </div>


            <div class="code">
                <div class="form-group">
                    <label for="nom">Code QR</label>
                    <input v-model="new_categorie_equiement.code_qr" type="text" id="" name="code_qr">
                </div>
                <div class="form-group">
                    <label for="nom">Code bar</label>
                    <input v-model="new_categorie_equiement.code_bar" type="text" id="" name="code_bar">
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Ajouter">
            </div>
        </form>
        <!-- formulaire de création d'une catégorie d'équipement -->
        <form id="inscription-form" action="#" method="POST" v-if="affiche_form_conso"
            @submit.prevent="creerCategorieConsommable()" enctype="multipart/form-data">
            <h3>Ajouter une Catégorie de consommable</h3>
            <div class="form-group">
                <label for="nom">Nom de la catécorie</label>
                <input v-model="new_categorie_consommable.nom" type="text" id="nom" name="nom" required>
            </div>
            <div class="form-group">
                <label for="adresse">Description</label>
                <textarea v-model="new_categorie_consommable.description" id="description" name="description"></textarea>
            </div>

            <div class="form-group">
                <label for="code_categorie">Code de la catégorie</label>
                <input v-model="new_categorie_consommable.code_categorie" type="text" id="" name="code_categorie">
            </div>
            <div class="form-group">
                <label for="image_categorie">image</label>
                <input type="file" id="" name="image_categorie" @change="handleFileChange">
            </div>


            <div class="code">
                <div class="form-group">
                    <label for="nom">Code QR</label>
                    <input v-model="new_categorie_consommable.code_qr" type="text" id="" name="code_qr">
                </div>
                <div class="form-group">
                    <label for="nom">Code bar</label>
                    <input v-model="new_categorie_consommable.code_bar" type="text" id="" name="code_bar">
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Ajouter">
            </div>
        </form>
    </div>

    <div class="cat_eq" v-if="affiche_form_equip">
        <CategorieEquipement />
    </div>

    <div class="cat_eq" v-if="affiche_form_conso">
        <CategorieConsommable />
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import ListeCategories from './ListeCategories.vue'
import CategorieConsommable from './CategorieConsommable.vue'
import CategorieEquipement from './CategorieEquipement.vue'
import MenuBar from './MenuBar.vue'

export default {
    name: "AjouterCategorie",
    components: {
        MenuBar,
        ListeCategories,
        CategorieEquipement,
        CategorieConsommable
    },

    data() {
        return {
            affiche_form_equip: false,
            affiche_form_conso: false,
            new_category_consommable: "",
            new_category_equipement: "",
            new_categorie_equiement: {
                nom: "",
                description: "",
                code_categorie: "",
                code_qr: "",
                code_bar: "",
                image_categorie: null,
            },
            new_categorie_consommable: {
                nom: "",
                description: "",
                code_categorie: "",
                code_qr: "",
                code_bar: "",
                image_categorie: null,
            }
        }
    },

    methods: {
        async creerCategorie() {
            // Vérifier si tous les attributs sont renseignés
            if (
                !this.new_categorie_equiement.nom ||
                !this.new_categorie_equiement.description ||
                !this.new_categorie_equiement.code_categorie
                // !categorieData.code_qr ||
                // !categorieData.code_bar
            ) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de la catégorie',
                    icon: 'error'
                });
                return;
            }

            try {
                // Créer un nouvel objet FormData pour les données du formulaire
                const formData = new FormData();
                formData.append('nom', this.new_categorie_equiement.nom);
                formData.append('description', this.new_categorie_equiement.description);
                formData.append('code_categorie', this.new_categorie_equiement.code_categorie);
                formData.append('code_qr', this.new_categorie_equiement.code_qr);
                formData.append('image_categorie', this.new_categorie_equiement.image_categorie);
                formData.append('code_bar', this.new_categorie_equiement.code_bar);
                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.post('http://159.89.166.117:3000/categorie', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                // Vérifier la réponse de l'API
                if (response.status === 200) {
                    // Réinitialiser les champs du formulaire
                    this.new_categorie_equiement = {};
                    // Réinitialiser les autres champs...

                    // Afficher un message de succès
                    Swal.fire({
                        title: 'Succès',
                        text: 'La catégorie a été ajoutée avec succès.',
                        icon: 'success',
                    });
                } else {
                    throw new Error('Une erreur s\'est produite lors de la création de la catégorie.');
                }
            } catch (error) {
                console.log(error);
                // Afficher un message d'erreur
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de la catégorie.',
                    icon: 'error',
                });
            }


        }
        /*  async creerCategorie(categorieData) {
             // Vérifier si tous les attributs sont renseignés
             if (
                 !categorieData.nom ||
                 !categorieData.description ||
                 !categorieData.code_categorie
                 // !categorieData.code_qr ||
                 // !categorieData.code_bar
             ) {
                 Swal.fire({
                     title: 'Veuillez remplir tous les champs de la catégorie',
                     icon: 'error'
                 });
                 return;
             }
 
             try {
                 const data = await createCategorie(categorieData);
                 console.log(data);
                 Swal.fire({
                     title: 'Catégorie créée avec succès',
                     icon: 'success'
                 });
                 this.new_categorie_equiement = {}; // Réinitialiser les valeurs de la nouvelle catégorie
             } catch (error) {
                 console.log(error);
             }
         } */
        ,

        async creerCategorieConsommable() {
            // Vérifier si tous les attributs sont renseignés
            if (
                !this.new_categorie_consommable.nom ||
                !this.new_categorie_consommable.description ||
                !this.new_categorie_consommable.code_categorie
                // !categorieData.code_qr ||
                // !categorieData.code_bar
            ) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de la catégorie',
                    icon: 'error'
                });
                return;
            }

            try {
                // Créer un nouvel objet FormData pour les données du formulaire
                const formData = new FormData();
                formData.append('nom', this.new_categorie_consommable.nom);
                formData.append('description', this.new_categorie_consommable.description);
                formData.append('code_categorie', this.new_categorie_consommable.code_categorie);
                formData.append('code_qr', this.new_categorie_consommable.code_qr);
                formData.append('image_categorie', this.new_categorie_consommable.image_categorie);
                formData.append('code_bar', this.new_categorie_consommable.code_bar);

                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.post('http://159.89.166.117:3000/categorieconsommable', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                // Vérifier la réponse de l'API
                if (response.status === 200) {
                    // Réinitialiser les champs du formulaire
                    this.new_categorie_consommable = {};
                    // Réinitialiser les autres champs...

                    // Afficher un message de succès
                    Swal.fire({
                        title: 'Succès',
                        text: 'La catégorie a été ajouté avec succès.',
                        icon: 'success',
                    });
                } else {
                    throw new Error('Une erreur s\'est produite lors de la création de la catégorie.');
                }
            } catch (error) {
                console.log(error);
                // Afficher un message d'erreur
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de la catégorie.',
                    icon: 'error',
                });
            }

            /*    try {
                   const data = await createCategorieConsommable(categorieData);
                   console.log(data);
                   Swal.fire({
                       title: 'Catégorie créée avec succès',
                       icon: 'success'
                   });
                   this.new_categorie_consommable = {}; // Réinitialiser les valeurs de la nouvelle catégorie consommable
               } catch (error) {
                   console.log(error);
               } */
        }
        ,

        changeForm_categorie() {
            this.affiche_form_equip = true;
            this.affiche_form_conso = false;
        },

        changeForm_consommable() {
            this.affiche_form_equip = false;
            this.affiche_form_conso = true;
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            this.new_categorie_consommable.image_categorie = file;
        },
        handleFileChange1(event) {
            const file = event.target.files[0];
            this.new_categorie_equiement.image_categorie = file;
        },


    }
}
</script>

<style scoped>
/* formulaire */
.container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background: url("https://cdn.wallpapersafari.com/55/84/OW9N2b.jpg");
}

form {
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    text-align: center;
}

.form-group {
    margin-bottom: 5px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="file"],

textarea {
    width: 100%;
    padding: 1px;
    border: 1px solid #db9898;
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
    background-color: #072408;
}

.error-message {
    color: red;
    margin-top: 5px;
}



.btn {
    background-color: rgb(146, 236, 146);
    height: 40px;
    margin-left: 50px;
}
</style>