document.addEventListener("DOMContentLoaded", async () => {
    const pantallaPerros = document.getElementById("pantallaPerros");

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

            // Evento al hacer clic en la foto para guardar datos y redirigir
            perroDiv.querySelector(".fotoPerro").addEventListener("click", () => {
                // Guardar datos del perro seleccionado en localStorage
                localStorage.setItem("perroSeleccionado", JSON.stringify(perro));
                // Redirigir a la página de características
                window.location.href = "CaracteristicasUsuario.html";
            });

            pantallaPerros.appendChild(perroDiv);
        });
    } catch (error) {
        console.error("Error al obtener los perros:", error);
    }
});
