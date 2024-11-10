document.addEventListener('DOMContentLoaded', async function () {
    // Obtener el token de autenticación si es necesario
    const token = localStorage.getItem("token");
    
    try {
        // Hacer la solicitud para obtener los perros desde el servidor
        const response = await fetch("http://localhost:3000/perros", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const perros = await response.json(); // Suponiendo que los perros llegan en formato JSON

            // Llamar a la función para mostrar los perros en la página
            mostrarPerros(perros);
        } else {
            console.error("Error al obtener los perros:", response.statusText);
            alert("No se pudieron cargar los perros.");
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
});

// Función para mostrar los perros en los cuadros
function mostrarPerros(perros) {
    // Seleccionar todos los cuadros disponibles
    const cuadros = document.querySelectorAll('.Rectangulo');
    
    // Verifica que hay suficientes cuadros para mostrar los perros
    perros.forEach((perro, index) => {
        if (cuadros[index]) {
            const cuadro = cuadros[index];

            // Crear un nuevo elemento para la imagen del perro
            const imagen = document.createElement('img');
            imagen.src = `data:image/jpeg;base64,${perro.foto}`; // Suponiendo que el foto está en base64
            imagen.alt = perro.nombre;
            
            // Crear un nuevo elemento para el nombre del perro
            const nombre = document.createElement('p');
            nombre.textContent = perro.nombre;

            // Crear un nuevo elemento para la raza del perro
            const raza = document.createElement('p');
            raza.textContent = `Raza: ${perro.raza}`;

            // Agregar la imagen y la información al cuadro
            cuadro.appendChild(imagen);
            cuadro.appendChild(nombre);
            cuadro.appendChild(raza);
        }
    });
}
