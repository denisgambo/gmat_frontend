<template>
    <div class="entete">
        <div class="gauche">
            <h3>REGIE ADMINISTRATIVE</h3>
            <P>CHARGEE DE LA GESTION </P>
            <p>DE L'ASSISTANCE EN ESCALE OUGADOUGOU</p>
            <h3>SUPERVISION TECHNIQUE</h3>
            <P>SERVICE MAINTENANCE MATERIELS</P>
            <small>{{ date_du_jour }}</small>


        </div>

        <div class="droite">
            <img src="../assets/logo/logoracgae.png" alt="" srcset="">
            <h1>R.A.C.G.A.E</h1>

        </div>
    </div>
</template>

<script>
export default {
    name: "Entete",
    data() {
        return {
            date_du_jour: null
        }
    },
    created() {
        this.getdate()
    },

    methods: {
        getdate() {
            const dateActuelle = new Date();
            const jour = dateActuelle.getDate();
            const mois = dateActuelle.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
            const annee = dateActuelle.getFullYear();

            // Formater la date au format français
            this.date_du_jour = `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois}/${annee}`;


        },

        /*  formatDate(date) {
             const jour = date.getDate();
             const mois = date.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
             const annee = date.getFullYear();
             return `${jour < 10 ? '0' + jour : jour}/${mois < 10 ? '0' + mois : mois}/${annee}`;
         }, */
    }
}
</script>

<style scoped>
.titre {
    border: 2px black solid;
    width: 80%;
    margin: 5px auto;
    background-color: rgb(231, 227, 227);
}

.entete {
    display: flex;
    justify-content: space-between;
}

.rr {
    width: 100px;
}
</style>