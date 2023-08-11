// Fichier auth-guard.js
import Swal from "sweetalert2";


export const requireAuthAdmin = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.role =="administrateur") {
    next();
  } else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Vous ne pouvez pas accéder à cette page",
        // footer: '<a href="">Pourquoi ce message</a>'
      })
    next(from);
  }
};

export const testAdminUser = ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
 if(user.role == "administrateur"){
  return true
 }else{
  return false
 }
}

export const testFinancierUser = ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
 if(user.role == "financier"){
  return true
 }else{
  return false
 }
}

export const testControlleurUser = ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
 if(user.role == "controlleur"){
  return true
 }else{
  return false
 }
}


export const testGestionnaireUser = ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
 if(user.role == "gestionnaire"){
  return true
 }else{
  return false
 }
}

