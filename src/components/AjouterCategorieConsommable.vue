<template>
    <MenuBar />

    <div class="container1">
        <!--         <div class="btns_menu d-flex">
            <button @click="switch_categorie(1)" class="btn btn-secondary" type="button"> Categorie d'équipement</button>
            <button @click="switch_categorie(2)" class="btn btn-secondary" type="button"> Categorie de
                consommable</button>
        </div> -->


        <div class="contenu">

            <div class="categorie_equipement" v-if="affiche_cat_eq">
                <div class="bg-light">
                    <h2>Gestion des catégories d'équipements </h2>
                </div>
                <div class="d-flex justify-content-center">
                    <button @click="changeForm_categorie" class="btn btn-success m-2" type="button"> Ajouter une
                        catégorie</button>
                    <button @click="changeForm_categorie" class="btn btn-success m-2" type="button">Listes des
                        catégories</button>
                </div>
                <form enctype="multipart/form-data" @submit.prevent="creerCategorie()" v-if="affiche_form_equip">
                    <table border="1" class="justify-content-center">
                        <tbody>
                            <tr>
                                <th colspan="2">
                                    <h3>Ajouter une Catégorie d'équipement</h3>
                                </th>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="nom">Nom de la catégorie</label>
                                </td>
                                <td>
                                    <input v-model="new_categorie_equiement.nom" type="text" class="form-control" id="nom"
                                        name="nom" required>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="adresse">Description</label>
                                </td>
                                <td>
                                    <textarea v-model="new_categorie_equiement.description" class="form-control"
                                        id="description" name="description"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="code_categorie">Code de la catégorie</label>
                                </td>
                                <td>
                                    <input v-model="new_categorie_equiement.code_categorie" type="text" class="form-control"
                                        id="" name="code_categorie">
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="image_categorie">Image</label>
                                </td>
                                <td>
                                    <input type="file" class="form-control" id="" name="image_categorie"
                                        @change="handleFileChange1">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="code">
                                        <div class="form-group">
                                            <label for="nom">Code QR</label>
                                            <input v-model="new_categorie_equiement.code_qr" type="text"
                                                class="form-control" id="" name="code_qr">
                                        </div>
                                        <div class="form-group">
                                            <label for="nom">Code bar</label>
                                            <input v-model="new_categorie_equiement.code_bar" type="text"
                                                class="form-control" id="" name="code_bar">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center">
                                    <div class="form-group">
                                        <input type="submit" class="btn btn-primary" value="Ajouter">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="cat_eq" v-if="!affiche_form_equip">
                    <CategorieEquipement />
                </div>

            </div>
            <div class="categorie_consommable" v-if="affiche_cat_cons">
                <!-- <div class="bg-light">
                    <h2>Gestion des catégories de consommables</h2>
                </div> -->
                <div class="d-flex justify-content-center">
                    <button @click="changeForm_consommable" class="btn btn-success m-2" type="button"> Ajouter une
                        catégorie</button>
                    <button @click="changeForm_consommable" class="btn btn-success m-2" type="button">Listes des
                        catégories</button>
                </div>
                <form @submit.prevent="creerCategorieConsommable()" enctype="multipart/form-data" v-if="affiche_form_conso">
                    <table border="1" class="justify-content-center">
                        <tbody>
                            <tr>
                                <th colspan="2">
                                    <h3>Ajouter une Catégorie de consommable</h3>
                                </th>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="nom">Nom de la catégorie</label>
                                </td>
                                <td>
                                    <input v-model="new_categorie_consommable.nom" type="text" class="form-control" id="nom"
                                        name="nom" required>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="adresse">Description</label>
                                </td>
                                <td>
                                    <textarea v-model="new_categorie_consommable.description" class="form-control"
                                        id="description" name="description"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="code_categorie">Code de la catégorie</label>
                                </td>
                                <td>
                                    <input v-model="new_categorie_consommable.code_categorie" type="text"
                                        class="form-control" id="" name="code_categorie">
                                </td>
                            </tr>
                            <tr>
                                <td class="col-auto">
                                    <label for="image_categorie">Image</label>
                                </td>
                                <td>
                                    <input type="file" class="form-control" id="" name="image_categorie"
                                        @change="handleFileChange">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="code">
                                        <div class="form-group">
                                            <label for="nom">Code QR</label>
                                            <input v-model="new_categorie_consommable.code_qr" type="text"
                                                class="form-control" id="" name="code_qr">
                                        </div>
                                        <div class="form-group">
                                            <label for="nom">Code bar</label>
                                            <input v-model="new_categorie_consommable.code_bar" type="text"
                                                class="form-control" id="" name="code_bar">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="text-center">
                                    <div class="form-group">
                                        <input type="submit" class="btn btn-primary" value="Ajouter">
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="cat_eq" v-if="!affiche_form_conso">
                    <CategorieConsommable />
                </div>
            </div>


        </div>



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
    name: "AjouterCategorieConsommable",
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
            affiche_cat_eq: false,
            affiche_cat_cons: true,
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
        /*     async creerCategorie() {
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
    
    
            } */
        async creerCategorie() {
            // Vérifier si tous les attributs sont renseignés
            if (!this.new_categorie_equiement.nom || !this.new_categorie_equiement.description || !this.new_categorie_equiement.code_categorie) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de la catégorie',
                    icon: 'error'
                });
                return;
            }

            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir créer cette catégorie ?',
                    text: 'Voulez-vous vraiment ajouter cette catégorie ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, ajouter la catégorie !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('nom', this.new_categorie_equiement.nom);
                    formData.append('description', this.new_categorie_equiement.description);
                    formData.append('code_categorie', this.new_categorie_equiement.code_categorie);
                    formData.append('code_qr', this.new_categorie_equiement.code_qr);
                    formData.append('image_categorie', this.new_categorie_equiement.image_categorie);
                    formData.append('code_bar', this.new_categorie_equiement.code_bar);

                    const response = await axios.post('http://159.89.166.117:3000/categorie', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                    if (response.status === 200) {
                        this.new_categorie_equiement = {}; // Réinitialiser les champs du formulaire

                        Swal.fire({
                            title: 'Succès',
                            text: 'La catégorie a été ajoutée avec succès.',
                            icon: 'success'
                        });
                    } else {
                        throw new Error('Une erreur s\'est produite lors de la création de la catégorie.');
                    }
                }
            } catch (error) {
                console.log(error);

                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de la catégorie.',
                    icon: 'error'
                });
            }
        }


        ,

        /*       async creerCategorieConsommable() {
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
      
      
              } */
        async creerCategorieConsommable() {
            // Vérifier si tous les attributs sont renseignés
            if (!this.new_categorie_consommable.nom || !this.new_categorie_consommable.description || !this.new_categorie_consommable.code_categorie) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs de la catégorie',
                    icon: 'error'
                });
                return;
            }

            try {
                const result = await Swal.fire({
                    title: 'Êtes-vous sûr de vouloir créer cette catégorie ?',
                    text: 'Voulez-vous vraiment ajouter cette catégorie ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, ajouter la catégorie !',
                    cancelButtonText: 'Annuler'
                });

                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('nom', this.new_categorie_consommable.nom);
                    formData.append('description', this.new_categorie_consommable.description);
                    formData.append('code_categorie', this.new_categorie_consommable.code_categorie);
                    formData.append('code_qr', this.new_categorie_consommable.code_qr);
                    formData.append('image_categorie', this.new_categorie_consommable.image_categorie);
                    formData.append('code_bar', this.new_categorie_consommable.code_bar);

                    const response = await axios.post('http://159.89.166.117:3000/categorieconsommable', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                    if (response.status === 200) {
                        this.new_categorie_consommable = {}; // Réinitialiser les champs du formulaire

                        Swal.fire({
                            title: 'Succès',
                            text: 'La catégorie a été ajoutée avec succès.',
                            icon: 'success'
                        });
                    } else {
                        throw new Error('Une erreur s\'est produite lors de la création de la catégorie.');
                    }
                }
            } catch (error) {
                console.log(error);

                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la création de la catégorie.',
                    icon: 'error'
                });
            }
        }

        ,
        switch_categorie(option) {
            if (option == 1) {
                this.affiche_cat_eq = true
                this.affiche_cat_cons = false
            } else if (option == 2) {
                this.affiche_cat_eq = false
                this.affiche_cat_cons = true
            }
        },

        changeForm_categorie() {
            this.affiche_form_equip = !this.affiche_form_equip;
            // this.affiche_form_conso = false;
        },

        changeForm_consommable() {
            this.affiche_form_conso = !this.affiche_form_conso;
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
/* .container1 {
    display: flex;
    margin-top: 120px;
} */



.contenu {
    width: 100%;
    background-color: #fff;
}

form {
    width: 80%;
    margin: 0 auto;
}

h1 {
    text-align: center;
}





input[type="submit"]:hover {
    background-color: #072408;
}





table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
}

th {
    background-color: #f2f2f2;
}

.col-form-label {
    width: 100px;
}
</style>