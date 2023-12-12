<template>
    <div>
        <form enctype="multipart/form-data" @submit.prevent="creerEquipement()">
            <table border="1" class="justify-content-center">
                <tbody>
                    <tr>
                        <th colspan="2">
                            <h3>Ajouter un équipement</h3>
                        </th>
                    </tr>
                    <!--   <tr>
                        <td colspan="2">
                            <div class="error_message" v-if="error_message">
                                {{ error_message }}
                            </div>
                        </td>
                    </tr> -->
                    <tr>
                        <td class="label">
                            <label for="categorie">Catégorie</label><br>
                        </td>
                        <td>
                            <select v-model="nouvel_equipement.categorie" class="form-control" id="categorie">
                                <option value="Pas de catégorie" selected disabled>Choisir une catégorie</option>
                                <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="nom">Nom de l'équipement <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.nom" type="text" class="form-control" id="nom" required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="select">
                                <div class="form-group">
                                    <label for="service">Service</label>
                                    <select v-model="nouvel_equipement.service" class="form-control" id="service">
                                        <option v-for="service in services" :key="service._id" :value="service.nom">{{
                                            service.nom }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="localite">Localité <small class="ob">*</small></label>
                                    <select v-model="nouvel_equipement.localite" class="form-control" id="localite">
                                        <option v-for="local in list_localite" :key="local._id" :value="local._id">{{
                                            local.nom }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="disponibilite">Disponibilité <small class="ob">*</small></label><br>
                                    <input v-model="nouvel_equipement.disponibilite" type="radio" value="true" checked>Oui
                                    <input v-model="nouvel_equipement.disponibilite" type="radio" value="false">Non
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="code_inventaire">Code inventaire <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.code_inventaire" type="text" class="form-control"
                                id="code_inventaire" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="numero_serie">Numéro de série</label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.numero_serie" type="text" class="form-control"
                                id="numero_serie">
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="marque">Marque <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.marque" type="text" class="form-control" id="marque" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="description">Description <small class="ob">*</small></label>
                        </td>
                        <td>
                            <textarea v-model="nouvel_equipement.description" class="form-control" id="description"
                                required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="reference">Référence <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="nouvel_equipement.reference" type="text" class="form-control" id="reference"
                                required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="form-group">
                                <label for="observation">Observation</label>
                                <textarea v-model="nouvel_equipement.observation" class="form-control"
                                    id="observation"></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="date">
                            <div class="form-group">
                                <label for="date_acquisition">Date d'acquisition</label>
                                <input v-model="nouvel_equipement.date_acquisition" type="date" class="form-control"
                                    id="date_acquisition">
                            </div>
                            <div class="form-group">
                                <label for="date_mise_en_service">Date de mise en service</label>
                                <input v-model="nouvel_equipement.date_mise_en_service" type="date" class="form-control"
                                    id="date_mise_en_service">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="form-group">
                                <label for="image_equipement">Image</label>
                                <input type="file" class="form-control" id="image_equipement" @change="handleFileChange"
                                    name="image_equipement">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="code">
                                <div class="form-group">
                                    <label for="code_qr">Code QR</label>
                                    <input v-model="nouvel_equipement.code_qr" type="text" class="form-control"
                                        id="code_qr">
                                </div>
                                <div class="form-group">
                                    <label for="code_bar">Code bar</label>
                                    <input v-model="nouvel_equipement.code_bar" type="text" class="form-control"
                                        id="code_bar">
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
    </div>
</template>

<script>
import { getAllLocalite } from '@/api/equipement';
import { getCategories } from '@/api/equipement';
import { getAllServices } from '@/api/service';
import Swal from 'sweetalert2'
import axios from 'axios';
export default {
    name: 'EquipementForme',
    data() {
        return {
            user: "",
            list_categorie: [],
            list_localite: [],
            services: "",
            nouvel_equipement: {
                nom: '',
                numero_serie: "",
                description: '',
                reference: '',
                categorie: '',
                localite: '',
                service: '',
                disponibilite: true,
                au_rebut: false,
                code_inventaire: '',
                marque: '',
                observation: '',
                date_acquisition: '',
                date_mise_en_service: '',
                image_equipement: null,
                code_bar: '',
                code_qr: ''
            }

        }
    },
    created() {
        this.charger_categories();
        this.chargerServices();
        this.user = JSON.parse(localStorage.getItem("user"))
        setInterval(() => {
            this.Appel();
        }, 10000);
    },
    methods: {

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
                formData.append('numero_serie', this.nouvel_equipement.numero_serie);
                formData.append('au_rebut', this.nouvel_equipement.au_rebut);


                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.post('http://159.89.166.117:3000/equipement', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                // Vérifier la réponse de l'API
                if (response.status === 200) {
                    // Réinitialiser les champs du formulaire
                    // this.nouvel_equipement = {
                    //     disponibilite: true,
                    // };
                    this.nouvel_equipement.description = '';
                    this.nouvel_equipement.nom = ""
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
        handleFileChange(event) {
            const file = event.target.files[0];
            this.nouvel_equipement.image_equipement = file;
        },
        async charger_categories() {
            try {
                this.list_categorie = await getCategories();
                this.list_localite = await getAllLocalite();
            } catch (error) {
                console.log(error);
            }
        },

        async chargerServices() {
            try {
                this.services = await getAllServices();
                // console.log("liste des services: ", this.services)
            } catch (error) {
                console.log(error)
            }
        },

        Appel() {
            this.charger_categories();
            this.chargerServices();
            this.user = JSON.parse(localStorage.getItem("user"));

        },
    }
}

</script>

<style scoped>
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

.label {
    width: 30%;
}

.nom_eq {
    width: 200px !important;
}

h2 {
    text-align: center;
}

form {
    width: 80%;
    margin: auto;
}

.date {
    display: flex;
    justify-content: space-around;
    /* border: 1px solid #ccc; */
    width: auto;
    margin-bottom: 5px;
}

.date .form-group {
    margin-left: 0px;
}

.select {
    display: flex;
    justify-content: space-around;
    /* border: 1px solid #ccc; */
    width: 100%;
}

.code {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;

}
</style>