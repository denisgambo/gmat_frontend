<template>
    <div class="container">
        <!-- formulaire pour Modifier un equipement -->

        <!-- <form enctype="multipart/form-data" @submit.prevent="ModifierEquipement(id)">
            <h3>Modifier l'équipement</h3>

            <div class="select">
                <div class="form-group">
                    <label for="categorie">Catégorie</label>
                    <select v-model="equipement_a_modifier.categorie" id="categorie">
                        <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="nom">Nom de l'équipement <small class="ob">*</small></label>
                <input v-model="equipement_a_modifier.nom" type="text" id="nom" required>
                <p>{{ equipement_a_modifier.nom }}</p>
            </div>

            <div class="select">

                <div class="form-group">
                    <label for="service">Service</label>
                    <select v-model="equipement_a_modifier.service" id="service">
                        <option v-for="service in services" :key="service._id" :value="service.nom">{{ service.nom }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="localite">Localité <small class="ob">*</small></label>
                    <select v-model="equipement_a_modifier.localite" id="localite">
                        <option v-for="local in list_localite" :key="local._id" :value="local._id">{{ local.nom }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="disponibilite">Disponibilité <small class="ob">*</small></label>
                    <input v-model="equipement_a_modifier.disponibilite" type="radio" value="true" checked>Oui
                    <input v-model="equipement_a_modifier.disponibilite" type="radio" value="false">Non
                </div>
            </div>
            <div class="form-group">
                <label for="code_inventaire">Code inventaire <small class="ob">*</small></label>
                <input v-model="equipement_a_modifier.code_inventaire" type="text" id="code_inventaire">
            </div>
            <div class="form-group">
                <label for="numero_serie">Numéro de série </label>
                <input v-model="equipement_a_modifier.numero_serie" type="text" id="numero_serie">
            </div>
            <div class="form-group">
                <label for="marque">Marque <small class="ob">*</small></label>
                <input v-model="equipement_a_modifier.marque" type="text" id="marque">
            </div>
            <div class="form-group">
                <label for="description">Description<small class="ob">*</small> </label>
                <textarea v-model="equipement_a_modifier.description" id="description"></textarea>
            </div>
            <div class="form-group">
                <label for="reference">Référence <small class="ob">*</small></label>
                <input v-model="equipement_a_modifier.reference" type="text" id="reference">
            </div>




            <div class="form-group">
                <label for="observation">Observation</label>
                <textarea v-model="equipement_a_modifier.observation" id="observation"></textarea>
            </div>
            <div class="date">
                <div class="form-group">
                    <label for="date_acquisition">Date d'acquisition</label>
                    <input v-model="equipement_a_modifier.date_acquisition" type="date" id="date_acquisition">
                </div>
                <div class="form-group">
                    <label for="date_mise_en_service">Date de mise en service</label>
                    <input v-model="equipement_a_modifier.date_mise_en_service" type="date" id="date_mise_en_service">
                </div>
            </div>
            <div class="form-group">
                <label for="image_equipement">Image</label>
                <input type="file" id="image_equipement" @change="handleFileChange" name="image_equipement">
            </div>
            <div class="code">
                <div class="form-group">
                    <label for="code_qr">Code QR</label>
                    <input v-model="equipement_a_modifier.code_qr" type="text" id="code_qr">
                </div>
                <div class="form-group">
                    <label for="code_bar">Code bar</label>
                    <input v-model="equipement_a_modifier.code_bar" type="text" id="code_bar">
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Modifier">
                <input type="submit" value="Retour" @click.prevent="retour" class="space">
            </div>
        </form>
 -->
        <form enctype="multipart/form-data" @submit.prevent="ModifierEquipement(id)">
            <table border="1" class="justify-content-center">
                <tbody>
                    <tr>
                        <th colspan="2">
                            <h3>Ajouter un équipement</h3>
                        </th>
                    </tr>
                    <!-- <tr>
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
                            <div class="form-group">
                                <select v-model="equipement_a_modifier.categorie" id="categorie" class="form-control">
                                    <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}
                                    </option>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="nom">Nom de l'équipement <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="equipement_a_modifier.nom" type="text" class="form-control" id="nom" required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="select">
                                <div class="form-group">
                                    <label for="service">Service</label>
                                    <select v-model="equipement_a_modifier.service" class="form-control" id="service">
                                        <option v-for="service in services" :key="service._id" :value="service.nom">{{
                                            service.nom }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="localite">Localité <small class="ob">*</small></label>
                                    <select v-model="equipement_a_modifier.localite" class="form-control" id="localite">
                                        <option v-for="local in list_localite" :key="local._id" :value="local._id">{{
                                            local.nom }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="disponibilite">Disponibilité <small class="ob">*</small></label><br>
                                    <input v-model="equipement_a_modifier.disponibilite" type="radio" value="true"
                                        checked>Oui
                                    <input v-model="equipement_a_modifier.disponibilite" type="radio" value="false">Non
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="code_inventaire">Code inventaire <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="equipement_a_modifier.code_inventaire" type="text" class="form-control"
                                id="code_inventaire" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="numero_serie">Numéro de série</label>
                        </td>
                        <td>
                            <input v-model="equipement_a_modifier.numero_serie" type="text" class="form-control"
                                id="numero_serie">
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="marque">Marque <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="equipement_a_modifier.marque" type="text" class="form-control" id="marque"
                                required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="description">Description <small class="ob">*</small></label>
                        </td>
                        <td>
                            <textarea v-model="equipement_a_modifier.description" class="form-control" id="description"
                                required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="reference">Référence <small class="ob">*</small></label>
                        </td>
                        <td>
                            <input v-model="equipement_a_modifier.reference" type="text" class="form-control" id="reference"
                                required>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="form-group">
                                <label for="observation">Observation</label>
                                <textarea v-model="equipement_a_modifier.observation" class="form-control"
                                    id="observation"></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="date">
                            <div class="form-group">
                                <label for="date_acquisition">Date d'acquisition</label>
                                <input v-model="equipement_a_modifier.date_acquisition" type="date" class="form-control"
                                    id="date_acquisition">
                            </div>
                            <div class="form-group">
                                <label for="date_mise_en_service">Date de mise en service</label>
                                <input v-model="equipement_a_modifier.date_mise_en_service" type="date" class="form-control"
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
                                    <input v-model="equipement_a_modifier.code_qr" type="text" class="form-control"
                                        id="code_qr">
                                </div>
                                <div class="form-group">
                                    <label for="code_bar">Code bar</label>
                                    <input v-model="code_bar" type="text" class="form-control" id="code_bar">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="text-center">
                            <div class="form-group">
                                <input type="submit" value="Modifier" class="btn btn-success m-2">
                                <input type="submit" value="Retour" @click.prevent="retour" class="btn btn-success m-2">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>

<script>
import router from '@/router'
import { getEquipementById, updateEquipement } from '@/api/equipement'
import { getCategories } from '@/api/equipement'
import { getAllLocalite } from '@/api/equipement'
import { getAllServices } from '@/api/service'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    props: ['id'],

    data() {
        return {
            equipement_a_modifier: "",
            list_categorie: "",
            list_localite: "",
            services: ""
        }
    },
    created() {
        this.getEquipement(this.id);
        this.charger_categories();
        this.chargerServices();
    },

    methods: {
        async getEquipement(id) {
            try {
                const result = await getEquipementById(id);
                this.equipement_a_modifier = result.equipement
                // console.log(this.equipement_a_modifier)
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la récupération de l\'équipement.',
                    icon: 'error'
                });
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

        async ModifierEquipement(id) {
            // Vérifier si tous les champs sont saisis
            if (
                !this.equipement_a_modifier.nom ||
                !this.equipement_a_modifier.localite ||
                !this.equipement_a_modifier.categorie ||
                !this.equipement_a_modifier.marque ||
                !this.equipement_a_modifier.code_inventaire ||
                !this.equipement_a_modifier.disponibilite
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
                formData.append('nom', this.equipement_a_modifier.nom);
                formData.append('description', this.equipement_a_modifier.description);
                formData.append('reference', this.equipement_a_modifier.reference);
                formData.append('categorie', this.equipement_a_modifier.categorie);
                formData.append('localite', this.equipement_a_modifier.localite);
                formData.append('disponibilite', this.equipement_a_modifier.disponibilite);
                formData.append('code_inventaire', this.equipement_a_modifier.code_inventaire);
                formData.append('marque', this.equipement_a_modifier.marque);
                formData.append('observation', this.equipement_a_modifier.observation);
                // formData.append('date_acquisition', this.equipement_a_modifier.date_acquisition);
                // formData.append('date_mise_en_service', this.equipement_a_modifier.date_mise_en_service);
                formData.append('image_equipement', this.equipement_a_modifier.image_equipement);
                formData.append('code_bar', this.equipement_a_modifier.code_bar);
                formData.append('code_qr', this.equipement_a_modifier.code_qr);
                formData.append('service', this.equipement_a_modifier.service);
                formData.append('numero_serie', this.equipement_a_modifier.numero_serie);

                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.put(`http://159.89.166.117:3000/equipement/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    transformRequest: [(data, headers) => data]
                });
                // await updateEquipement(id, this.equipement_a_modifier)
                // Vérifier la réponse de l'API
                if (response.status === 200) {
                    // Réinitialiser les champs du formulaire
                    // this.equipement_a_modifier = {};
                    console.log("Equipement à modifier: ", this.equipement_a_modifier)

                    // Afficher un message de succès
                    Swal.fire({
                        title: 'Succès',
                        text: 'L\'équipement a été modifié avec succès.',
                        icon: 'success',
                    });
                } else {
                    throw new Error('Une erreur s\'est produite lors de la modification de l\'équipement.');
                }
            } catch (error) {
                console.log(error);
                // Afficher un message d'erreur
                Swal.fire({
                    title: 'Erreur',
                    text: error + ' Une erreur s\'est produite lors de la modification de l\'équipement.',
                    icon: 'error',
                });
            }
        },
        retour() {
            router.push({ name: 'AjouterEquipement' });
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            this.equipement_a_modifier.image_equipement = file;
        },

        async charger_categories() {
            try {
                this.list_categorie = await getCategories();
                this.list_localite = await getAllLocalite();
            } catch (error) {
                console.log(error);
            }
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

.container {
    /* max-width: 600px; */
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-size: cover;
}


h2 {
    text-align: center;
}





label {
    /* display: block; */
    justify-content: center;
    font-weight: bold;
}

.ob {
    color: red;
}



input[type="submit"]:hover {
    background-color: #45a049;
}




.date {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 20px;
    margin-bottom: 5px;
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

.space {
    margin: 10px;
}
</style>