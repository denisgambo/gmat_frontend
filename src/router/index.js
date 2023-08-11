import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableauDeBord from '../views/TableauDeBord.vue'
import Consommable from '../components/Consommable.vue'
import Maintenance from '../components/Maintenance.vue'
import AjouterEquipement from '../components/AjouterEquipement.vue'
import AjouterConsommable from '../components/AjouterConsommable.vue'
import AjouterCategorie from '../components/AjouterCategorie.vue'
import ApprovisionnementStock from '../components/ApprovisionnementStock.vue'
import GestionUtilisateur from '../components/GestionUtilisateur.vue'
import EtatEquipement from '../components/EtatEquipement.vue'
import MenuBar from '../components/MenuBar.vue'
import HistoriqueConsommation from '../components/HistoriqueConsommation.vue'
import { requireAuth } from '/auth/auth-guard'
import { requireAuthAdmin } from '/auth/auth-guard-admin'
import store from '@/store'; // Importez le store Vuex ici
import Consommation from '../components/Consommation.vue'
import ModifierEquipement from '@/components/ModifierEquipement.vue'
import ModifierConsommable from '@/components/ModifierConsommable.vue'
import HistoriqueApprovisionnement from '@/components/HistoriqueApprovisionnement.vue'
import Parametre from '@/components/Parametre.vue'
import Service from '@/components/Services.vue'
import Anomalies from '@/components/Anomalies.vue'
import AjouterAnomalie from '@/components/AjouterAnomalie.vue'
import StockCritique from '@/views/StockCritique.vue'
import Maintenanciers from '@/components/Maintenanciers.vue'
import Profil from '@/views/Profil.vue'
import Justifications from '@/components/Justifications.vue'
import HistoriqueConnexions from '@/components/HistoriqueConnexions.vue'
import AutresDepenses from '@/components/AutresDepenses.vue'
import Fournisseurs from '@/components/Fournisseurs.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    {
    path: '/profil/:id',
    name: 'profil',
    component: Profil,
    props: true,
     beforeEnter: requireAuth
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dashbord',
    name: 'TableauDeBord',
    component: TableauDeBord,
    props: true,
     beforeEnter: requireAuth
  },

   {
    path: '/services',
    name: 'Services',
    component: Service,
    props: true,
     beforeEnter: requireAuthAdmin
  },

  {
    path: '/consommable',
    name: 'consommable',
    component: Consommable,
    props: true,
     beforeEnter: requireAuth
  },
  

  {
    path: '/maintenance',
    name: 'maintenance',
    component: Maintenance,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },
    {
    path: '/consommation',
    name: 'consommation',
    component: Consommation,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },
     {
    path: '/parametre',
    name: 'parametre',
    component: Parametre,
    props: true,
     beforeEnter: requireAuthAdmin // Protéger la route avec le guard
  },

  {
    path: '/historique_consommation',
    name: 'historiqueConsommation',
    component: HistoriqueConsommation,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },
   {
    path: '/historique_approvisionnement',
    name: 'historiqueApprovisionnement',
    component: HistoriqueApprovisionnement,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

  {
    path: '/ajouter-equipement',
    name: 'AjouterEquipement',
    component: AjouterEquipement,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

    {
    path: '/etat',
    name: 'EtatEquipement',
    component: EtatEquipement,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

    {
    path: '/fournisseurs',
    name: 'Fournisseurs',
    component: Fournisseurs,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },
   {
    path: '/menu',
    name: 'Menu',
    component: MenuBar,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

  {
    path: '/approvisionnement',
    name: 'ApprovisionnementStock',
    component: ApprovisionnementStock,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

  {
    path: '/ajouter-consommable',
    name: 'AjouterConsommable',
    component: AjouterConsommable,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

  {
    path: '/ajouter-categorie',
    name: 'AjouterCategorie',
    component: AjouterCategorie,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

   {
    path: '/utilisateurs',
    name: 'GestionUtilisateur',
    component: GestionUtilisateur,
    props: true,
     beforeEnter: requireAuthAdmin // Protéger la route avec le guard
  },
    {
    path: '/modifier_equipement/:id',
    name: 'ModifierEquipement',
    component: ModifierEquipement,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },
  {
    path: '/anomalies',
    name: 'Anomalies',
    component: Anomalies,
    props: true,
     beforeEnter: requireAuth
  },
    {
    path: '/autres-depenses/:id',
    name: 'AutresDepenses',
    component: AutresDepenses,
    props: true,
     beforeEnter: requireAuth
  },

  
   {
    path: '/justifications',
    name: 'Justifications',
    component: Justifications,
    props: true,
     beforeEnter: requireAuth
  },
  {
    path: '/ajouter-anomalies',
    name: 'AjouterAnomalies',
    component: AjouterAnomalie,
    props: true,
     beforeEnter: requireAuth
  },
   {
    path: '/stock-critique',
    name: 'StockCritique',
    component: StockCritique,
    props: true,
     beforeEnter: requireAuth
  },

    {
    path: '/maintenanciers',
    name: 'Maintenanciers',
    component: Maintenanciers,
    props: true,
     beforeEnter: requireAuth
  },

    {
    path: '/modifier_consommable/:id',
    name: 'ModifierConsommable',
    component: ModifierConsommable,
    props: true,
     beforeEnter: requireAuth // Protéger la route avec le guard
  },

      {
    path: '/historique-connexion',
    name: 'HistoriqueConnexions',
    component: HistoriqueConnexions,
    props: true,
     beforeEnter: requireAuthAdmin // Protéger la route avec le guard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
