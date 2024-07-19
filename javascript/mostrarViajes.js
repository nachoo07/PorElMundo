
const api = 'http://localhost:5500/viajes'
let data = []


async function mostrarViaje() {
    try {
        const respuesta = await fetch(api)
        data = await respuesta.json()
        mostrarTarjetas()
    } catch (error) {
        console.error('Error al obtener los datos', error)
    }
}

function mostrarTarjetas() {
    const viajesTarjetas = document.querySelector('#viajes-tarjetas')
    viajesTarjetas.innerHTML = '';

    data.forEach((paquete) => {
        const card = document.createElement('div')
        card.className = 'col-md-3 mb-4';

        card.innerHTML = `
        <div class="card">
            <div class="card-body">
            <img class="card-text imagen-tarjetas" src='${paquete.imagen}'>
                <h5 class="card-title">${paquete.nombre}</h5>
                <p class="card-text">Precio por persona desde</p>
                <p class="card-text">$${paquete.precio.toFixed()}</p>
                <p class="card-text">Fecha: ${paquete.fecha}</p>
            </div>
        </div>
    `;
        viajesTarjetas.appendChild(card)
    })
}

mostrarViaje()