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
                <button class="btnAdoptar">Adoptar</button>
            `;

            // Añadir evento al hacer clic en la foto para mostrar datos del perro
            perroDiv.querySelector(".fotoPerro").addEventListener("click", () => mostrarDetallePerro(perro));
            
            // Añadir evento al botón Adoptar para mostrar datos del usuario
            perroDiv.querySelector(".btnAdoptar").addEventListener("click", () => mostrarDetalleUsuario(perro));
            
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
        modal.style.display = "block";
    }

    // Mostrar detalles del usuario en el modal
    async function mostrarDetalleUsuario(perro) {
        if (!perro.dni_dueño) {
            console.error("No se encontró el DNI del dueño para este perro.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/traerusu/${perro.dni_dueño}`);
            if (!response.ok) throw new Error('No se pudo obtener los datos del usuario');
            const usuario = await response.json();

            detallePerro.innerHTML = `
                <h3>Datos del Usuario</h3>
                <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                <p><strong>Email:</strong> ${usuario.mail}</p>
                <p><strong>Teléfono:</strong> ${usuario.numero}</p>
                <p><strong>Dirección:</strong> ${usuario.direccion}</p>
            `;
            modal.style.display = "block";
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
        }
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
