<template>
    <MenuBar />
    <div class="bg-light">
        <h2>Paramètres</h2>
    </div>
    <div class="container">
        <div class="vertical">
            <nav class="navbar ">
                <ul class="navbar-nav">
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_services }">
                        <button type="button" class="btn btn-secondary btn-sm" @click="display(1)">Gestions des
                            services</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_anomalies }">
                        <button type="button" class="btn btn-secondary btn-sm" @click="display(3)">Gestions des
                            anomalies</button>
                    </li>

                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_justification }">
                        <button type="button" class="btn btn-secondary btn-sm" @click="display(4)">Gestions des
                            Justifications</button>
                    </li>
                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_maintenanciers }">
                        <button type="button" class="btn btn-secondary btn-sm" @click="display(2)">Gestions des
                            maintenanciers</button>
                    </li>

                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_fournisseur }">
                        <button type="button" class="btn btn-secondary btn-sm" @click="display(5)">Gestions des
                            fournisseurs</button>
                    </li>

                    <li class="nav-item mb-3" :class="{ 'nav-link-active': display_entreprise }">
                        <button type="button" class="btn btn-secondary btn-sm" @click="display(6)">Paramètres
                            entreprise</button>
                    </li>

                </ul>
            </nav>
        </div>

        <div class="components">
            <Services v-if="display_services" />
            <Anomalies v-if="display_anomalies" />
            <Maintenanciers v-if="display_maintenanciers" />
            <Justifications v-if="display_justification" />

            <Fournisseurs v-if="display_fournisseur" />
            <Entreprise v-if="display_entreprise" />


        </div>
    </div>
</template>

<script>
import MenuBar from './MenuBar.vue';
import Services from './Services.vue';
import Anomalies from './Anomalies.vue';
import Maintenanciers from '@/components/Maintenanciers.vue';
import Justifications from './Justifications.vue';
import Fournisseurs from './Fournisseurs.vue';
import Entreprise from './Entreprise.vue'
export default {
    name: "Parametre",
    components: {
        MenuBar,
        Services,
        Anomalies,
        Maintenanciers,
        Justifications,
        Fournisseurs,
        Entreprise

    },
    data() {
        return {
            display_services: true,
            display_maintenanciers: false,
            display_anomalies: false,
            display_justification: false,
            display_fournisseur: false,
            display_entreprise: false
        }
    },

    methods: {
        display(entree) {
            if (entree == 1) {
                this.display_services = true;
                this.display_anomalies = false;
                this.display_maintenanciers = false;
                this.display_justification = false
                this.display_fournisseur = false;
                this.display_entreprise = false

            } else if (entree == 2) {
                this.display_services = false;
                this.display_maintenanciers = true;
                this.display_anomalies = false;
                this.display_justification = false
                this.display_fournisseur = false
                this.display_entreprise = false


            } else if (entree == 3) {
                this.display_services = false;
                this.display_maintenanciers = false;
                this.display_anomalies = true;
                this.display_justification = false
                this.display_fournisseur = false
                this.display_entreprise = false


            } else if (entree == 4) {
                this.display_justification = true;
                this.display_anomalies = false;
                this.display_maintenanciers = false;
                this.display_services = false
                this.display_fournisseur = false
                this.display_entreprise = false

            } else if (entree == 5) {
                this.display_justification = false;
                this.display_anomalies = false;
                this.display_maintenanciers = false;
                this.display_services = false;
                this.display_fournisseur = true
                this.display_entreprise = false
            } else if (entree == 6) {
                this.display_justification = false;
                this.display_anomalies = false;
                this.display_maintenanciers = false;
                this.display_services = false;
                this.display_fournisseur = false
                this.display_entreprise = true
            }
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
    /* La hauteur du container est de 100vh (100% de la hauteur de la fenêtre) */
}

.vertical {
    background-color: #f1f1f1;
    flex: 0 0 300px;
    /* Le menu vertical aura une largeur fixe de 200px */
    padding: 10px;
    margin: 0;
    border-radius: 10px;
}

.nav-link-active button {
    background-color: #555;
    /* Mettez ici la couleur que vous souhaitez pour le lien actif */
    color: white;
}



.btn {
    width: 100%;
}

.components {
    width: 50%;
    margin: 10px auto;
}
</style>