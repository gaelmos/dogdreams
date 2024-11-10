document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/traer');  // Endpoint correcto para obtener perros
        if (!response.ok) throw new Error("No se pudieron cargar los perros");

        const perros = await response.json();
        mostrarPerros(perros);  // Función que muestra los perros en el frontend
    } catch (error) {
        console.error("Error al obtener los perros:", error);
    }
});

function mostrarPerros(perros) {
    const pantalla = document.querySelector('.Pantalla');
    pantalla.innerHTML = '';  // Limpia el contenido antes de agregar nuevos perros

    perros.forEach(perro => {
        const rectangulo = document.createElement('div');
        rectangulo.classList.add('Rectangulo');

        rectangulo.innerHTML = `
            <img src="${perro.foto}" alt="Foto de ${perro.nombre}" style="width: 100%; height: auto;">
            <p><strong>Nombre:</strong> ${perro.nombre}</p>
            <p><strong>Raza:</strong> ${perro.raza}</p>
            <p><strong>Color:</strong> ${perro.color}</p>
            <p><strong>Tamaño:</strong> ${perro.tamaño}</p>
            <p><strong>Dificultades:</strong> ${perro.dificultades}</p>
        `;

        pantalla.appendChild(rectangulo);
    });
}
