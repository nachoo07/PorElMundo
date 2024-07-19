
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

function mostrarTabla() {
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

        const imagenViaje = document.createElement('td')
        const img = document.createElement('img');
        img.src = paquete.imagen;
        img.alt = 'Imagen del viaje';
        img.style.width = '80px';
        img.style.height = 'auto';
        imagenViaje.appendChild(img);
        row.appendChild(imagenViaje);
        //imagenViaje.textContent = paquete.imagen
        //row.appendChild(imagenViaje)

        const acciones = document.createElement('td')

        const editarBoton = document.createElement('button')
        editarBoton.textContent = 'Editar'
        editarBoton.className = 'btn btn-warning btn-sm';
        editarBoton.addEventListener('click', () => editarViaje(paquete.id));
        acciones.appendChild(editarBoton);

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

    const idInput = document.querySelector('#edit-id').value;
    const nombreInput = document.querySelector('#nombre')
    const precioInput = document.querySelector('#precio')
    const fechaInput = document.querySelector('#fecha')
    const imagenInput = document.querySelector('#imagen')

    const nuevoViaje = {
        nombre: nombreInput.value,
        precio: parseFloat(precioInput.value),
        fecha: fechaInput.value,
        imagen: imagenInput.value

    }

    try {
        if (idInput) {
            await fetch(`${api}/${idInput}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoViaje)
            })
            //ACTUALIZA EL PRODUCTO DEL ARRAY 
            data = data.map(viaje => viaje.id === parseInt(idInput) ? nuevoViaje : viaje)
            document.querySelector('#submit-button').textContent = 'Agregar Producto'
        } else {

            const respuesta = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoViaje)
            })
            const viaje = await respuesta.json()
            data.push(viaje)
        }

        mostrarTabla()
        nombreInput.value = '';
        precioInput.value = '';
        fechaInput.value = '';
        imagenInput.value = '';
    } catch (error) {
        console.error('Error al agregar el producto', error)
    }
}

function editarViaje(id) {
    const viaje = data.find(viaje => viaje.id === id)

    if (viaje) {
        document.querySelector('#edit-id').value = viaje.id;
        document.querySelector('#nombre').value = viaje.nombre;
        document.querySelector('#precio').value = viaje.precio;
        document.querySelector('#fecha').value = viaje.fecha;
        document.querySelector('#imagen').value = viaje.imagen;
        document.querySelector('#submit-button').textContent = 'Actualizar Producto'; // Cambia el texto del botón

    }
}

document.querySelector('#add-product-form').addEventListener('submit', agregarViaje);

obtenerViajes()
