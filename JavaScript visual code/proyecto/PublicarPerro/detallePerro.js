// Función para obtener el ID de la URL
function obtenerIdPerro() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Función para cargar los detalles del perro
async function cargarDetallePerro() {
    const idPerro = obtenerIdPerro();

    try {
        const response = await fetch(`http://localhost:3000/perros/${idPerro}`);
        const perro = await response.json();

        if (response.ok) {
            document.getElementById('nombre').textContent = perro.nombre;
            document.getElementById('foto').src = perro.foto;
            document.getElementById('raza').textContent = perro.raza;
            document.getElementById('descripcion').textContent = perro.descripcion;
            document.getElementById('color').textContent = perro.color;
            document.getElementById('nacimiento').textContent = perro.nacimiento;
            document.getElementById('tamaño').textContent = perro.tamaño;
            document.getElementById('dificultades').textContent = perro.dificultades;
        } else {
            console.error('Error al cargar los detalles del perro:', perro.error);
        }
    } catch (error) {
        console.error('Error al obtener los detalles del perro:', error);
    }
}

cargarDetallePerro();
