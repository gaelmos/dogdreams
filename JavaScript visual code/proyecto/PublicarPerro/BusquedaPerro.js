document.addEventListener("DOMContentLoaded", async () => {
    const pantallaPerros = document.getElementById("pantallaPerros");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const detallePerro = document.getElementById("detallePerro");

    try {
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

            // Añadir evento al hacer clic en la foto
            perroDiv.querySelector(".fotoPerro").addEventListener("click", () => mostrarDetalle(perro));
            pantallaPerros.appendChild(perroDiv);
        });
    } catch (error) {
        console.error("Error al obtener los perros:", error);
    }

    // Función para cerrar el modal
    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    // Mostrar detalles del perro y el usuario en el modal
    function mostrarDetalle(perro) {
        detallePerro.innerHTML = `
            <h2>${perro.nombre}</h2>
            <p><strong>Raza:</strong> ${perro.raza}</p>
            <p><strong>Descripción:</strong> ${perro.descripcion}</p>
            <p><strong>Color:</strong> ${perro.color}</p>
            <p><strong>Tamaño:</strong> ${perro.tamaño}</p>
            <p><strong>Dificultades:</strong> ${perro.dificultades}</p>
            <p><strong>Nacimiento:</strong> ${new Date(perro.nacimiento).toLocaleDateString()}</p>
            <hr>
            <h3>Datos del Usuario</h3>
            <p><strong>Nombre:</strong> ${perro.usuario_nombre}</p>
            <p><strong>Email:</strong> ${perro.usuario_mail}</p>
            <p><strong>Teléfono:</strong> ${perro.usuario_numero}</p>
            <p><strong>Dirección:</strong> ${perro.usuario_direccion}</p>
            <img src="${perro.foto}" alt="${perro.nombre}" style="width: 100%; max-width: 400px;">
        `;
        modal.style.display = "block"; // Mostrar el modal
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
