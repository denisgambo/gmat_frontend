<template>
    <div class="container">
        <!-- formulaire pour Modifier un equipement -->

        <!--  <form id="inscription-form" action="#" method="POST"
            @submit.prevent="ModifierConsommable(id, consommable_a_modifier)" enctype="multipart/form-data">
            <h3>Modifier un consommable</h3>
            <div class="select">
                <div class="form-group">
                    <label for="categorie">Catégorie</label>
                    <select v-model="consommable_a_modifier.categorie" name="categorie" id="">
                        <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="nom">Nom du consommable</label>
                <input v-model="consommable_a_modifier.nom" type="text" id="nom" name="nom" required>
            </div>

            <div class="form-group">
                <label for="adresse">Description</label>
                <textarea v-model="consommable_a_modifier.description" id="description" name="description"></textarea>
            </div>


            <div class="form-group">
                <label for="image_consommable">Image</label>
                <input type="file" id="image_consommable" @change="handleFileChange" name="image_consommable">
            </div>
            <div class="form-group">
                <label for="adresse">Observation</label>
                <textarea v-model="consommable_a_modifier.observation" id="observation" name="observation"></textarea>
            </div>
            <div class="date">

                <div class="form-group">
                    <label for="seuil_critique">Seuil critique</label>
                    <input v-model.number="consommable_a_modifier.seuil_critique" type="number" id="" name="seuil_critique">
                </div>
            </div>
            <div class="code">
                <div class="form-group">
                    <label for="nom">Code QR</label>
                    <input v-model="consommable_a_modifier.code_qr" type="text" id="" name="code_qr">
                </div>
                <div class="form-group">
                    <label for="nom">Code bar</label>
                    <input v-model="consommable_a_modifier.code_bar" type="text" id="" name="code_bar">
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Modifier" class="space">
                <input type="submit" value="Retour" @click.prevent="retour" class="space">
            </div>
        </form>

 -->
        <form id="inscription-form" action="#" method="POST"
            @submit.prevent="ModifierConsommable(id, consommable_a_modifier)" enctype="multipart/form-data">
            <table border="1" class="justify-content-center">
                <tbody>
                    <tr>
                        <th colspan="2">
                            <h3>Modification du consommable</h3>
                        </th>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="categorie">Catégorie</label>
                        </td>
                        <td colspan="2" class="col-auto">

                            <div class="form-group">
                                <select v-model="consommable_a_modifier.categorie" name="categorie" class="form-control">
                                    <option value="">Choisir la catégorie</option>
                                    <option v-for="cat in list_categorie" :key="cat._id" :value="cat._id">{{ cat.nom }}
                                    </option>
                                </select>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="nom">Nom du consommable</label>
                        </td>
                        <td>
                            <input v-model="consommable_a_modifier.nom" type="text" class="form-control" id="nom" name="nom"
                                required>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="description">Description</label>
                        </td>
                        <td>
                            <textarea v-model="consommable_a_modifier.description" class="form-control" id="description"
                                name="description"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="image_consommable">Image</label>
                        </td>
                        <td>
                            <input type="file" class="form-control" id="image_consommable" @change="handleFileChange"
                                name="image_consommable">
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="observation">Observation</label>
                        </td>
                        <td>
                            <textarea v-model="consommable_a_modifier.observation" class="form-control" id="observation"
                                name="observation"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="col-auto">
                            <label for="seuil_critique">Seuil critique</label>

                        </td>

                        <td colspan="2">
                            <div class="form-group">
                                <input v-model="consommable_a_modifier.seuil_critique" type="number" class="form-control"
                                    id="seuil_critique" name="seuil_critique">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="code">
                                <div class="form-group">
                                    <label for="code_qr">Code QR</label>
                                    <input v-model="consommable_a_modifier.code_qr" type="text" class="form-control"
                                        id="code_qr" name="code_qr">
                                </div>
                                <div class="form-group">
                                    <label for="code_bar">Code bar</label>
                                    <input v-model="consommable_a_modifier.code_bar" type="text" class="form-control"
                                        id="code_bar" name="code_bar">
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
// import { getEquipementById, updateEquipement } from '@/api/equipement'
import { getConsommableById, getCategoriesConsommable } from '@/api/consommable'
import { getCategories } from '@/api/equipement'
import { getAllLocalite } from '@/api/equipement'
import Swal from 'sweetalert2'
import axios from 'axios'
import router from '@/router'
export default {
    props: ['id'],

    data() {
        return {
            consommable_a_modifier: "",
            list_categorie: "",
            list_localite: "",
        }
    },
    created() {
        this.getConsommable(this.id);
        this.charger_categories()
    },

    methods: {
        async getConsommable(id) {
            try {
                const result = await getConsommableById(id);
                this.consommable_a_modifier = result.consommable
                console.log(this.consommable_a_modifier)
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de la récupération de l\'équipement.',
                    icon: 'error'
                });
            }
        },

        async ModifierConsommable(id, consommableData) {
            // Vérifier si tous les champs sont saisis
            if (
                !consommableData.nom ||
                !consommableData.seuil_critique ||
                !consommableData.categorie
            ) {
                Swal.fire({
                    title: 'Veuillez remplir tous les champs du consommable',
                    icon: 'error'
                });
                return;
            }

            try {
                // Créer un nouvel objet FormData pour les données du formulaire
                const formData = new FormData();
                formData.append('nom', consommableData.nom);
                formData.append('description', consommableData.description);
                formData.append('categorie', consommableData.categorie);
                formData.append('observation', consommableData.observation);
                formData.append('image_consommable', consommableData.image_consommable);
                formData.append('quantite_en_stock', consommableData.quantite_en_stock);
                formData.append('seuil_critique', consommableData.seuil_critique);

                formData.append('code_bar', consommableData.code_bar);
                formData.append('code_qr', consommableData.code_qr);
                formData.append('prix_achat', consommableData.prix_achat);


                // Envoyer la requête AJAX pour créer l'équipement
                const response = await axios.put(`http://159.89.166.117:3000/consommable/${id}`, formData, {
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
                    console.log("consommable à modifier: ", this.consommable_a_modifier)

                    // Afficher un message de succès
                    Swal.fire({
                        title: 'Succès',
                        text: 'Le consommable a été modifié avec succès.',
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
        handleFileChange(event) {
            const file = event.target.files[0];
            this.consommable_a_modifier.image_consommable = file;
        },
        retour() {
            router.push({ name: 'AjouterConsommable' });
        },
        async charger_categories() {
            try {
                this.list_categorie = await getCategoriesConsommable();
                // this.list_localite = await getAllLocalite();
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





h1 {
    text-align: center;
}

/* .form-group {
    margin-bottom: 5px;
} */

label {
    display: block;
    font-weight: bold;
}



input[type="submit"]:hover {
    background-color: #45a049;
}



.date {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 90%;
    margin-bottom: 20px;
    margin: 0 auto;
    width: 100%;
    margin-bottom: 5px;
}

.select {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 5px;
}

.code {
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 5px;
}

.code>input {
    width: 50px;
}
</style>