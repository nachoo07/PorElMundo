
const api = 'http://localhost:5500/viajes'
let data = []

// CREO LA FUNCION PARA OBTENER LOS DATOS DE LA API
async function obtenerViajes() {
    try {
        const respuesta = await fetch(api)
        data = await respuesta.json()
        mostrarTabla()
        console.log(data)
    } catch (error) {
        console.error('Error al obtener los datos:', error)
    }
}

function mostrarTabla(){
    const tableBody = document.querySelector('#data-table tbody')
    tableBody.innerHTML = '' //LIMPIA EL CONTENIDO EXISTENTE

    data.forEach((paquete) => {
        const row = document.createElement('tr')

        const nombreViaje = document.createElement('td')
        nombreViaje.textContent = paquete.nombre
        row.appendChild(nombreViaje)

        const precioViaje = document.createElement('td')
        precioViaje.textContent = paquete.precio
        row.appendChild(precioViaje)

        const fechaViaje = document.createElement('td')
        fechaViaje.textContent = paquete.fecha
        row.appendChild(fechaViaje)

        const acciones = document.createElement('td')
        const eliminarBoton = document.createElement('button')
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.className = 'btn btn-danger btn-sm';
        eliminarBoton.addEventListener('click', () => eliminarViaje(paquete.id));
        acciones.appendChild(eliminarBoton);
        row.appendChild(acciones);

        tableBody.appendChild(row);
    })
}

//FUNCION PARA ELIMINAR UN PRODUCTO DE LA TABLA Y LA API
async function eliminarViaje(id) {
    try {
        await fetch(`${api}/${id}`, {
            method: 'DELETE'
        })
        data = data.filter(viaje => viaje.id !== id); //ELIMINA EL PRODUCTO DEL ARRAY
        mostrarTabla(); //ACTUALIZA LA TABLA UNA VEZ QUE EL PRODUCTO ES BORRADO
    } catch (error) {
        console.error('Error al eliminar el producto', error)
    }
}

async function agregarViaje(event) {
    event.preventDefault()

    const nombreInput = document.querySelector('#nombre')
    const precioInput = document.querySelector('#precio')
    const fechaInput = document.querySelector('#fecha')

    const nuevoViaje= {
        nombre: nombreInput.value,
        precio: parseFloat(precioInput.value),
        fecha: parseFloat(fechaInput.value)

    }

    try {
        const respuesta = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoViaje)
        })

        const viaje = await respuesta.json()
        data.push(viaje) 
        mostrarTabla()
        nombreInput.value = '';
        precioInput.value = '';
        fechaInput.value = '';
    } catch (error) {
        console.error('Error al agregar el producto', error)
    }
}

document.querySelector('#add-product-form').addEventListener('submit', agregarViaje);

obtenerViajes()
