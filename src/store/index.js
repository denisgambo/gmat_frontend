import { createStore } from 'vuex';
import { getUser } from '@/api/parametre';

export default createStore({
  state: {
    menu_consommables:false,
    menu_equipements:true,
    menu_maintenance:true,
     menu_operation:true,
     menu_demandes:false,
     display_operation:true,

    // Les variables du composantr maintenance
    display_liste_maintenance:true,
    display_consommation_form2:false,
    display_historique:false,
    display_form:false,
    display_maintenance_form:false,
    display_consommation_form:false,
    listeService:"",
  },
  getters: {
    
  },
  mutations: {
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    
  },
  actions: {
 
    logout({ commit }) {
      
      commit('setIsAuthenticated', false);
    }
  },
  modules: {}
});
