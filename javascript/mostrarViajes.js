
const api = 'http://localhost:5500/viajes' //Define la URL base de la API a la que se va a hacer la solicitud.
let data = [] //Inicializa un array vacío que almacenará los datos obtenidos de la API.


async function mostrarViaje() { //Declara una función asíncrona llamada mostrarViaje.
    try {
        const respuesta = await fetch(api) //Realiza una solicitud HTTP GET a la URL de la API y espera la respuesta.
        data = await respuesta.json() //Convierte la respuesta en formato JSON y la almacena en el array data.
        mostrarTarjetas() //Llama a la función mostrarTarjetas para actualizar el DOM con los datos obtenidos.
    } catch (error) {
        console.error('Error al obtener los datos', error) //Captura cualquier error que ocurra durante la solicitud y lo imprime en la consola
    }
}

function mostrarTarjetas() { //Declara una función llamada mostrarTarjetas.
    const viajesTarjetas = document.querySelector('#viajes-tarjetas') //Selecciona el elemento del DOM con el id viajes-tarjetas.
    viajesTarjetas.innerHTML = ''; //Limpia cualquier contenido previo dentro del elemento viajesTarjetas.

    data.forEach((paquete) => { //Itera sobre cada elemento en el array data
        const card = document.createElement('div') //Crea un nuevo elemento div para cada paquete.
        card.className = 'col-md-3 mb-4'; //Asigna clases CSS al nuevo div.
        card.innerHTML = ` 
        <div class="card">
            <div class="card-body">
            <img class="card-text imagen-tarjetas" src='${paquete.imagen}'>
                <h5 class="card-title">${paquete.nombre}</h5>
                <p class="card-text">Precio por persona desde</p>
                <p class="card-text">$${paquete.precio.toFixed()}</p>
                <p class="card-text">Fecha: ${paquete.fecha}</p>
                <a href="./paginas/error404.html" class="btn  ver-mas ">Ver mas</a>
            </div>
        </div>
    `;//Asigna el contenido HTML al div creado, utilizando las propiedades de cada paquete (imagen, nombre, precio, fecha).
        viajesTarjetas.appendChild(card) //Añade el div creado como hijo del elemento viajesTarjetas.
    })
}

mostrarViaje() //Llama a la función mostrarViaje para iniciar la carga de datos y la actualización del DOM cuando se carga el script.