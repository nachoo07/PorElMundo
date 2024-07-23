 // Revisar el estado de la sesión cuando se carga la página
 window.onload = function () {
    const loginSuccess = JSON.parse(localStorage.getItem('login_success'));
    const adminLink = document.getElementById('adminLink');

    if (loginSuccess && loginSuccess.email === 'admin@porelmundo.com') {
        // Mostrar el enlace solo si el usuario es el administrador
        adminLink.style.display = 'block';
    }
}