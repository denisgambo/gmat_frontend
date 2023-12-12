<template>
    <div class="menu_bar">
        <MenuBar />

    </div>

    <div class="princiapl">


        <div class="menu_vertical">
            <nav class="navbar ">
                <ul class="navbar-nav">
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_categorie }">
                        <button @click="affichage('categorie')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Catégories d'équipement</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_equipements }">
                        <button @click="affichage('equipement')" type="button"
                            class="btn btn-secondary btn-sm btn-menu_v">Equipements</button>
                    </li>

                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_rebut }">
                        <button @click="affichage('rebut')" type="button" class="btn btn-secondary btn-sm btn-menu_v">Mise
                            au rebuts</button>
                    </li>

                </ul>
            </nav>


        </div>
        <div class="contenu">
            <h1 class="bg-light">{{ titre }}</h1>

            <div class="equipements" v-if="display_equipements">
                <div class="list_btn">
                    <button @click="affichageEquipement('form')" class="btn btn-success m-2">Créer un équipement</button>
                    <button @click="affichageEquipement('list')" class="btn btn-success m-2">Liste équipements</button>

                </div>
                <EquipementForm v-if="display_form" />
                <EquipementList v-if="display_list" />
            </div>

            <div class="categorie_eq" v-if="display_categorie">
                <AjouterCategorie />

            </div>
            <div class="mise_au_rebut" v-if="display_rebut">
                <EquipementRebut />
            </div>
        </div>
    </div>
</template>

<script>
import EquipementForm from '@/components/equipements/EquipementForm.vue'
import MenuBar from '@/components/MenuBar.vue'
import EquipementList from '@/components/equipements/EquipementList.vue'
import { getAllLocalite, getCategories } from '@/api/equipement'
import AjouterCategorie from '@/components/AjouterCategorieConsommable.vue'
import EquipementRebut from '@/components/equipements/EquipementRebut.vue'
export default {
    name: "Equipement",
    components: {
        EquipementForm,
        MenuBar,
        EquipementList,
        AjouterCategorie,
        EquipementRebut
    },
    data() {
        return {
            display_categorie: true,
            display_equipements: false,
            display_rebut: false,
            list_categorie: [],
            list_localite: [],
            display_form: false,
            display_list: true,
            titre: "Gestion des catégories d'équipement"
        }
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
        affichage(option) {
            if (option == "categorie") {
                this.display_categorie = true
                this.display_equipements = false
                this.display_rebut = false
                this.titre = "Gestion des catégories d'équipement"
            } else if (option == "equipement") {
                this.display_categorie = false
                this.display_equipements = true
                this.display_rebut = false
                this.titre = "Gestion des des équipement"
            } else if (option == "rebut") {

                this.display_categorie = false
                this.display_equipements = false
                this.display_rebut = true
                this.titre = "Gestion des mises au rébut"
            }
        },
        affichageEquipement(option) {
            if (option == "form") {
                this.display_form = true
                this.display_list = false
            } else if (option == "list") {
                this.display_form = false
                this.display_list = true
            }

        }
    }


}
</script>

<style scoped>
.princiapl {
    display: flex;
    margin-top: 120px;
}

.equipements {
    /* width: 80% !important; */
    height: 100vh !important;
}

/* .equipements {
    width: 80%;
    margin: auto;
} */

.menu_bar {
    z-index: 100;
}

.menu_vertical {
    background-color: #f1f1f1;
    flex: 0 0 15%;
    padding: 10px;
    margin: 0;
    border-radius: 10px;
}

.contenu {
    width: 75%;
}

.nav-link-active button {
    background-color: #555;
    /* Mettez ici la couleur que vous souhaitez pour le lien actif */
    color: white;
}

.menu_vertical .btn-menu_v {
    width: 100% !important;
}
</style>