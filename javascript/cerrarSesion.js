
//DEFINO LA FUNCION PARA CERRAR SESION 
window.logout = function () {
    console.log("Cerrando sesión");
    localStorage.removeItem('login_success');
    console.log("localStorage después de cerrar sesión:", localStorage);
    window.location.href = 'login.html';
  }