document.addEventListener("DOMContentLoaded", async () => {
    const contenedorPerros = document.getElementById("contenedorPerros");

    try {
        const response = await fetch("http://localhost:3000/traer");
        if (!response.ok) {
            throw new Error("No se pudieron cargar los perros");
        }
        
        const perros = await response.json();

        perros.forEach(perro => {
            const rectangulo = document.createElement("div");
            rectangulo.classList.add("Rectangulo");

            const img = document.createElement("img");
            img.src = perro.foto;
            img.alt = perro.nombre;

            const nombre = document.createElement("p");
            nombre.textContent = perro.nombre;

            rectangulo.appendChild(img);
            rectangulo.appendChild(nombre);
            contenedorPerros.appendChild(rectangulo);
        });
    } catch (error) {
        console.error("Error al obtener los perros:", error);
    }
});
