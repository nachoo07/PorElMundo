// SELECCIONA EL FORMULARIO DEL LOGIN QUE SE ENCUENTRA EN EL HTML
const loginForm = document.querySelector('#loginForm');

//AGREGA UN EVENTO DE ESCUCHA AL FORMULARIO DEL LOGIN
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //OBTENEMOS LOS VALORES DE LOS INPUT Y LO GUARDAMOS EN UNA VARIABLE
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    //OBTENEMOS LA LISTA DE USUARIOS ALMACENADOS QUE TENEMOS EN EL LOCALSTORAGE
    const Users = JSON.parse(localStorage.getItem('users')) || [];

    //VERIFICA SI EL USUARIO QUE INGRESO ES EL ADMIN O NO
    const isAdmin = email === 'admin@porelmundo.com' && password === 'Porelmundo2024';

    //BUSCA UN USUARIO VALIDO EN LA LISTA DE USUARIOS 
  const validUser = Users.find(user => user.email === email && user.password === password);


  if (!validUser && !isAdmin) {
    //MUESTRA UN MENSSAJE DE ERROR SI NO ES ENCONTRADO EL USUARIO
    Swal.fire({
      title: "Usuario y/o contraseña incorrectos!",
      icon: "error"
    });
  } else {
    //MUESTRA UN MENSAJE DE BIENVENIDA AL USUARIO
    const redirectUrl = isAdmin ? 'administracion.html' : '../../index.html';
    Swal.fire({
      title: `Bienvenido ${validUser ? validUser.name : 'Administrador'}!`,
      icon: "success"
    }).then(() => {
      localStorage.setItem('login_success', JSON.stringify(validUser || { email: 'admin@porelmundo.com' }));
      window.location.href = redirectUrl; //BUSCAR EL REDIRECT URL
    });
  }
});
// Función para mostrar y ocultar la contraseña
const contraseña = document.getElementById("password");
const iconoContraseña = document.getElementById("iconoMostrarContraseña");

iconoContraseña.addEventListener("click", () => {
  if (contraseña.type === "password") {
    contraseña.type = "text";
    iconoContraseña.style.opacity = 0.8;
  } else {
    contraseña.type = "password";
    iconoContraseña.style.opacity = 0.2;
  }

})