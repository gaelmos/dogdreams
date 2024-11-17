document.addEventListener("DOMContentLoaded", async () => {
    const pantallaPerros = document.getElementById("pantallaPerros"); // Asegúrate de que este elemento exista
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const detallePerro = document.getElementById("detallePerro");

    if (!pantallaPerros) {
        console.error("El contenedor de perros no se encontró.");
        return; // Si no existe, detenemos la ejecución
    }

    try {
        // Llamada al backend para obtener la lista de perros
        const response = await fetch('http://localhost:3000/traer');
        if (!response.ok) throw new Error('No se pudieron cargar los perros');
        const perros = await response.json();

        // Crear elementos para cada perro
        perros.forEach(perro => {
            const perroDiv = document.createElement("div");
            perroDiv.classList.add("Rectangulo");
            perroDiv.innerHTML = `
                <img src="${perro.foto}" alt="${perro.nombre}" class="fotoPerro" style="cursor: pointer;">
                <p>${perro.nombre}</p>
            `;

            // Añadir evento al hacer clic en la foto para mostrar los datos del perro
            perroDiv.querySelector(".fotoPerro").addEventListener("click", () => mostrarDetallePerro(perro));
<<<<<<< Updated upstream
            
            // Añadir evento al botón Adoptar para mostrar la frase de "jeroperuga@gmail.com"
            perroDiv.querySelector(".btnAdoptar").addEventListener("click", () => mostrarCorreoAdoptar());
            
=======

            // Agregar el div con la foto y el nombre del perro al contenedor
>>>>>>> Stashed changes
            pantallaPerros.appendChild(perroDiv);
        });
    } catch (error) {
        console.error("Error al obtener los perros:", error);
    }

    // Función para cerrar el modal
    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    // Mostrar detalles del perro en el modal
    function mostrarDetallePerro(perro) {
        detallePerro.innerHTML = `
            <h2>${perro.nombre}</h2>
            <p><strong>Raza:</strong> ${perro.raza}</p>
            <p><strong>Descripción:</strong> ${perro.descripcion}</p>
            <p><strong>Color:</strong> ${perro.color}</p>
            <p><strong>Tamaño:</strong> ${perro.tamaño}</p>
            <p><strong>Dificultades:</strong> ${perro.dificultades}</p>
            <p><strong>Nacimiento:</strong> ${new Date(perro.nacimiento).toLocaleDateString()}</p>
            <img src="${perro.foto}" alt="${perro.nombre}" style="width: 100%; max-width: 400px;">
        `;
<<<<<<< Updated upstream
        modal.style.display = "block";
    }

    // Mostrar la frase de "jeroperuga@gmail.com" en el modal al hacer clic en el botón Adoptar
    function mostrarCorreoAdoptar() {
        detallePerro.innerHTML = `
            <h3>Contacto para adoptar:</h3>
            <p>Para más información sobre la adopción, contacta a: <strong>jeroperuga@gmail.com</strong></p>
        `;
        modal.style.display = "block";
=======
        modal.style.display = "flex"; // Muestra el modal
>>>>>>> Stashed changes
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
