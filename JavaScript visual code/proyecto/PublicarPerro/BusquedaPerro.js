document.addEventListener("DOMContentLoaded", async () => {
    const pantallaPerros = document.getElementById("contenedorPerros");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const detallePerro = document.getElementById("detallePerro");

    try {
        // Obtener los perros desde el backend
        const response = await fetch('http://localhost:3000/traer');
        if (!response.ok) throw new Error('No se pudieron cargar los perros');
        const perros = await response.json();

        // Crear elementos para cada perro
        perros.forEach(perro => {
            const perroDiv = document.createElement("div");
            perroDiv.classList.add("Rectangulo");
            perroDiv.innerHTML = `
                <img src="data:image/jpeg;base64,${perro.foto}" alt="${perro.nombre}" class="fotoPerro" style="cursor: pointer;">
                <p>${perro.nombre}</p>
                <button class="btnAdoptar">Adoptar</button>
            `;

            // Añadir evento al hacer clic en la foto para mostrar detalles del perro
            perroDiv.querySelector(".fotoPerro").addEventListener("click", () => mostrarDetallePerro(perro));

            // Añadir evento al botón Adoptar para mostrar el mensaje de adopción
            perroDiv.querySelector(".btnAdoptar").addEventListener("click", () => mostrarMensajeAdopcion(perro));

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
            <img src="data:image/jpeg;base64,${perro.foto}" alt="${perro.nombre}" style="width: 100%; max-width: 400px;">
        `;
        modal.style.display = "block";
    }

    // Mostrar mensaje de adopción en el modal
    function mostrarMensajeAdopcion(perro) {
        detallePerro.innerHTML = `
            <h3>¡Gracias por tu interés en adoptar a ${perro.nombre}!</h3>
            <p>Para más información sobre la adopción, contacta a: <strong>jeroperuga@gmail.com</strong></p>
        `;
        modal.style.display = "block";
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
