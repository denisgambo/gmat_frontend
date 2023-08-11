// Fichier auth-guard.js


export const requireAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    next();
  } else {
    next('/');
  }
};
